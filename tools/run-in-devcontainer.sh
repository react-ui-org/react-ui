#!/bin/sh

# Run a command inside the `devcontainer`, regardless of where this script is
# invoked from. It is used by the IDE run configurations (`.vscode/tasks.json`
# and `.idea/runConfigurations/`) so that a single definition works both when
# the IDE runs inside the Dev Container and when it runs on the host:
#
# * Inside the `devcontainer` the command is executed directly.
# * On the host the `devcontainer` is started when it is not running yet and
#   the command is executed in it via `docker compose exec`.
#
# Usage: tools/run-in-devcontainer.sh <command> [args...]
#   e.g. tools/run-in-devcontainer.sh npm run start
#        tools/run-in-devcontainer.sh npm run lint
#
# See the IDE integration documentation of the project for details.

set -eu

if [ $# -eq 0 ]; then
  echo "Usage: $0 <command> [args...]" >&2
  exit 1
fi

# Always run from the project root, the commands rely on paths relative to it
cd "$(dirname "$0")/.."

if [ -f /.dockerenv ]; then
  # Inside the `devcontainer`: make sure the wrapper scripts (`npm`, `make`, ...)
  # in `/usr/local/bin` take precedence over paths injected by the IDE
  PATH="/usr/local/bin:$PATH"
  export PATH
  exec "$@"
fi

# On the host: IDEs launched from the desktop may not have the Docker CLI in PATH
PATH="$PATH:/usr/local/bin:/opt/homebrew/bin"
export PATH

if [ ! -f .env ] || [ ! -f docker-compose.yml ]; then
  echo "The development environment is not set up yet, run 'bash setup.sh' first." >&2
  echo "See the development environment documentation of the project for details." >&2
  exit 1
fi

# Start the `devcontainer` (and the service containers it depends on) when it is
# not running yet. The output is shown only when it fails.
if ! OUTPUT=$(docker compose up -d devcontainer 2>&1); then
  echo "$OUTPUT" >&2
  exit 1
fi

# Allocate a pseudo-TTY only when the script itself runs in a terminal, so that
# colors, progress bars and Ctrl+C work in the IDE terminals while the script
# still works in non-interactive contexts (e.g. when its output is piped).
if [ -t 0 ] && [ -t 1 ]; then
  exec docker compose exec devcontainer "$@"
else
  exec docker compose exec -T devcontainer "$@"
fi
