const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = (ctx) => ({
  plugins: [
    ...(ctx.env === 'production'
      ? [
          purgecss({
            content: ['./index.html', './js/**/*.js'],
            safelist: ['active', 'open', 'visible', /^is-/, /^has-/, /^js-/, /^modal-/, /^fade-/],
          }),
        ]
      : []),
  ],
});
