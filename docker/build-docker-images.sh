#!/bin/bash

set -e
trap 'echo "Failed to build Docker images"; exit 1' ERR

REBUILD=false

while [ $# -gt 0 ]; do
  case "$1" in
    -r|--rebuild-docker-images)
      REBUILD=true
      shift
      ;;
    -h|--help)
      echo "Usage: $0 [options]"
      echo ""
      echo "Build Docker images required for the development environment."
      echo ""
      echo "Options:"
      echo "  -r, --rebuild-docker-images    Rebuild all Docker images from scratch, even if they already exist"
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

cd "$(dirname "$0")"

echo "Building Docker images..."

if [ ! -f ../.env ]; then
  echo "Error: .env file not found in the project root"
  exit 1
fi

# When rebuilding, bypass the Docker layer cache so that even unchanged layers
# are re-executed and produce fresh results
NO_CACHE=
if [ "$REBUILD" = true ]; then
  NO_CACHE="--no-cache"
fi

# The project name in .env.dist is the default project name, the name of the project
# devcontainer directory is derived from it
DEFAULT_PROJECT_NAME=$(grep -E '^COMPOSE_PROJECT_NAME=' ../.env.dist | cut -d '=' -f 2-)
PROJECT_NAME=$(grep -E '^COMPOSE_PROJECT_NAME=' ../.env | cut -d '=' -f 2-)
PROJECT_NAME="${PROJECT_NAME:-$DEFAULT_PROJECT_NAME}"

# Image names use `-` instead of `_`, like the directories in docker/
PROJECT_DEVCONTAINER_DIRECTORY="$(printf '%s' "$DEFAULT_PROJECT_NAME" | tr '_' '-')-devcontainer"
PROJECT_DEVCONTAINER_IMAGE="$(printf '%s' "$PROJECT_NAME" | tr '_' '-')-devcontainer"

# A project that does not pull the `frontend-devcontainer` image from a registry
# keeps its source in docker/frontend-devcontainer/ and builds it locally
if [ -d ./frontend-devcontainer ]; then
  if [ "$REBUILD" = false ] && docker image inspect frontend-devcontainer &>/dev/null; then
    echo "Docker image frontend-devcontainer already exists, skipping build. Use --rebuild-docker-images to rebuild it."
  else
    echo "Building Docker image frontend-devcontainer..."
    docker build $NO_CACHE -t frontend-devcontainer -f ./frontend-devcontainer/Dockerfile ./frontend-devcontainer/
  fi
fi

if [ "$REBUILD" = false ] && docker image inspect "$PROJECT_DEVCONTAINER_IMAGE" &>/dev/null; then
  echo "Docker image $PROJECT_DEVCONTAINER_IMAGE already exists, skipping build. Use --rebuild-docker-images to rebuild it."
else
  echo "Building Docker image $PROJECT_DEVCONTAINER_IMAGE..."
  docker build $NO_CACHE -t "$PROJECT_DEVCONTAINER_IMAGE" -f "./$PROJECT_DEVCONTAINER_DIRECTORY/Dockerfile" "./$PROJECT_DEVCONTAINER_DIRECTORY/"
fi

cd ..

echo "Building project Docker images using docker compose..."
docker compose build $NO_CACHE

echo "All Docker images built successfully!"
