import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  server: {
    open: true,
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    rollupOptions: {
      external: ["react", "react-router", "react-router-dom"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  }
})