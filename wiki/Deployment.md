# Deployment

This guide covers deployment options and configurations for TECSOQR.

## GitHub Pages Deployment

### Automatic Deployment

The project is configured for automatic deployment to GitHub Pages using GitHub Actions.

#### Workflow Configuration

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install Dependencies
        run: npm ci --legacy-peer-deps

      - name: Build
        run: npm run build
        env:
          VITE_APP_TITLE: TeCSO QR
          VITE_APP_DESCRIPTION: Modern QR Code Generator
          VITE_APP_URL: https://sobhanaz.github.io/tecsoqr

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Manual Deployment

If you need to deploy manually:

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
git add dist -f
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

## Custom Domain Deployment

### Domain Configuration

1. Add CNAME file to `public` folder:

```
qrcode.tecso.team
```

2. Configure DNS settings:

```
Type: CNAME
Name: qrcode
Value: sobhanaz.github.io
```

### Environment Setup

Create `.env.production`:

```env
VITE_APP_TITLE=TecsoQR
VITE_APP_DESCRIPTION=Modern QR Code Generator
VITE_APP_URL=https://qrcode.tecso.team
```

## Cloudflare Pages

### Setup Instructions

1. Connect your GitHub repository to Cloudflare Pages

2. Configure build settings:

```
Build command: npm run build
Build output directory: dist
Node.js version: 20.x
```

3. Add environment variables:

```
VITE_APP_TITLE=TecsoQR
VITE_APP_DESCRIPTION=Modern QR Code Generator
VITE_APP_URL=https://your-cloudflare-pages-url
```

### Custom Domain Setup

1. Add domain in Cloudflare Pages dashboard
2. Configure DNS settings
3. Wait for SSL certificate provisioning

## Progressive Web App (PWA)

### PWA Configuration

```typescript
// vite.config.ts
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["assets/logo.svg"],
      manifest: {
        name: "TECSOQR",
        short_name: "TECSOQR",
        description: "Create Custom QR Codes for Free",
        theme_color: "#0967D2",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "assets/logo.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
        start_url: "/tecsoqr/",
        scope: "/tecsoqr/",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
```

### Service Worker

The service worker is automatically generated and managed by the VitePWA plugin.

### Cache Strategy

1. **Static Assets**

- JavaScript files
- CSS files
- SVG images
- HTML files

2. **External Resources**

- Google Fonts (CacheFirst strategy)
- API responses (NetworkFirst strategy)

## Performance Optimization

### Build Optimization

1. Configure Vite build:

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
  },
});
```

2. Enable chunking:

```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        qr: ['qrcode']
      }
    }
  }
}
```

### Asset Optimization

1. Image optimization:

- Use SVG for logos
- Optimize PNGs and JPGs
- Implement lazy loading

2. Font optimization:

- Use system fonts when possible
- Implement font-display: swap
- Preload critical fonts

## Security Considerations

### Headers Configuration

1. Content Security Policy:

```
Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;
```

2. CORS Headers:

```
Access-Control-Allow-Origin: https://qrcode.tecso.team
```

### SSL Configuration

Ensure SSL is properly configured:

1. Enable HTTPS
2. Configure SSL certificates
3. Enable HSTS

## Monitoring and Analytics

### Error Tracking

1. Console error logging
2. Error boundary implementation
3. Service worker error handling

### Performance Monitoring

1. Core Web Vitals tracking
2. Load time monitoring
3. User interaction tracking

## Backup and Recovery

### Backup Strategy

1. Regular code backups
2. Database backups (if applicable)
3. Configuration backups

### Recovery Plan

1. Rollback procedures
2. Emergency contact list
3. Incident response plan
