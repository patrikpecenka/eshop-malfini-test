import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    react(),
    tsconfigPaths(),
    compression(),
  ],
  server: {
    open: true,
    port: 3000,
    host: '0.0.0.0',
  },

});