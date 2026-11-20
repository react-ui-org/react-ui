#!/bin/bash

DEFAULT_USER_ID=1000
DEFAULT_GROUP_ID=1000

set -e
trap 'echo "Failed to set up project"; rm -f .env.temp; exit 1' ERR

REBUILD=false
RECREATE_FILES=false

while [ $# -gt 0 ]; do
  case "$1" in
    -r|--rebuild-docker-images)
      REBUILD=true
      shift
      ;;
    -c|--recreate-files)
      RECREATE_FILES=true
      shift
      ;;
    -h|--help)
      echo "Usage: $0 [options]"
      echo ""
      echo "Set up the project: create and configure the .env and docker-compose.yml"
      echo "files if they do not exist yet and build Docker images."
      echo ""
      echo "Options:"
      echo "  -r, --rebuild-docker-images    Rebuild all Docker images from scratch, even if they already exist"
      echo "  -c, --recreate-files           Recreate the .env and docker-compose.yml files and the existing .env.<name> files, backing up the existing ones as *.backup"
      echo "  -h, --help                     Show help"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      echo "Run '$0 --help' for usage information."
      exit 1
      ;;
  esac
done

# Function to handle sed command with cross-platform compatibility
sed_cmd() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "$@"
  else
    sed -i "$@"
  fi
}

cd "$(dirname "$0")"

# The project name in .env.dist is the default project name, the name of the project
# devcontainer image and the name of its directory in docker/ are derived from it
DEFAULT_PROJECT_NAME=$(grep -E '^COMPOSE_PROJECT_NAME=' .env.dist | cut -d '=' -f 2-)

echo "Setting up project..."

# Back up and remove the existing configuration files when their recreation is requested
if [ "$RECREATE_FILES" = true ]; then
  if [ -f .env ]; then
    echo "Backing up existing .env file to .env.backup..."
    mv .env .env.backup
  fi
  if [ -f docker-compose.yml ]; then
    echo "Backing up existing docker-compose.yml file to docker-compose.yml.backup..."
    mv docker-compose.yml docker-compose.yml.backup
  fi
  # A project may have more environment files, each .env.<name> file is an optional
  # copy of its .env.<name>.dist template that needs no further configuration
  for ENV_DIST_FILE in .env.*.dist; do
    ENV_FILE="${ENV_DIST_FILE%.dist}"
    if [ -f "$ENV_FILE" ]; then
      echo "Backing up existing $ENV_FILE file to $ENV_FILE.backup and recreating it..."
      mv "$ENV_FILE" "$ENV_FILE.backup"
      cp "$ENV_DIST_FILE" "$ENV_FILE"
    fi
  done
fi

