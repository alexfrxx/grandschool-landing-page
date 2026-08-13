const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');

module.exports = (ctx) => ({
  plugins: [
    ...(ctx.env === 'production'
      ? [
          purgecss({
            content: ['./index.html', './terms/index.html', './js/**/*.js'],
            safelist: [
              'active',
              'open',
              'visible',
              'animated',
              'hidden',
              'ready',
              'opened-form',
              'headerFixed',
              'firstCardOpen',
              'secondCardOpen',
              'thirdCardOpen',
              /^is-/,
              /^has-/,
              /^js-/,
              /^modal-/,
              /^fade-/,
              /^splide/,
              /^youtube-consent/,
              /^cookie-/,
              'cookie-settings-open',
              'cookieFadeIn',
              'visually-hidden',
            ],
          }),
          cssnano({ preset: 'default' }),
        ]
      : []),
  ],
});
