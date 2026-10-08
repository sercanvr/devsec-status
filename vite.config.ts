/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true, // Mobil erişim için şart
    open: true,
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173, // Mobilde anlık yenileme için şart
    },
    watch: {
      usePolling: true,
    },
  },
  // TEST CONFIGURATION
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    css: true,
  },
  // PERFORMANCE OPTIMIZATIONS
  build: {
    target: 'esnext', // Modern tarayıcılar için optimize et
    minify: 'esbuild', // En hızlı sıkıştırma
    cssCodeSplit: true, // CSS'i parçalara böl
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            if (id.includes('i18next')) {
              return 'vendor-i18n';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            return 'vendor-utils';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
