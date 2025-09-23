#!/usr/bin/env node
/**
 * GitHub Webhook Server for TECSOQR Auto-Deployment
 * 
 * This server listens for GitHub webhook events and triggers automatic deployment
 * when changes are pushed to the main branch.
 * 
 * Usage: node webhook-server.js
 */

const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const PORT = process.env.WEBHOOK_PORT || 9000;
const SECRET = process.env.WEBHOOK_SECRET || 'your-webhook-secret-change-me';
const REPO_PATH = '/root/tecsoqr';
const DEPLOY_SCRIPT = path.join(REPO_PATH, 'deploy', 'deploy-enhanced.sh');
const LOG_FILE = '/var/log/tecsoqr-webhook.log';

// Logging utility
function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    
    console.log(logMessage.trim());
    
    // Write to log file
    fs.appendFileSync(LOG_FILE, logMessage, { flag: 'a' });
}

// Verify GitHub webhook signature
function verifySignature(payload, signature) {
    if (!signature) {
        return false;
    }

    const expectedSignature = 'sha256=' + crypto
        .createHmac('sha256', SECRET)
        .update(payload)
        .digest('hex');

    return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
    );
}

// Execute deployment script
function deployApplication() {
    return new Promise((resolve, reject) => {
        log('Starting deployment process...');
        
        const deployProcess = exec(`bash "${DEPLOY_SCRIPT}"`, {
            cwd: REPO_PATH,
            env: {
                ...process.env,
                PATH: process.env.PATH + ':/usr/local/bin:/usr/bin:/bin'
            }
        });

        let stdout = '';
        let stderr = '';

        deployProcess.stdout.on('data', (data) => {
            stdout += data;
            log(`DEPLOY STDOUT: ${data.toString().trim()}`);
        });

        deployProcess.stderr.on('data', (data) => {
            stderr += data;
            log(`DEPLOY STDERR: ${data.toString().trim()}`);
        });

        deployProcess.on('close', (code) => {
            if (code === 0) {
                log('Deployment completed successfully');
                resolve({ success: true, stdout, stderr });
            } else {
                log(`Deployment failed with exit code ${code}`);
                reject({ success: false, code, stdout, stderr });
            }
        });

        deployProcess.on('error', (error) => {
            log(`Deployment error: ${error.message}`);
            reject({ success: false, error: error.message });
        });
    });
}

// HTTP server
const server = http.createServer(async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Hub-Signature-256');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Health check endpoint
    if (req.method === 'GET' && req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'healthy',
            service: 'tecsoqr-webhook',
            timestamp: new Date().toISOString()
        }));
        return;
    }

    // Only accept POST requests for webhooks
    if (req.method !== 'POST' || req.url !== '/webhook') {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
        return;
    }

    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', async () => {
        try {
            // Verify signature
            const signature = req.headers['x-hub-signature-256'];
            if (!verifySignature(body, signature)) {
                log('Invalid signature received');
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid signature' }));
                return;
            }

            // Parse payload
            const payload = JSON.parse(body);
            
            // Log webhook event
            log(`Received webhook: ${payload.ref} from ${payload.repository.full_name}`);
            
            // Check if this is a push to main branch
            if (payload.ref !== 'refs/heads/main') {
                log(`Ignoring push to branch: ${payload.ref}`);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'Webhook received but not deploying (not main branch)',
                    ref: payload.ref
                }));
                return;
            }

            // Check if repository matches
            if (payload.repository.name !== 'tecsoqr') {
                log(`Ignoring webhook from different repository: ${payload.repository.name}`);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'Webhook received but not deploying (wrong repository)',
                    repository: payload.repository.name
                }));
                return;
            }

            log(`Deploying commit: ${payload.head_commit.id} - "${payload.head_commit.message}"`);

            // Execute deployment
            try {
                await deployApplication();
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'Deployment triggered successfully',
                    commit: payload.head_commit.id,
                    timestamp: new Date().toISOString()
                }));
                
                log(`Successfully deployed commit: ${payload.head_commit.id}`);
                
            } catch (deployError) {
                log(`Deployment failed: ${JSON.stringify(deployError)}`);
                
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    error: 'Deployment failed',
                    details: deployError
                }));
            }

        } catch (error) {
            log(`Webhook processing error: ${error.message}`);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: 'Internal server error',
                message: error.message
            }));
        }
    });
});

// Start server
server.listen(PORT, '127.0.0.1', () => {
    log(`TECSOQR Webhook Server started on http://127.0.0.1:${PORT}`);
    log(`Monitoring repository: tecsoqr`);
    log(`Deploy script: ${DEPLOY_SCRIPT}`);
    
    // Ensure log file exists
    try {
        if (!fs.existsSync(LOG_FILE)) {
            fs.writeFileSync(LOG_FILE, '', { flag: 'w' });
        }
    } catch (error) {
        console.error(`Warning: Could not create log file ${LOG_FILE}:`, error.message);
    }
});

// Handle process termination
process.on('SIGTERM', () => {
    log('Received SIGTERM, shutting down gracefully');
    server.close(() => {
        log('Webhook server stopped');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    log('Received SIGINT, shutting down gracefully');
    server.close(() => {
        log('Webhook server stopped');
        process.exit(0);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    log(`Uncaught exception: ${error.message}`);
    console.error(error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    log(`Unhandled rejection at: ${promise}, reason: ${reason}`);
    console.error(reason);
    process.exit(1);
});