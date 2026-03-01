'use strict';

const COOKIE_CONSENT_KEY = 'cookie_consent';
const GA_MEASUREMENT_ID = 'G-3LGYJ3E54V';
const FB_PIXEL_ID = '1194470190934050';

const banner = document.querySelector('.cookiesWrapper');

function getStoredConsent() {
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function saveConsent(consent) {
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  if (banner) banner.classList.add('hidden');
  applyConsent(consent);
}

function applyConsent(consent) {
  if (!consent) return;
  if (consent.analytics) loadAnalytics();
  if (consent.marketing) loadMarketing();
}

function loadAnalytics() {
  if (window.__cookieConsentAnalyticsLoaded) return;
  window.__cookieConsentAnalyticsLoaded = true;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
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

// Apply stored consent or show banner
const consent = getStoredConsent();
if (consent) {
  applyConsent(consent);
} else if (banner) {
  banner.classList.remove('hidden');
}

// Bind buttons only when banner exists (landing page)
if (banner) {
  document.getElementById('acceptBtn').addEventListener('click', () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  });

  document.getElementById('declineBtn').addEventListener('click', () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  });

  const changeBtn = document.getElementById('change');
  if (changeBtn) {
    changeBtn.addEventListener('click', () => {
      banner.classList.remove('hidden');
    });
  }
}
