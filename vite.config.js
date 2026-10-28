import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5002',
        changeOrigin: true,
        // The browser talks to Vite on the same origin. Remove its Origin
        // header on the server-to-server hop so the API's browser CORS policy
        // does not reject the dev server origin (localhost:5173).
        secure: false,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.removeHeader('origin')
          })
        },
      },
    },
  },
  resolve: {
    // Keep hooks and the renderer on the same React module in linked packages.
    dedupe: ['react', 'react-dom'],
  },
})
