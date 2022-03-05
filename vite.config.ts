import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  base: '/TTUID-ClassRoom-Rent-System/',
  plugins: [vue(), WindiCSS()],
  
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
  define: {
    'process.env': {},
  },
})
