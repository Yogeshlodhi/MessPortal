import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Base public path. Defaults to "/" (local dev, Docker/nginx at root).
// The GitHub Pages workflow sets VITE_BASE_PATH=/MessPortal/ so assets resolve
// under https://<user>.github.io/MessPortal/.
export default defineConfig(({ mode }) => ({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  resolve: {
    alias: {
      Common: path.resolve(__dirname, 'src/Common'),
      Student: path.resolve(__dirname, 'src/Student'),
      Admin: path.resolve(__dirname, 'src/Admin'),
      Redux: path.resolve(__dirname, 'src/Redux'),
      Routes: path.resolve(__dirname, 'src/Routes'),
      Layout: path.resolve(__dirname, 'src/Layout'),
      Rbac: path.resolve(__dirname, 'src/Rbac'),
      Utils: path.resolve(__dirname, 'src/Utils'),
      Axios: path.resolve(__dirname, 'src/Axios'),
      Assets: path.resolve(__dirname, 'src/assets'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  optimizeDeps: {
    include: [
      '@mui/material',
      '@mui/material/styles',
      '@mui/material/Tooltip',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
      '@emotion/cache',
    ],
  },
  build: {
    outDir: 'build',
    sourcemap: 'hidden',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          state: ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
          form: ['react-hook-form', 'yup', '@hookform/resolvers'],
          ui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          mantine: ['@mantine/core', '@mantine/hooks', '@mantine/form', '@mantine/dates'],
        },
      },
    },
  },
}));
