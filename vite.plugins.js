import fs from 'node:fs';
import path from 'node:path';
import { minify as minifyHtml } from 'html-minifier-terser';

const HTML_MINIFY_OPTIONS = {
  collapseWhitespace: true,
  conservativeCollapse: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeEmptyAttributes: true,
  minifyCSS: true,
  minifyJS: true,
};

/**
 * Lighthouse cannot audit crossorigin stylesheets (shows "Error!").
 * Preload + non-blocking attrs; move entry script to end of body; minify HTML.
 */
export function htmlPostProcessPlugin() {
  return {
    name: 'html-postprocess',
    transformIndexHtml(html) {
      let out = html;

      const scriptMatch = out.match(
        /<script type="module" crossorigin src="(\/assets\/[^"]+\.js)"><\/script>/,
      );

      out = out.replace(
        /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/,
        '<link rel="preload" href="$1" as="style" />\n    <link rel="stylesheet" href="$1" />',
      );

      if (scriptMatch) {
        out = out.replace(
          /<script type="module" crossorigin src="\/assets\/[^"]+\.js"><\/script>\s*/,
          '',
        );
        out = out.replace(
          '</body>',
          `    <script type="module" src="${scriptMatch[1]}"></script>\n  </body>`,
        );
      }

      return out;
    },
    async closeBundle() {
      const distDir = path.resolve('dist');
      const htmlFiles = ['index.html', 'terms/index.html'];

      for (const relPath of htmlFiles) {
        const indexPath = path.join(distDir, relPath);
        if (!fs.existsSync(indexPath)) continue;

        let indexHtml = fs.readFileSync(indexPath, 'utf8');

        if (relPath === 'index.html') {
          const cssMatch = indexHtml.match(/href="(\/assets\/[^"]+\.css)"/);
          if (cssMatch) {
            const cssPath = path.join(distDir, cssMatch[1].replace(/^\//, ''));
            if (fs.existsSync(cssPath)) {
              const css = fs.readFileSync(cssPath, 'utf8');
              const heroBlock = css.match(/\.hero\{[^}]+\}/)?.[0];
              const heroBgMatch =
                heroBlock?.match(/url\((\/assets\/background-[A-Za-z0-9_-]+\.webp)\)\s*1x/) ??
                heroBlock?.match(/url\((\/assets\/background[A-Za-z0-9_-]*\.webp)\)/);
              if (heroBgMatch && !indexHtml.includes(heroBgMatch[1])) {
                const preload = `    <link rel="preload" href="${heroBgMatch[1]}" as="image" type="image/webp" fetchpriority="high" />\n`;
                indexHtml = indexHtml.replace('<title>', `${preload}    <title>`);
              }
            }
          }
        }

        const minified = await minifyHtml(indexHtml, HTML_MINIFY_OPTIONS);
        fs.writeFileSync(indexPath, minified);
      }
    },
  };
}
