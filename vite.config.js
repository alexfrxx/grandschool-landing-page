import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),

    ViteImageOptimizer({
      avif: {
        quality: 40,
      },

      webp: {
        quality: 70,
      },

      png: {
        quality: 80,
      },

      jpeg: {
        quality: 80,
      },
    }),

    viteSingleFile(),
    visualizer({
      open: true,
      gzipSize: true,
    }),
  ],
});
