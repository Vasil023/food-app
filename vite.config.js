import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { VitePWA } from "vite-plugin-pwa";


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // VitePWA({
    //   registerType: "autoUpdate",
    //   injectRegister: "auto",
    //   manifest: {
    //     name: "Finance",
    //     short_name: "Nyama",
    //     description: "Nyama App",
    //     theme_color: "#ffffff",
    //     icons: [
    //       {
    //         src: "img/icons/apple-touch-icon.png",
    //         sizes: "180x180",
    //         type: "image/png",
    //       },
    //     ],
    //   },
    //   workbox: {
    //     globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
    //   },
    // }),
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

