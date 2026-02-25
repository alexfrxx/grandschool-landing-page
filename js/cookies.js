'use strict';

const COOKIE_CONSENT_KEY = 'cookie_consent';
const banner = document.querySelector('.cookiesWrapper');

const consent = getStoredConsent();

if (consent) {
  applyConsent(consent);
} else {
  banner.classList.remove('hidden');
}

document.getElementById('acceptBtn').addEventListener('click', () => {
  if (getStoredConsent()) return;

  saveConsent({
    necessary: true,
    analytics: true,
    marketing: true,
  });
});

document.getElementById('declineBtn').addEventListener('click', () => {
  if (getStoredConsent()) return;

  saveConsent({
    necessary: true,
    analytics: false,
    marketing: false,
  });
});

document.getElementById('change').addEventListener('click', () => {
  localStorage.removeItem(COOKIE_CONSENT_KEY);
  banner.classList.remove('hidden');
});

function getStoredConsent() {
  const value = localStorage.getItem(COOKIE_CONSENT_KEY);
  return value ? JSON.parse(value) : null;
}

function saveConsent(consent) {
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  banner.classList.add('hidden');
  applyConsent(consent);
}

function applyConsent(consent) {
  if (consent.analytics) {
    loadAnalytics();
  }

  if (consent.marketing) {
    loadMarketing();
  }
}

function loadAnalytics() {
  if (window.analyticsLoaded) return;
  window.analyticsLoaded = true;

  const script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX';
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
}

function loadMarketing() {
  console.log('Marketing enabled');
}
