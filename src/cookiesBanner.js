'use strict';

import {
  getStoredConsent,
  persistConsent,
  shouldShowMainCookieBanner,
} from './consent/storage.js';

const GA_MEASUREMENT_ID = 'G-3LGYJ3E54V';
const FB_PIXEL_ID = '1194470190934050';

function applyConsent(consent) {
  if (!consent) return;
  if (consent.analytics) loadAnalytics();
  if (consent.marketing) loadMarketing();
}

function loadAnalytics() {
  if (window.__cookieConsentAnalyticsLoaded) return;
  window.__cookieConsentAnalyticsLoaded = true;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);
}

function loadMarketing() {
  if (window.__cookieConsentMarketingLoaded) return;
  window.__cookieConsentMarketingLoaded = true;

  (function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = 'https://connect.facebook.net/en_US/fbevents.js';
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script');

  window.fbq('init', FB_PIXEL_ID);
  window.fbq('track', 'PageView');
}

function saveChoice(consent) {
  persistConsent(consent);
}

function initCookieBanner() {
  const banner = document.querySelector('.cookiesWrapper');
  if (!banner) return;

  const consent = getStoredConsent();
  if (consent) {
    applyConsent(consent);
  }
  if (shouldShowMainCookieBanner(consent)) {
    banner.classList.remove('hidden');
  } else {
    banner.classList.add('hidden');
  }

  const acceptBtn = document.getElementById('acceptBtn');
  const declineBtn = document.getElementById('declineBtn');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      const next = {
        necessary: true,
        analytics: true,
        marketing: true,
        externalMedia: true,
        mainCookieBannerComplete: true,
      };
      saveChoice(next);
      banner.classList.add('hidden');
      applyConsent(next);
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      const next = {
        necessary: true,
        analytics: false,
        marketing: false,
        externalMedia: false,
        mainCookieBannerComplete: true,
      };
      saveChoice(next);
      banner.classList.add('hidden');
      applyConsent(next);
    });
  }

  const changeBtn = document.getElementById('change');
  if (changeBtn) {
    changeBtn.addEventListener('click', () => {
      banner.classList.remove('hidden');
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCookieBanner, { once: true });
} else {
  initCookieBanner();
}
