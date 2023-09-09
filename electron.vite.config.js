import { resolve } from 'path'
import { fileURLToPath } from 'node:url'

import { defineConfig, externalizeDepsPlugin } from 'electron-vite' //Electron-vite
import vue from '@vitejs/plugin-vue' //Plugin for Vue

// https://electron-vite.org/config/
export default defineConfig({
  
  //Preload Config
  preload: {
    build: {
      rollupOptions: {
        input: {
          preload: resolve(__dirname, 'src', 'assets', 'preload', 'preload.js')
        }
      },
      outDir: 'out/assets/preload'
    },
    plugins: [externalizeDepsPlugin()]
  },

  //Electron Main File Config
  main: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src', 'app.js')
        }
      },
      outDir : 'out/'
    },
    plugins: [externalizeDepsPlugin()]
  },

  //Renderer Or Vite Config
  renderer: {
    root: ".",
    server: {
      port: 3030
    },
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'index.html')
        }
      },
      outDir: "out/dist",
      publicDir: resolve(__dirname, 'public'),
      assetsDir: resolve(__dirname, 'src', 'assets')
    },
    resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
    },
    plugins: [vue()]
  }
})
