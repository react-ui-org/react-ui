#!/bin/sh

# Run on the HOST during project setup (called from setup.sh).
#
# Native Docker Engine on Linux doesn't inject `host.docker.internal`, so the
# proxy container can't reach host Chrome. This adds the host-gateway mapping to
# the node service -- but only there. On Docker Desktop/macOS it's a no-op:
# the name already works, and adding the mapping would repoint it to the bridge
# gateway and break Desktop.
#
# Idempotent; after patching a running setup, recreate the service:
# `docker compose up -d node`.

set -eu

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/../../.." && pwd)"
COMPOSE_FILE="$ROOT/docker-compose.yml"
DOCKER_SERVICE_NAME=node
MAPPING="host.docker.internal:host-gateway"

# Only native Docker Engine on Linux needs the mapping. macOS is always Desktop.
if [ "$(uname -s)" = "Darwin" ]; then
  exit 0
fi

DOCKER_OS="$(docker info --format '{{.OperatingSystem}}' 2>/dev/null || true)"
if [ -z "$DOCKER_OS" ]; then
  echo "chrome-host: warning: could not query Docker (is it running?); skipping host-gateway setup." >&2
  exit 0
fi
case "$DOCKER_OS" in
  *"Docker Desktop"*) exit 0 ;;
esac

# Native Docker Engine from here on.

# The host launcher forwards Chrome's loopback CDP port to the bridge gateway
# with ncat (headed Chrome only binds loopback). Warn now rather than failing at
# first browser launch; don't auto-install -- that needs sudo plus distro
# detection, and adding host packages requires explicit approval.
if ! command -v ncat >/dev/null 2>&1; then
  echo "chrome-host: warning: 'ncat' not found; install it (package 'nmap-ncat' or 'nmap'," >&2
  echo "chrome-host: depending on your distro) so start-host-chrome.sh can expose Chrome's" >&2
  echo "chrome-host: CDP port on the bridge gateway for the container." >&2
fi

[ -f "$COMPOSE_FILE" ] || exit 0
if grep -q "$MAPPING" "$COMPOSE_FILE"; then
  exit 0
fi

# Insert extra_hosts under the `<service>:` block (sibling of `extends:`).
TMP_FILE="$COMPOSE_FILE.tmp"
awk -v service="$DOCKER_SERVICE_NAME" '
  { print }
  $0 ~ ("^  " service ":[[:space:]]*$") && !done {
    print "    extra_hosts:"
    print "      - \"host.docker.internal:host-gateway\""
    done = 1
  }
' "$COMPOSE_FILE" > "$TMP_FILE"

if grep -q "$MAPPING" "$TMP_FILE"; then
  mv "$TMP_FILE" "$COMPOSE_FILE"
  echo "chrome-host: native Docker Engine detected -- added '$MAPPING' to the '$DOCKER_SERVICE_NAME' service in $COMPOSE_FILE."
  echo "chrome-host: if the '$DOCKER_SERVICE_NAME' container is already running, recreate it: docker compose up -d $DOCKER_SERVICE_NAME"
else
  rm -f "$TMP_FILE"
  echo "chrome-host: warning: could not locate the '$DOCKER_SERVICE_NAME' service in $COMPOSE_FILE; add '$MAPPING' to its extra_hosts manually." >&2
fi
