import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: [
      'src/**/*.js',   // Ensure all JS files are included
      'src/**/*.jsx',  // Include all JSX files as well
    ],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
