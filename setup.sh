#!/bin/bash

DEFAULT_PROJECT_NAME="react-ui"
DEFAULT_USER_ID=1000
DEFAULT_GROUP_ID=1000

set -e
trap 'echo "Failed to setup project"; exit 1' ERR

# Function to handle sed command with cross-platform compatibility
sed_cmd() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "$@"
  else
    sed -i "$@"
  fi
}

cd "$(dirname "$0")"

echo "Setting up project..."

# Create and configure .env file if it doesn't exist
if [ ! -f .env ]; then
  echo "Creating .env file..."
  cp .env.dist .env.temp

  echo "Configuring .env file..."

  PROJECT_PATH=$(pwd)
  PROJECT_NAME=$(basename "$PROJECT_PATH")

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

  LOCAL_SHELL=
  if [ -n "$SHELL" ]; then
    sed_cmd "s|^SHELL=.*|SHELL=$SHELL|" .env.temp
    LOCAL_SHELL=$SHELL
  fi

  LOCAL_EDITOR=
  if [ -n "$EDITOR" ]; then
    sed_cmd "s|^EDITOR=.*|EDITOR=$EDITOR|" .env.temp
    LOCAL_EDITOR=$EDITOR
  fi

  LOCAL_VISUAL=
  if [ -n "$VISUAL" ]; then
    sed_cmd "s|^VISUAL=.*|VISUAL=$VISUAL|" .env.temp
    LOCAL_VISUAL=$VISUAL
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
  echo ".env file already exists, skipping creation."
fi

# Create docker-compose.yml if it doesn't exist
if [ ! -f docker-compose.yml ]; then
  echo "Creating and configuring docker-compose.yml file..."
  cp docker-compose.yml.dist docker-compose.yml

  DEFAULT_PROJECT_DEVCONTAINER_IMAGE="${DEFAULT_PROJECT_NAME}_devcontainer"
  PROJECT_NAME=$(grep -E '^COMPOSE_PROJECT_NAME=' .env | cut -d '=' -f 2-)
  PROJECT_DEVCONTAINER_IMAGE="${PROJECT_NAME}_devcontainer"

  sed_cmd "s|image: $DEFAULT_PROJECT_DEVCONTAINER_IMAGE|image: $PROJECT_DEVCONTAINER_IMAGE|" docker-compose.yml
else
  echo "docker-compose.yml file already exists, skipping creation."
fi

# Build Docker images
sh ./docker/build-docker-images.sh

echo "Project setup completed successfully!"
