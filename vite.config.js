import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    // Proxy API calls to the Express backend during development so the
    // frontend can call /api/* without worrying about CORS or ports.
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // If the backend isn't running, return a clear JSON error instead
        // of an opaque 500 so the UI can tell the user what to do.
        configure: (proxy) => {
          proxy.on('error', (err, _req, res) => {
            console.error(
              `\n[proxy] Cannot reach API on :8080 (${err.code}). ` +
                `Start it with:  npm run server\n`,
            )
            if (res.writableEnded) return
            res.writeHead(503, { 'Content-Type': 'application/json' })
            res.end(
              JSON.stringify({
                message:
                  'Payment API is not running. Start it with "npm run server" (or use "npm run dev:all").',
              }),
            )
          })
        },
      },
    },
  },
})
