import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    svgLoader()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/constants.scss";`,
      }
    }
  }
});
