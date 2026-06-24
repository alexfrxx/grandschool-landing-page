export {
  COOKIE_CONSENT_KEY,
  CONSENT_CHANGE_EVENT,
  buildConsent,
  getStoredConsent,
  isExternalMediaAllowed,
  mergeConsent,
  normalizeConsent,
  persistConsent,
  shouldShowBanner,
} from './cookieConsentStorage.js';

import { shouldShowBanner } from './cookieConsentStorage.js';

/** @deprecated Use shouldShowBanner */
export function shouldShowMainCookieBanner(consent) {
  return shouldShowBanner(consent);
}
