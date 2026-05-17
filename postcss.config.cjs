const purgecss = require('@fullhuman/postcss-purgecss');

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
            ],
          }),
        ]
      : []),
  ],
});
