import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg', 'resource/*', 'roms/*'],
      manifest: {
        name: 'WQXSIM',
        short_name: 'WQXSIM',
        description: 'NC2000 Emulator',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'vite.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm,json,bmp,nand,nand0,nor}'],
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024, // 50MB, as ROMs might be large
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
  base: './',
  build: {
    outDir: '../build',
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]_[hash].js',
        chunkFileNames: 'assets/[name]_[hash].js',
        assetFileNames: 'assets/[name]_[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue')) {
              return 'vue'
            } else if (id.includes('pinia')) {
              return 'pinia'
            } else {
              return 'vendor'
            }
          }
        }
      }
    }
  },
  optimizeDeps: {
    include: ['vue', 'pinia'],
  },
  assetsInclude: ['**/*.wasm'],
})
