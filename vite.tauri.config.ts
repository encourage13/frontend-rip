import mkcert from 'vite-plugin-mkcert'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    https: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p,
      },
      '/minio': {
        target: 'http://192.168.0.101:9000',
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p.replace(/^\/minio/, ''),
      },
    },
  },
  plugins: [react(), mkcert()],
  base: './',
})
