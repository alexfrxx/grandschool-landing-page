import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { htmlPostProcessPlugin } from './vite.plugins.js';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    modulePreload: false,
    rollupOptions: {
      input: path.resolve(rootDir, 'terms/index.html'),
    },
  },
  plugins: [htmlPostProcessPlugin()],
});
