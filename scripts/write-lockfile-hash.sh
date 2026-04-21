#!/bin/sh

set -e

# File to store the hash of the package-lock.json
LOCK_HASH_FILE="node_modules/.package-lock-hash"

# Parent directory of the script
SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"

# Change to the parent directory of the script
cd "$SCRIPT_DIR/.."

# Record the hash of the lockfile we just installed against
sha256sum package-lock.json | awk '{print $1}' > "$LOCK_HASH_FILE"
