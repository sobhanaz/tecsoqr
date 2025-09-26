import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
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
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        start_url: "/tecsoqr/",
        scope: "/tecsoqr/",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,webp}", "assets/logo.svg"],
        navigateFallback: "/tecsoqr/index.html",
        cleanupOutdatedCaches: true,
        globIgnores: ["**/__WB_REVISION__*"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "image-cache",
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
      includeAssets: [
        "assets/logo.svg",
        "icons/icon-192x192.png",
        "icons/icon-512x512.png",
      ],
    }),
  ],
  base: "/tecsoqr/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
