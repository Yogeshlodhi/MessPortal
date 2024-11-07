import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     '@emotion/styled': '@mui/styled-engine-sc'
  //   }
  // }
  // server: {
  //   port: 4000,
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:4000',
  //       changeOrigin: true,
  //     }
  //   }
  // }
})
