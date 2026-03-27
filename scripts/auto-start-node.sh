#!/bin/sh

set -e

# File to read the hash of the package-lock.json
LOCK_HASH_FILE="node_modules/.package-lock-hash"

# Parent directory of the script
SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"

# Change to the parent directory of the script
cd "$SCRIPT_DIR/.."

# Install dependencies if node_modules is missing or out of date
CURRENT_HASH=$(sha256sum package-lock.json | awk '{print $1}')
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies (node_modules directory is missing)..."
  npm ci
elif [ ! -f "$LOCK_HASH_FILE" ]; then
  echo "Installing dependencies (lockfile of package-lock.json is missing)..."
  npm ci
elif [ "$(cat "$LOCK_HASH_FILE")" != "$CURRENT_HASH" ]; then
  echo "Installing dependencies (package-lock.json has changed)..."
  npm ci
fi

# Build the application (must be run prior to starting the server to ensure the latest code is used)
echo "Building the application..."
npm run build

# Start the application
echo "Starting the application..."
npm start
