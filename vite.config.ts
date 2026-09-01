import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        // three.js is reached only through the lazily imported ModelViewer, so it
        // is deliberately NOT named here: naming it would pull the chunk into the
        // entry preload graph and every page would pay for the renderer.
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion']
        }
      }
    }
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true
  },
  preview: {
    port: 4173,
    strictPort: true,
    host: true
  },
  assetsInclude: ['**/*.fbx', '**/*.glb', '**/*.gltf']
});