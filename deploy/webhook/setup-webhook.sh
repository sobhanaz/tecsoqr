#!/usr/bin/env bash
set -euo pipefail

# TECSOQR Webhook Setup Script
# This script sets up the automatic deployment system

echo "Setting up TECSOQR automatic deployment system..."

# Configuration
WEBHOOK_PORT=${WEBHOOK_PORT:-9000}
WEBHOOK_SECRET=${WEBHOOK_SECRET:-$(openssl rand -hex 32)}
SERVICE_NAME="tecsoqr-webhook"
WEBHOOK_DIR="/root/tecsoqr/deploy/webhook"
LOG_FILE="/var/log/tecsoqr-webhook.log"

# Function to print colored output
print_status() {
    echo -e "\033[1;32m[INFO]\033[0m $1"
}

print_warning() {
    echo -e "\033[1;33m[WARNING]\033[0m $1"
}

print_error() {
    echo -e "\033[1;31m[ERROR]\033[0m $1"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   print_error "This script must be run as root"
   exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first:"
    echo "curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -"
    echo "sudo apt-get install -y nodejs"
    exit 1
fi

print_status "Node.js version: $(node --version)"

# Create log file
touch "$LOG_FILE"
chmod 644 "$LOG_FILE"
print_status "Created log file: $LOG_FILE"

# Update systemd service file with the actual webhook secret
sed -i "s/your-webhook-secret-change-me/$WEBHOOK_SECRET/g" "$WEBHOOK_DIR/tecsoqr-webhook.service"
print_status "Updated service file with generated webhook secret"

# Copy service file to systemd
cp "$WEBHOOK_DIR/tecsoqr-webhook.service" "/etc/systemd/system/$SERVICE_NAME.service"
print_status "Installed systemd service: $SERVICE_NAME"

# Reload systemd and enable service
systemctl daemon-reload
systemctl enable "$SERVICE_NAME"
print_status "Enabled $SERVICE_NAME service"

# Start the service
if systemctl start "$SERVICE_NAME"; then
    print_status "Started $SERVICE_NAME service"
else
    print_error "Failed to start $SERVICE_NAME service"
    systemctl status "$SERVICE_NAME"
    exit 1
fi

# Wait a moment for service to start
sleep 2

# Check service status
if systemctl is-active --quiet "$SERVICE_NAME"; then
    print_status "Service is running successfully"
else
    print_error "Service failed to start"
    systemctl status "$SERVICE_NAME"
    exit 1
fi

# Test webhook endpoint
print_status "Testing webhook endpoint..."
if curl -f -s "http://127.0.0.1:$WEBHOOK_PORT/health" > /dev/null; then
    print_status "Webhook endpoint is responding"
else
    print_warning "Webhook endpoint test failed - service might still be starting"
fi

# Update nginx configuration if needed
NGINX_WEBHOOK_CONFIG="/etc/nginx/sites-available/webhook-qrcode.conf"
if [[ ! -f "$NGINX_WEBHOOK_CONFIG" ]]; then
    cat > "$NGINX_WEBHOOK_CONFIG" << EOF
# GitHub Webhook endpoint for TECSOQR
server {
    listen 80;
    server_name webhook.tecso.team;  # Change this to your webhook domain

    # Webhook endpoint
    location /webhook {
        proxy_pass http://127.0.0.1:$WEBHOOK_PORT/webhook;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://127.0.0.1:$WEBHOOK_PORT/health;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Block other requests
    location / {
        return 404;
    }
}
EOF
    print_status "Created nginx webhook configuration: $NGINX_WEBHOOK_CONFIG"
    print_warning "Enable it with: ln -s $NGINX_WEBHOOK_CONFIG /etc/nginx/sites-enabled/"
fi

echo ""
print_status "=== SETUP COMPLETE ==="
echo ""
print_status "Webhook Secret: $WEBHOOK_SECRET"
print_status "Webhook URL: http://your-domain.com/webhook"
print_status "Health Check: http://127.0.0.1:$WEBHOOK_PORT/health"
echo ""
print_status "Next steps:"
echo "1. Add the webhook secret to your GitHub repository settings"
echo "2. Configure nginx to proxy webhook requests (if using external domain)"
echo "3. Set up the webhook in GitHub: Settings > Webhooks > Add webhook"
echo "   - Payload URL: http://your-domain.com/webhook"
echo "   - Content type: application/json"
echo "   - Secret: $WEBHOOK_SECRET"
echo "   - Events: Just push events"
echo ""
print_status "Service management commands:"
echo "  Status: systemctl status $SERVICE_NAME"
echo "  Logs:   journalctl -u $SERVICE_NAME -f"
echo "  Stop:   systemctl stop $SERVICE_NAME"
echo "  Start:  systemctl start $SERVICE_NAME"
echo ""