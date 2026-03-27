#!/bin/bash

set -e
trap 'echo "Failed to build Docker images"; exit 1' ERR

cd "$(dirname "$0")"

echo "Building Docker images..."

PROJECT_NAME=$(grep -E '^COMPOSE_PROJECT_NAME=' ../.env | cut -d '=' -f 2-)
PROJECT_DEVCONTAINER_IMAGE="${PROJECT_NAME}_devcontainer"

echo "Building Docker image $PROJECT_DEVCONTAINER_IMAGE..."
docker build -t "$PROJECT_DEVCONTAINER_IMAGE" -f ./react_ui_devcontainer/Dockerfile ./react_ui_devcontainer/

cd ..

echo "Building project Docker images using docker-compose..."
docker compose build

echo "All Docker images built successfully!"
