#!/bin/sh

# Runs INSIDE the node container, invoked by mcp-entry.sh.
#
# Ensures the loopback CDP proxy (cdp_proxy.py) is running, then hands stdio over
# to chrome-devtools-mcp pointed at the proxy. Resolves cdp_proxy.py next to
# itself, so it works from any location under the repo.

set -eu

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
PROXY_PORT=9334  # fixed; must match LISTEN_PORT in cdp_proxy.py
PROXY_SCRIPT="$SCRIPT_DIR/cdp_proxy.py"

is_up() {
  python3 -c 'import socket,sys; s=socket.socket(); sys.exit(0 if s.connect_ex(("127.0.0.1",'"$PROXY_PORT"'))==0 else 1)' 2>/dev/null
}

if ! is_up; then
  # cdp_proxy.py binds-or-exits, so concurrent launches are safe.
  python3 "$PROXY_SCRIPT" >/tmp/cdp_proxy.log 2>&1 &
  i=0
  while [ "$i" -lt 25 ]; do
    if is_up; then
      break
    fi
    i=$((i + 1))
    sleep 0.2
  done
fi

# chrome-devtools-mcp is fetched on demand via npx rather than being added to
# package.json: it is host/dev MCP tooling for this bridge, not an app build or
# runtime dependency, so it deliberately stays out of the lockfile. `-y` confirms
# the one-off npx install; `@latest` tracks upstream fixes for the dev tool.
exec npx -y chrome-devtools-mcp@latest --browser-url "http://127.0.0.1:${PROXY_PORT}" "$@"
