import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { htmlPostProcessPlugin } from './vite.plugins.js';

export default defineConfig({
  build: {
    // Keep fonts, backgrounds, and images as separate files (no base64 blobs in CSS).
    assetsInlineLimit: 0,
    modulePreload: false,
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: true,
  },
  plugins: [
    htmlPostProcessPlugin(),
    ViteImageOptimizer({
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
  ],
});
