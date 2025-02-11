import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Pashmina App',
        short_name: 'Pashmina',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#3b82f6',
        icons: [
          {
            src: '/pashmina.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/title.jpg',
            sizes: '512x512',
            type: 'image/jpg',
          },
        ],
      },
    }),
  ],
})
