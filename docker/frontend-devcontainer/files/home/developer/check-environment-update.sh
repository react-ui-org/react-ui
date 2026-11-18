#!/bin/sh

# Warn the user when the development environment definition has changed since
# this container was created (e.g. after pulling changes), so they know they
# should update the environment.
#
# The current hash of the environment definition files is compared against a
# baseline stored in the container layer — intentionally not in a volume — so
# recreating the container automatically records a fresh baseline.

BASELINE_FILE="$HOME/.environment_hash"
WORKSPACE="/workspace"

# Files and directories (relative to the workspace) that define the environment,
# paths that do not exist in the project are skipped
WATCHED_PATHS="
.devcontainer
.env.dist
.env.secondary.dist
docker
docker-compose.base.yml
docker-compose.yml.dist
setup.sh
"

cd "$WORKSPACE" 2>/dev/null || exit 0

WATCHED_FILES=$(
  for WATCHED_PATH in $WATCHED_PATHS; do
    [ -e "$WATCHED_PATH" ] && find "$WATCHED_PATH" -type f -print
  done | sort
)
[ -n "$WATCHED_FILES" ] || exit 0

CURRENT_HASH=$(echo "$WATCHED_FILES" | xargs -r sha256sum | sha256sum | cut -d ' ' -f 1)

if [ ! -f "$BASELINE_FILE" ]; then
  echo "$CURRENT_HASH" > "$BASELINE_FILE"
elif [ "$(cat "$BASELINE_FILE")" != "$CURRENT_HASH" ]; then
  # Print the warning in yellow when the output goes to a terminal
  if [ -t 1 ]; then
    printf '\033[1;33m'
  fi
  echo "⚠ The development environment definition has changed since this container was created."
  echo "  Consider updating the environment, see the project documentation."
  if [ -t 1 ]; then
    printf '\033[0m'
  fi
fi
