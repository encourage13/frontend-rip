import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    //mkcert(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'utility-services',
        short_name: 'utility-services',
        start_url: '/frontend-utility-services/',
        scope: '/frontend-utility-services/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#42b883',
        icons: [
          {
            src: '/frontend-utility-services/logo192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/frontend-utility-services/logo512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],

  base: '/frontend-utility-services/',

  build: {
    outDir: 'build',
  },

  server: {

    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p,
      },
      '/minio': {
        target: 'http://192.168.0.109:9000',
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p.replace(/^\/minio/, ''),
      },
    },
  },
})