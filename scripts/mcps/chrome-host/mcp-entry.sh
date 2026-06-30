#!/bin/sh

# Referenced by .mcp.json / opencode.json as the `chrome-host` MCP server command.
#
# Spawns chrome-devtools-mcp inside the node container (via mcp-launch.sh),
# whether the assistant runs in the devcontainer or on the host. Docker needs
# `sudo` inside the container (like the node/npx wrappers) but not on the host;
# we tell them apart by /.dockerenv, which exists only in a container.

set -eu

# Compose service that runs the proxy + chrome-devtools-mcp.
DOCKER_SERVICE_NAME=node

script_dir="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"

# Walk up to the repo root (the directory holding docker-compose.yml) so
# `docker compose` finds the compose files + .env regardless of the caller's cwd.
root="$script_dir"
while [ "$root" != "/" ] && [ ! -f "$root/docker-compose.yml" ]; do
  root="$(dirname "$root")"
done
cd "$root"

# Path to mcp-launch.sh as seen inside the node container (repo mounted at /workspace).
rel="${script_dir#"$root"/}"
launch="/workspace/$rel/mcp-launch.sh"

if [ -f /.dockerenv ]; then
  exec sudo docker compose exec -T "$DOCKER_SERVICE_NAME" "$launch"
else
  exec docker compose exec -T "$DOCKER_SERVICE_NAME" "$launch"
fi
