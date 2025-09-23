# TECSOQR Automatic Deployment Setup

This guide will help you set up automatic deployment for your TECSOQR application when you push changes to GitHub.

## Overview

The system works as follows:
1. You push code to GitHub
2. GitHub sends a webhook to your server
3. Your server receives the webhook and automatically runs the deployment script
4. Your application is rebuilt and redeployed

## Prerequisites

- Node.js installed on your server
- Your TECSOQR repository cloned to `/root/tecsoqr`
- Docker and docker-compose working
- Nginx configured for your domain

## Step 1: Install the Webhook System

Run the setup script on your server:

```bash
cd /root/tecsoqr/deploy/webhook
sudo ./setup-webhook.sh
```

This script will:
- Generate a secure webhook secret
- Install the webhook service
- Start the webhook listener on port 9000
- Create log files for monitoring

## Step 2: Configure Nginx (Optional)

If you want to expose the webhook through your domain (recommended for production):

1. The setup script creates a nginx config template at `/etc/nginx/sites-available/webhook-qrcode.conf`
2. Edit the domain name in the config:
   ```bash
   sudo nano /etc/nginx/sites-available/webhook-qrcode.conf
   # Change 'webhook.tecso.team' to your actual webhook domain
   ```

3. Enable the configuration:
   ```bash
   sudo ln -s /etc/nginx/sites-available/webhook-qrcode.conf /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```

## Step 3: Configure GitHub Webhook

1. Go to your GitHub repository: `https://github.com/sobhanaz/tecsoqr`
2. Click **Settings** → **Webhooks** → **Add webhook**
3. Configure the webhook:
   - **Payload URL**: `http://your-domain.com/webhook` (or use your server IP)
   - **Content type**: `application/json`
   - **Secret**: Use the webhook secret from the setup script output
   - **Which events**: Select "Just the push event"
   - **Active**: ✓ (checked)
4. Click **Add webhook**

## Step 4: Test the Setup

1. Check if the webhook service is running:
   ```bash
   systemctl status tecsoqr-webhook
   ```

2. Test the health endpoint:
   ```bash
   curl http://127.0.0.1:9000/health
   ```

3. Make a test commit and push to see if deployment triggers:
   ```bash
   # Make a small change and commit
   git add .
   git commit -m "Test auto-deployment"
   git push origin main
   ```

4. Check the webhook logs:
   ```bash
   journalctl -u tecsoqr-webhook -f
   ```

## Monitoring and Troubleshooting

### Service Management
```bash
# Check service status
systemctl status tecsoqr-webhook

# View service logs
journalctl -u tecsoqr-webhook -f

# Restart service
sudo systemctl restart tecsoqr-webhook

# Stop service
sudo systemctl stop tecsoqr-webhook
```

### Log Files
- Service logs: `journalctl -u tecsoqr-webhook -f`
- Application logs: `tail -f /var/log/tecsoqr-webhook.log`

### Common Issues

1. **Service won't start**:
   - Check if Node.js is installed: `node --version`
   - Check service logs: `journalctl -u tecsoqr-webhook -xe`

2. **Webhook not triggering**:
   - Verify webhook secret matches
   - Check GitHub webhook delivery logs
   - Test health endpoint: `curl http://127.0.0.1:9000/health`

3. **Deployment fails**:
   - Check deploy script permissions: `ls -la /root/tecsoqr/deploy/deploy.sh`
   - Verify Docker is running: `docker ps`
   - Check application logs: `tail -f /var/log/tecsoqr-webhook.log`

## Security Considerations

- The webhook secret is automatically generated and secured
- The service runs on localhost only by default
- Only push events to the main branch trigger deployment
- The webhook verifies GitHub's signature before processing

## Configuration Files

- **Webhook Server**: `/root/tecsoqr/deploy/webhook/webhook-server.js`
- **Systemd Service**: `/etc/systemd/system/tecsoqr-webhook.service`
- **Nginx Config**: `/etc/nginx/sites-available/webhook-qrcode.conf`
- **Setup Script**: `/root/tecsoqr/deploy/webhook/setup-webhook.sh`

## Environment Variables

You can customize the webhook behavior by modifying the systemd service:

```bash
sudo systemctl edit tecsoqr-webhook
```

Add environment variables:
```ini
[Service]
Environment=WEBHOOK_PORT=9000
Environment=WEBHOOK_SECRET=your-secret-here
```