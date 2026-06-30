#!/bin/sh

# Run on the HOST (macOS or Linux). Launches a dedicated, isolated Chrome with
# the DevTools (CDP) endpoint enabled so a containerized assistant can drive it.
#
# It uses its own dedicated --user-data-dir, so your everyday Chrome and logins
# are untouched. A separate profile is also required: Chrome only opens a debug
# port for a fresh instance, not for an already-running default profile.
#
# That profile is persistent (reused across runs, kept under $HOME) -- not
# ephemeral or sandboxed. Anything you sign in to here stays on disk and is
# reachable over the unauthenticated CDP port, so avoid logging in to sensitive
# accounts in this browser.
#
# Overrides (shell wins over the repo's .env); see README -> Platform support
# for the bind/platform details:
#   CHROME_DEBUG_PORT   CDP port (default 9333)
#   CHROME_BIN          explicit browser binary (else auto-detected)
#   CHROME_DEBUG_BIND   bind address (else auto-detected: loopback on Docker
#                       Desktop, docker bridge gateway on native Engine).
#                       SECURITY: a non-loopback bind exposes the port -- firewall it.
#
# Profile is always ~/.chrome-debug-profile-<COMPOSE_PROJECT_NAME> (not configurable).

set -eu

# Opens a real browser window, so it must run on the HOST, not in a container
# (/.dockerenv exists only inside one).
if [ -f /.dockerenv ]; then
  echo "chrome-host: error: run start-host-chrome.sh on your HOST, not in a container." >&2
  echo "chrome-host: it launches a Chrome window on your desktop for the containerized" >&2
  echo "chrome-host: assistant to drive. Open a host terminal and run it there." >&2
  exit 1
fi

# Fall back to the repo's .env (the file Docker Compose reads) so this launcher
# and the in-container proxy share one source of truth. Precedence: shell > .env
# > the defaults below.
env_root="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
while [ "$env_root" != "/" ] && [ ! -f "$env_root/docker-compose.yml" ]; do
  env_root="$(dirname "$env_root")"
done
ENV_FILE="$env_root/.env"
# For each host knob, keep a value already set in the shell; otherwise eval the
# matching .env line. Letting the shell run the assignment strips quotes and
# inline comments for free. Values containing spaces must be quoted in .env.
if [ -f "$ENV_FILE" ]; then
  for env_key in CHROME_DEBUG_PORT CHROME_BIN CHROME_DEBUG_BIND COMPOSE_PROJECT_NAME COMPOSE_DOCS_SERVER_PORT; do
    eval "[ -n \"\${$env_key+x}\" ]" && continue
    eval "$(grep -E "^[[:space:]]*$env_key=" "$ENV_FILE" | tail -n 1 || true)"
  done
fi

PORT="${CHROME_DEBUG_PORT:-9333}"

# Preflight: curl drives every CDP readiness probe below, on every platform.
if ! command -v curl >/dev/null 2>&1; then
  echo "chrome-host: error: 'curl' is required to probe Chrome's CDP endpoint but is not installed." >&2
  exit 1
fi

# Bind address. Explicit CHROME_DEBUG_BIND wins; otherwise auto-detect: loopback
# on Docker Desktop (incl. macOS), else the docker bridge gateway for native
# Engine. Binding to the gateway (not 0.0.0.0) keeps the port off your wider
# network. See README -> Platform support.
detect_bind() {
  if [ "$(uname -s)" = "Darwin" ]; then
    printf '127.0.0.1\n'
    return 0
  fi
  case "$(docker info --format '{{.OperatingSystem}}' 2>/dev/null || true)" in
    *"Docker Desktop"*)
      printf '127.0.0.1\n'
      return 0
      ;;
  esac
  # println each gateway on its own line, then take the first IPv4 -- an
  # IPv6-enabled bridge would otherwise concatenate the v4 and v6 gateways into
  # one malformed token that ncat cannot bind.
  gateway_ip="$(docker network inspect bridge --format '{{range .IPAM.Config}}{{println .Gateway}}{{end}}' 2>/dev/null | grep -E '^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$' | head -n1 || true)"
  if [ -n "$gateway_ip" ]; then
    printf '%s\n' "$gateway_ip"
    return 0
  fi
  return 1
}
# Preflight: auto-detecting the bind address shells out to the docker CLI. Skip
# the check when the bind is supplied explicitly, or on macOS (always loopback).
if [ -z "${CHROME_DEBUG_BIND:-}" ] && [ "$(uname -s)" != "Darwin" ] && ! command -v docker >/dev/null 2>&1; then
  echo "chrome-host: error: auto-detecting the CDP bind address needs the 'docker' CLI, but it is" >&2
  echo "chrome-host: not installed. Install Docker, or set CHROME_DEBUG_BIND (e.g. 127.0.0.1 for" >&2
  echo "chrome-host: Docker Desktop) to skip detection." >&2
  exit 1
