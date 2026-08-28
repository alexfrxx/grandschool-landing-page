'use strict';

import {
  buildConsent,
  getStoredConsent,
  persistConsent,
  shouldShowBanner,
} from './cookieConsentStorage.js';
import { applyConsentScripts } from './consentScripts.js';

/** @typedef {import('./cookieConsentStorage.js').CookieConsent} CookieConsent */

/** @type {Set<(state: ReturnType<typeof getState>) => void>} */
const listeners = new Set();

let settingsOpen = false;

function getState() {
  return {
    consent: getStoredConsent(),
    showBanner: shouldShowBanner(getStoredConsent()),
    settingsOpen,
  };
}

function notify() {
  const state = getState();
  listeners.forEach((listener) => listener(state));
}

/**
 * @param {(state: ReturnType<typeof getState>) => void} listener
 * @returns {() => void}
 */
export function subscribeCookieConsent(listener) {
  listeners.add(listener);
  listener(getState());
  return () => listeners.delete(listener);
}

/**
 * @param {CookieConsent} consent
 */
function commitConsent(consent) {
  const saved = persistConsent(consent);
  applyConsentScripts(saved);
  settingsOpen = false;
  notify();
  return saved;
}

export function acceptAllCookies() {
  return commitConsent(
    buildConsent({ analytics: true, marketing: true, externalMedia: true }),
  );
}

export function rejectOptionalCookies() {
  return commitConsent(
    buildConsent({ analytics: false, marketing: false, externalMedia: false }),
  );
}

/**
 * @param {{ analytics: boolean; marketing: boolean }} preferences
 */
export function saveCookiePreferences({ analytics, marketing }) {
  const prev = getStoredConsent();
  return commitConsent(
    buildConsent({
      analytics,
      marketing,
      externalMedia: prev?.externalMedia === true ? true : false,
    }),
  );
}

export function openCookieSettings() {
  settingsOpen = true;
  notify();
}

export function closeCookieSettings() {
  settingsOpen = false;
  notify();
}

export function initCookieConsent() {
  const consent = getStoredConsent();
  applyConsentScripts(consent);
  notify();
}
