import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { visualizer } from 'rollup-plugin-visualizer';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    ViteImageOptimizer({
      // SVG sprite: symbols must not be stripped (logoText, social icons, etc.)
      exclude: /sprite\.svg$/,
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
      filename: 'stats.html',
      open: false,
      gzipSize: true,
    }),
  ],
});
