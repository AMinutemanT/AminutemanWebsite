import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteImagemin from "vite-plugin-imagemin"

export default defineConfig({
  plugins: [react(),
    viteImagemin({
      gifsicle:{
        optimizationLevel:3,
        interlaced: false
      },
      optipng:{
        optimizationLevel:7,
      },
      mozjpeg:{
        quality:65,
        progressive:true,
      },
      pngquant:{
        quality:[0.65,0.8],
        speed:4
      },
      svgo:{
        plugins:[
          {
            name:'removeViewBox',active:false
          },
          {
            name:'cleanupIDs',
            active:true
          },
          {
            name:'removeDimensions',
            active:true
          }
        ]
      },
      webp:{
        quality:75,
      }
    })
  ],
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
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
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