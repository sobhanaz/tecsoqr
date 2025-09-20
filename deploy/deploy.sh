#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="/root/tecsoqr"

echo "Starting deploy on $(hostname)"
cd "$REPO_DIR"

echo "Fetching latest from origin/main"
git fetch --all --prune
git reset --hard origin/main

echo "Building Docker image(s)"
docker-compose build --no-cache

echo "Stopping any running compose stack (if present)"
# Stop and remove containers created by this compose (safe even if none exist)
docker-compose down --remove-orphans || true

echo "Bringing up containers"
if ! docker-compose up -d --remove-orphans; then
	echo "docker-compose up failed — attempting to clean stale containers and retry"
	# Try to remove any lingering containers with the project name
	set +e
	for c in $(docker ps -a --filter "name=tecsoqr" --format "{{.ID}}") ; do
		echo "Removing stale container $c"
		docker rm -f "$c" || true
	done
	set -e
	docker-compose up -d --remove-orphans
fi

echo "Pruning unused images"
docker image prune -f || true

echo "Deploy finished"
