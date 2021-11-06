import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  // base: '/TTUID-ClassRoom-Rent-System/',
  plugins: [vue(), WindiCSS(), Components()],
  build: {
    outDir: 'docs',
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
  define: {
    process: {},
  },
})
