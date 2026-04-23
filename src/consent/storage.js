/**
 * @typedef {Object} CookieConsent
 * @property {boolean} [necessary]
 * @property {boolean} [analytics]
 * @property {boolean} [marketing]
 * @property {boolean} [externalMedia]
 * @property {boolean} [mainCookieBannerComplete] Set only by main cookie bar (Zezwól / Odmawiam), not by YouTube-only flow.
 */

export const COOKIE_CONSENT_KEY = 'cookie_consent';

/** Dispatched on localStorage consent updates (banner or embed button). */
export const CONSENT_CHANGE_EVENT = 'grandschool:cookieconsent';

/**
 * @returns {CookieConsent | null}
 */
export function getStoredConsent() {
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

/**
 * @param {CookieConsent} consent
 */
export function persistConsent(consent) {
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  window.dispatchEvent(
    new CustomEvent(CONSENT_CHANGE_EVENT, { detail: { consent } }),
  );
}

/**
 * @param {CookieConsent | null} consent
 * @returns {boolean}
 */
export function isExternalMediaAllowed(consent) {
  if (!consent) return false;
  if (consent.externalMedia === true) return true;
  if (consent.externalMedia === false) return false;
  // Prior installs: "accept all" without `externalMedia` key — treat as opted in once for embeds.
  return consent.analytics === true && consent.marketing === true;
}

/**
 * Main site cookie bar: show until the user has used Zezwól or Odmawiam.
 * YouTube-only "Accept and watch" can save `externalMedia` without finishing this step.
 * Legacy: if both analytics and marketing are booleans, the user already went through the old bar.
 * @param {CookieConsent | null} consent
 * @returns {boolean}
 */
export function shouldShowMainCookieBanner(consent) {
  if (!consent) return true;
  if (consent.mainCookieBannerComplete === true) return false;
  if (typeof consent.analytics === 'boolean' && typeof consent.marketing === 'boolean') {
    return false;
  }
  return true;
}

/**
 * Merge into stored consent (e.g. only enable YouTube after granular choice).
 * @param {CookieConsent} partial
 * @returns {CookieConsent}
 */
export function mergeConsent(partial) {
  const prev = getStoredConsent() || { necessary: true };
  const next = { ...prev, ...partial };
  persistConsent(next);
  return next;
}
