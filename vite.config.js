import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
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
