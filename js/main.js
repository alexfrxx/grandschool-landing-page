/* Cookies first: Splide/styles failure must not leave the banner uninitialized. */
import './cookiesBanner.js';
import '../scss/styles.scss';
import './youtubeConsent.js';
import './header.js';
import './courses.js';
import './counter.js';
import './animation.js';
import './form.js';

import '@splidejs/splide/css/core';

document.addEventListener('DOMContentLoaded', async () => {
  if (window.innerWidth < 1025) {
    const { default: initMobileSplide } = await import('./mobileSplide.js');

    initMobileSplide();
  }
});
