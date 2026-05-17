import fs from 'node:fs';
import path from 'node:path';

/**
 * Lighthouse cannot audit crossorigin stylesheets (shows "Error!").
 * Preload + non-blocking attrs; move entry script to end of body.
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
    closeBundle() {
      const distDir = path.resolve('dist');
      const indexPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexPath)) return;

      const indexHtml = fs.readFileSync(indexPath, 'utf8');
      const cssMatch = indexHtml.match(/href="(\/assets\/style-[^"]+\.css)"/);
      if (!cssMatch) return;

      const cssPath = path.join(distDir, cssMatch[1].replace(/^\//, ''));
      if (!fs.existsSync(cssPath)) return;

      const css = fs.readFileSync(cssPath, 'utf8');
      const heroBlock = css.match(/\.hero\{[^}]+\}/)?.[0];
      if (!heroBlock) return;

      const heroBgMatch =
        heroBlock.match(/url\((\/assets\/background-[A-Za-z0-9_-]+\.webp)\)\s*1x/) ??
        heroBlock.match(/url\((\/assets\/background[A-Za-z0-9_-]*\.webp)\)/);
      if (!heroBgMatch) return;

      const preload = `    <link rel="preload" href="${heroBgMatch[1]}" as="image" type="image/webp" fetchpriority="high" />\n`;
      if (indexHtml.includes(heroBgMatch[1])) return;

      const updated = indexHtml.replace('<title>', `${preload}    <title>`);
      fs.writeFileSync(indexPath, updated);
    },
  };
}
