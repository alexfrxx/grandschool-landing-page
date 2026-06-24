'use strict';

const GA_MEASUREMENT_ID = 'G-3LGYJ3E54V';
const FB_PIXEL_ID = '1194470190934050';

/**
 * @typedef {import('./cookieConsentStorage.js').CookieConsent} CookieConsent
 */

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

/**
 * Load third-party scripts only after explicit consent.
 * @param {CookieConsent | null} consent
 */
export function applyConsentScripts(consent) {
  if (!consent?.consentGiven) return;
  if (consent.analytics) loadAnalytics();
  if (consent.marketing) loadMarketing();
}
