import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],

  build: {
    outDir: 'dist', // Переконайтесь, що збірка йде у папку `dist`
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },

  },

  server: {
    host: '0.0.0.0',
    port: 3000,
  }
})

