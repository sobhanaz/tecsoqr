#!/usr/bin/env bash
set -euo pipefail

# Enhanced TECSOQR Deployment Script with Logging and Error Handling
# This script pulls the latest code and rebuilds the Docker container

REPO_DIR="/root/tecsoqr"
LOG_FILE="/var/log/tecsoqr-webhook.log"
BACKUP_DIR="/root/tecsoqr-backups"
MAX_BACKUPS=5

# Function to log messages
log() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] $1" | tee -a "$LOG_FILE"
}

# Function to handle errors
handle_error() {
    local exit_code=$?
    local line_number=$1
    log "ERROR: Deployment failed at line $line_number with exit code $exit_code"
    
    # Attempt to restore from backup if available
    if [[ -d "$BACKUP_DIR/latest" ]]; then
        log "Attempting to restore from backup..."
        restore_backup
    fi
    
    exit $exit_code
}

# Function to create backup
create_backup() {
    log "Creating backup before deployment..."
    
    mkdir -p "$BACKUP_DIR"
    
    # Remove old backups
    if [[ -d "$BACKUP_DIR" ]]; then
        local backup_count=$(find "$BACKUP_DIR" -maxdepth 1 -type d -name "backup-*" | wc -l)
        if [[ $backup_count -ge $MAX_BACKUPS ]]; then
            find "$BACKUP_DIR" -maxdepth 1 -type d -name "backup-*" | sort | head -n -$((MAX_BACKUPS-1)) | xargs rm -rf
        fi
    fi
    
    # Create timestamped backup
    local backup_name="backup-$(date +%Y%m%d-%H%M%S)"
    cp -r "$REPO_DIR" "$BACKUP_DIR/$backup_name"
    
    # Create/update latest symlink
    ln -sfn "$BACKUP_DIR/$backup_name" "$BACKUP_DIR/latest"
    
    log "Backup created: $BACKUP_DIR/$backup_name"
}

# Function to restore backup
restore_backup() {
    if [[ -d "$BACKUP_DIR/latest" ]]; then
        log "Restoring from backup..."
        
        # Stop current containers
        docker-compose down --remove-orphans 2>/dev/null || true
        
        # Restore files
        rsync -av --delete "$BACKUP_DIR/latest/" "$REPO_DIR/"
        
        # Restart containers
        cd "$REPO_DIR"
        docker-compose up -d --remove-orphans
        
        log "Backup restored successfully"
    else
        log "No backup available to restore"
    fi
}

# Function to check service health
check_health() {
    log "Checking application health..."
    
    local max_attempts=30
    local attempt=1
    
    while [[ $attempt -le $max_attempts ]]; do
        if curl -f -s "http://127.0.0.1:3001/tecsoqr/" > /dev/null 2>&1; then
            log "Application is healthy"
            return 0
        fi
        
        log "Health check attempt $attempt/$max_attempts failed, waiting..."
        sleep 2
        ((attempt++))
    done
    
    log "Health check failed after $max_attempts attempts"
    return 1
}

# Set up error handling
trap 'handle_error $LINENO' ERR

log "Starting enhanced deployment process on $(hostname)"

# Change to repo directory
cd "$REPO_DIR"

# Check if git repository is clean
if [[ -n $(git status --porcelain) ]]; then
    log "Warning: Repository has uncommitted changes"
    git status --short | while read line; do
        log "  $line"
    done
fi

# Create backup before deployment
create_backup

# Get current commit hash for comparison
OLD_COMMIT=$(git rev-parse HEAD)
log "Current commit: $OLD_COMMIT"

# Fetch latest changes
log "Fetching latest changes from origin/main"
git fetch --all --prune

# Check if there are any updates
NEW_COMMIT=$(git rev-parse origin/main)
log "Latest commit: $NEW_COMMIT"

if [[ "$OLD_COMMIT" == "$NEW_COMMIT" ]]; then
    log "No new commits to deploy"
    exit 0
fi

# Show what's being deployed
log "Deploying changes:"
git log --oneline "$OLD_COMMIT..$NEW_COMMIT" | while read line; do
    log "  $line"
done

# Reset to latest commit
log "Updating to latest commit"
git reset --hard origin/main

# Stop existing containers gracefully
log "Stopping existing containers"
if docker-compose ps -q | grep -q .; then
    docker-compose down --timeout 30
else
    log "No running containers to stop"
fi

# Clean up old images
log "Cleaning up old Docker images"
docker system prune -f --filter "until=24h" || log "Warning: Docker cleanup had issues"

# Build new image
log "Building new Docker image"
if ! docker-compose build --no-cache; then
    log "Docker build failed"
    exit 1
fi

# Start containers
log "Starting new containers"
if ! docker-compose up -d --remove-orphans; then
    log "Failed to start containers"
    exit 1
fi

# Wait for containers to be ready
log "Waiting for containers to start..."
sleep 10

# Check if containers are running
if ! docker-compose ps | grep -q "Up"; then
    log "Containers failed to start properly"
    docker-compose logs
    exit 1
fi

# Perform health check
if ! check_health; then
    log "Application health check failed"
    docker-compose logs --tail=50
    exit 1
fi

# Log success
DEPLOYED_COMMIT=$(git rev-parse HEAD)
log "Deployment completed successfully"
log "Deployed commit: $DEPLOYED_COMMIT"
log "Application is running and healthy"

# Clean up old backups
log "Cleaning up old backups"
find "$BACKUP_DIR" -maxdepth 1 -type d -name "backup-*" -mtime +7 -exec rm -rf {} \; || true

log "Enhanced deployment process finished"