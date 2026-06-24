/**
 * @typedef {Object} CookieConsent
 * @property {boolean} necessary
 * @property {boolean} analytics
 * @property {boolean} marketing
 * @property {boolean} [externalMedia] YouTube embeds (granular opt-in via video CTA).
 * @property {boolean} consentGiven
 * @property {string | null} updatedAt ISO timestamp.
 */

export const COOKIE_CONSENT_KEY = 'cookie_consent';

/** Dispatched on localStorage consent updates (banner, modal, or embed button). */
export const CONSENT_CHANGE_EVENT = 'grandschool:cookieconsent';

/**
 * @param {Record<string, unknown>} raw
 * @returns {CookieConsent}
 */
export function normalizeConsent(raw) {
  const legacyComplete =
    raw.mainCookieBannerComplete === true ||
    (typeof raw.analytics === 'boolean' && typeof raw.marketing === 'boolean');

  const consentGiven = raw.consentGiven === true || legacyComplete;

  return {
    necessary: true,
    analytics: raw.analytics === true,
    marketing: raw.marketing === true,
    externalMedia: raw.externalMedia === true,
    consentGiven,
    updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : null,
  };
}

/**
 * @returns {CookieConsent | null}
 */
export function getStoredConsent() {
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!value) return null;
    return normalizeConsent(JSON.parse(value));
  } catch {
    return null;
  }
}

/**
 * @param {CookieConsent} consent
 */
export function persistConsent(consent) {
  const payload = {
    ...consent,
    necessary: true,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(payload));
  window.dispatchEvent(
    new CustomEvent(CONSENT_CHANGE_EVENT, { detail: { consent: payload } }),
  );
  return payload;
}

/**
 * @param {CookieConsent | null} consent
 * @returns {boolean}
 */
export function shouldShowBanner(consent) {
  return !consent?.consentGiven;
}

/**
 * @param {CookieConsent | null} consent
 * @returns {boolean}
 */
export function isExternalMediaAllowed(consent) {
  if (!consent) return false;
  if (consent.externalMedia === true) return true;
  if (consent.externalMedia === false) return false;
  return consent.analytics === true && consent.marketing === true;
}

/**
 * @param {{ analytics: boolean; marketing: boolean; externalMedia?: boolean }} options
 * @returns {CookieConsent}
 */
export function buildConsent({ analytics, marketing, externalMedia }) {
  return {
    necessary: true,
    analytics,
    marketing,
    externalMedia:
      externalMedia !== undefined ? externalMedia : analytics && marketing,
    consentGiven: true,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Merge into stored consent (e.g. only enable YouTube after granular choice).
 * @param {Partial<CookieConsent>} partial
 * @returns {CookieConsent}
 */
export function mergeConsent(partial) {
  const prev = getStoredConsent();
  const next = normalizeConsent({ ...(prev || { necessary: true }), ...partial });
  return persistConsent(next);
}