fi
if [ -n "${CHROME_DEBUG_BIND:-}" ]; then
  BIND="$CHROME_DEBUG_BIND"
else
  BIND="$(detect_bind)" || true
  if [ -z "$BIND" ]; then
    echo "chrome-host: error: could not determine the Docker bridge gateway for the CDP forwarder" >&2
    echo "chrome-host: (is the Docker daemon running?). Set CHROME_DEBUG_BIND to your docker bridge" >&2
    echo "chrome-host: gateway IP to override, and retry." >&2
    exit 1
  fi
fi
case "$BIND" in
  127.0.0.1 | ::1) ;;
  *)
    echo "chrome-host: warning: native Docker detected — exposing the CDP port on $BIND so the" >&2
    echo "chrome-host: container can reach it. This exposes browser control beyond" >&2
    echo "chrome-host: loopback; firewall the port. Native Docker also needs" >&2
    echo "chrome-host: 'host.docker.internal:host-gateway' in the node service's" >&2
    echo "chrome-host: extra_hosts. Set CHROME_DEBUG_BIND to override." >&2
    ;;
esac

# Preflight: a concrete non-loopback bind needs an ncat forwarder (see
# ensure_forwarder). Check ncat now, before launching Chrome, so a missing tool
# fails fast instead of orphaning a browser window. Skip it if a forwarder from
# a previous run is already serving the bind.
case "$BIND" in
  127.0.0.1 | ::1 | 0.0.0.0 | ::) ;;
  *)
    if ! curl -s -m 2 "http://${BIND}:${PORT}/json/version" >/dev/null 2>&1 \
      && ! command -v ncat >/dev/null 2>&1; then
      echo "chrome-host: error: this run must expose Chrome's CDP port ${PORT} on ${BIND} via an" >&2
      echo "chrome-host: ncat forwarder, but 'ncat' is not installed. Install ncat (the 'nmap-ncat'" >&2
      echo "chrome-host: or 'nmap' package, depending on your distro)." >&2
      exit 1
    fi
    ;;
esac

# Profile is always per-project and not configurable. COMPOSE_PROJECT_NAME comes
# from .env (or your shell); fall back to the repo directory name, like Compose.
PROJECT="${COMPOSE_PROJECT_NAME:-$(basename "$env_root")}"
PROFILE="$HOME/.chrome-debug-profile-$PROJECT"

find_chrome() {
  if [ -n "${CHROME_BIN:-}" ]; then
    printf '%s\n' "$CHROME_BIN"
    return 0
  fi
  case "$(uname -s)" in
    Darwin)
      for candidate in \
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
        "/Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome Beta" \
        "/Applications/Chromium.app/Contents/MacOS/Chromium" \
        "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"; do
        if [ -x "$candidate" ]; then
          printf '%s\n' "$candidate"
          return 0
        fi
      done
      ;;
    *)
      for candidate in google-chrome google-chrome-stable chromium chromium-browser microsoft-edge brave-browser; do
        resolved="$(command -v "$candidate" 2>/dev/null || true)"
        if [ -n "$resolved" ]; then
          printf '%s\n' "$resolved"
          return 0
        fi
      done
      ;;
  esac
  return 1
}

