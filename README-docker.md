# Running TECSOQR with Docker (safe for servers running other services)

This guide shows how to run the TECSOQR app in Docker while keeping it isolated from other host services (for example, `3x-ui`).

Summary of approach
- The app runs in a Docker container and listens on `127.0.0.1:3001` (localhost only).
- Host `nginx` proxies `qrcode.tecso.team` to `http://127.0.0.1:3001/tecsoqr/`.
- Cloudflare DNS record should be `A qrcode -> 91.231.186.57` set to **DNS only** (no proxy), as you already configured.

Files added
- `Dockerfile` — builds the app and serves it via nginx inside the container.
- `docker-compose.yml` — binds container to `127.0.0.1:3001`.
- `deploy/host-nginx-qrcode.conf` — example host nginx site config to proxy requests.

Run steps (on the server)

1) Make sure Docker and docker-compose are installed (already present on this server).

2) Build and launch the container:
```bash
cd /root/tecsoqr
docker-compose build --no-cache
docker-compose up -d
```

3) Verify locally on the server:
```bash
curl -I http://127.0.0.1:3001/tecsoqr/
```

4) Configure host nginx to proxy the domain (use the template in `deploy/host-nginx-qrcode.conf`):

- Create directory for certbot challenges:
```bash
sudo mkdir -p /var/www/certbot
sudo chown www-data:www-data /var/www/certbot
```

- Copy the site config to nginx and enable it (example):
```bash
sudo cp deploy/host-nginx-qrcode.conf /etc/nginx/sites-available/qrcode.tecso.team
sudo ln -s /etc/nginx/sites-available/qrcode.tecso.team /etc/nginx/sites-enabled/qrcode.tecso.team
sudo nginx -t && sudo systemctl reload nginx
```

5) Obtain TLS via certbot (recommended):
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d qrcode.tecso.team
```

6) After certbot completes, your host nginx will handle TLS termination and proxy to the container on localhost. This keeps the container unreachable from the public internet directly and avoids impacting `3x-ui`.

Notes & troubleshooting
- Cloudflare: keep DNS record `A qrcode` set to **DNS only** (the orange cloud disabled). If you enable Cloudflare proxy, certbot's HTTP challenge may fail — use Cloudflare's DNS challenge instead in that case.
- If your `3x-ui` uses port 80 or is managed by host nginx, this configuration will not change it as long as you don't overwrite the host's default server blocks. Add this site as a dedicated server block.
- If the host already uses `qrcode.tecso.team` in an existing host nginx configuration, merge the location block instead of creating a second site.

Optional: Run the compose as a systemd service (so it restarts on boot). I can provide an example systemd unit if you want.
