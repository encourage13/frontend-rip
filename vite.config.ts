import mkcert from 'vite-plugin-mkcert'

import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    host: '0.0.0.0',       
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err)
          })
          proxy.on('proxyReq', (_proxyReq, req, _res) => {
            console.log('Sending Request to Target:', req.method, req.url)
          })
        },
      },
    '/minio': {
      target: 'http://192.168.0.101:9000',
      changeOrigin: true,
      secure: false,
      rewrite: (p) => p.replace(/^\/minio/, ''),
    },
    },
  },

  plugins: [
    react(),
    mkcert(),
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
})