# Headed Chromium pins DevTools to 127.0.0.1 and silently ignores
# --remote-debugging-address (Fedora's build, among others), so the launcher no
# longer passes that flag: Chrome always binds loopback, and ensure_forwarder
# spawns an ncat hop on $BIND:$PORT to expose it for the container. Loopback and
# wildcard binds need no hop -- loopback is already reachable, and a wildcard
# would collide with Chrome's own loopback port.
ensure_forwarder() {
  bind=$1
  port=$2
  pidfile=$3

  case "$bind" in 127.0.0.1 | ::1 | 0.0.0.0 | ::) return 0 ;; esac

  mkdir -p "$(dirname "$pidfile")"

  # A reachable bind:port means a forwarder from a previous run still serves it
  # (Chrome itself only binds loopback), so reuse it.
  if curl -s -m 2 "http://${bind}:${port}/json/version" >/dev/null 2>&1; then
    echo "chrome-host: forwarder already serving ${bind}:${port}"
    return 0
  fi

  if ! command -v ncat >/dev/null 2>&1; then
    echo "chrome-host: error: Chrome bound CDP to loopback only and 'ncat' is not installed." >&2
    echo "chrome-host: install ncat (the 'nmap-ncat' or 'nmap' package, depending on your distro)" >&2
    echo "chrome-host: so a host-side forwarder can expose ${port} on ${bind} for the container." >&2
    return 1
  fi

  if [ -f "$pidfile" ]; then
    kill "$(cat "$pidfile")" 2>/dev/null || true
    rm -f "$pidfile"
  fi

  log=${pidfile%.pid}.log
  nohup ncat -k -l "$bind" "$port" --sh-exec "ncat 127.0.0.1 $port" >"$log" 2>&1 &
  echo $! >"$pidfile"

  j=0
  while [ "$j" -lt 20 ]; do
    if curl -s -m 2 "http://${bind}:${port}/json/version" >/dev/null 2>&1; then
      echo "chrome-host: forwarder ${bind}:${port} -> 127.0.0.1:${port} (pid $(cat "$pidfile"))"
      return 0
    fi
    j=$((j + 1))
    sleep 0.5
  done

  echo "chrome-host: error: forwarder failed to bind ${bind}:${port}; see $log" >&2
  return 1
}

if curl -s -m 2 "http://127.0.0.1:${PORT}/json/version" >/dev/null 2>&1; then
  echo "chrome-host: debug Chrome already running on 127.0.0.1:${PORT}"
  ensure_forwarder "$BIND" "$PORT" "$PROFILE/forwarder.pid" || exit 1
  exit 0
fi

CHROME="$(find_chrome || true)"
if [ -z "${CHROME:-}" ]; then
  echo "chrome-host: error: no Chrome/Chromium found. Set CHROME_BIN=/path/to/browser and retry." >&2
  exit 1
fi

mkdir -p "$PROFILE"

# Build the argument list (quote the glob so the shell doesn't expand '*').
# --ignore-certificate-errors skips the "Your connection is not private"
# interstitial for local HTTPS dev servers with a self-signed/absent cert.
# Acceptable here: this is a dedicated, isolated debug profile, not your
# everyday browser.
set -- \
  --remote-debugging-port="$PORT" \
  '--remote-allow-origins=*' \
  --user-data-dir="$PROFILE" \
  --no-first-run \
  --no-default-browser-check \
  --ignore-certificate-errors
set -- "$@" --new-window "http://localhost:${COMPOSE_DOCS_SERVER_PORT:-8000}"

nohup "$CHROME" "$@" >"$PROFILE/chrome-debug.log" 2>&1 &

i=0
while [ "$i" -lt 30 ]; do
  if curl -s -m 2 "http://127.0.0.1:${PORT}/json/version" >/dev/null 2>&1; then
    echo "chrome-host: debug Chrome ready on 127.0.0.1:${PORT}"
    echo "chrome-host:   binary:  $CHROME"
    echo "chrome-host:   profile: $PROFILE"
    echo "chrome-host:   log:     $PROFILE/chrome-debug.log"
    ensure_forwarder "$BIND" "$PORT" "$PROFILE/forwarder.pid" || exit 1
    exit 0
  fi
  i=$((i + 1))
  sleep 0.5
done

echo "chrome-host: error: Chrome did not expose CDP on 127.0.0.1:${PORT}; see $PROFILE/chrome-debug.log" >&2
exit 1
