import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `index.js`,
        chunkFileNames: `index.js`, // si no tienes código dividido, este también puede ir
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'index.css';
          }
          return assetInfo.name || 'assets/[name].[ext]';
        }
      }
    }
  }
});
// Este archivo es la configuración de Vite para el proyecto Vue.js.