# Create and configure .env file if it doesn't exist
if [ ! -f .env ]; then
  echo "Creating .env file..."
  cp .env.dist .env.temp

  echo "Configuring .env file..."

  PROJECT_PATH=$(pwd)
  # Normalize the basename the same way Docker Compose derives its default project name
  PROJECT_NAME=$(basename "$PROJECT_PATH" | LC_ALL=C tr '[:upper:]' '[:lower:]' | LC_ALL=C sed -e 's/[^a-z0-9_-]//g' -e 's/^[^a-z0-9]*//')
  PROJECT_NAME="${PROJECT_NAME:-$DEFAULT_PROJECT_NAME}"

  if [[ "$OSTYPE" == "darwin"* ]]; then
      # MacOS
      USER_ID=$DEFAULT_USER_ID
      GROUP_ID=$DEFAULT_GROUP_ID
  else
      # Linux
      USER_ID=$(id -u)
      GROUP_ID=$(id -g)
  fi

  sed_cmd "s|^COMPOSE_PROJECT_NAME=.*|COMPOSE_PROJECT_NAME=$PROJECT_NAME|" .env.temp
  sed_cmd "s|^COMPOSE_UID=.*|COMPOSE_UID=$USER_ID|" .env.temp
  sed_cmd "s|^COMPOSE_GID=.*|COMPOSE_GID=$GROUP_ID|" .env.temp
  # Only projects that map the workspace to the host path have this variable
  sed_cmd "s|^COMPOSE_PROJECT_PATH=.*|COMPOSE_PROJECT_PATH=/workspace=$PROJECT_PATH|" .env.temp

  LOCAL_SHELL=
  if [ -n "$SHELL" ]; then
    case "$(basename "$SHELL")" in
      bash|fish|zsh)
        LOCAL_SHELL="/bin/$(basename "$SHELL")"
        sed_cmd "s|^SHELL=.*|SHELL=$LOCAL_SHELL|" .env.temp
        ;;
    esac
  fi

  LOCAL_EDITOR=
  if [ -n "$EDITOR" ]; then
    case "$(basename "$EDITOR")" in
      vim|nano)
        LOCAL_EDITOR=$(basename "$EDITOR")
        sed_cmd "s|^EDITOR=.*|EDITOR=$LOCAL_EDITOR|" .env.temp
        ;;
    esac
  fi

  LOCAL_VISUAL=
  if [ -n "$VISUAL" ]; then
    case "$(basename "$VISUAL")" in
      vim|nano)
        LOCAL_VISUAL=$(basename "$VISUAL")
        sed_cmd "s|^VISUAL=.*|VISUAL=$LOCAL_VISUAL|" .env.temp
        ;;
    esac
  fi

  cp .env.temp .env
  rm .env.temp

  echo "Configured .env file with the following values:"
  echo "Project name: $PROJECT_NAME"
  echo "Project path: $PROJECT_PATH"
  echo "User ID: $USER_ID"
  echo "Group ID: $GROUP_ID"

  if [ -n "$LOCAL_SHELL" ]; then
    echo "Shell: $LOCAL_SHELL"
  fi
  if [ -n "$LOCAL_EDITOR" ]; then
    echo "Editor: $LOCAL_EDITOR"
  fi
  if [ -n "$LOCAL_VISUAL" ]; then
    echo "Visual: $LOCAL_VISUAL"
  fi
else
  echo ".env file already exists, skipping creation. Use --recreate-files to recreate it."
fi

# Validate the project name in .env, it may have been edited manually
PROJECT_NAME=$(grep -E '^COMPOSE_PROJECT_NAME=' .env | cut -d '=' -f 2-)
if ! printf '%s' "$PROJECT_NAME" | grep -Eq '^[a-z0-9][a-z0-9_-]*$'; then
  echo "Error: COMPOSE_PROJECT_NAME=\"$PROJECT_NAME\" in .env is not a valid Docker Compose project name, use only lowercase letters, digits, '-' and '_' and start with a letter or digit"
  exit 1
fi

# Create docker-compose.yml if it doesn't exist
if [ ! -f docker-compose.yml ]; then
  echo "Creating and configuring docker-compose.yml file..."
  cp docker-compose.yml.dist docker-compose.yml

  # Image names use `-` instead of `_`, like the directories in docker/
  DEFAULT_PROJECT_DEVCONTAINER_IMAGE="$(printf '%s' "$DEFAULT_PROJECT_NAME" | tr '_' '-')-devcontainer"
  PROJECT_DEVCONTAINER_IMAGE="$(printf '%s' "$PROJECT_NAME" | tr '_' '-')-devcontainer"

  sed_cmd "s|image: $DEFAULT_PROJECT_DEVCONTAINER_IMAGE|image: $PROJECT_DEVCONTAINER_IMAGE|" docker-compose.yml
else
  echo "docker-compose.yml file already exists, skipping creation. Use --recreate-files to recreate it."
fi

# Configure the Chrome-host bridge networking (native Docker Engine only)
sh ./tools/agents/mcps/chrome-host/mcp-setup.sh

# Build Docker images
if [ "$REBUILD" = true ]; then
  bash ./docker/build-docker-images.sh --rebuild-docker-images
else
  bash ./docker/build-docker-images.sh
fi

echo "Project setup completed successfully!"
