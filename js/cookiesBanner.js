'use strict';

import { mountCookieConsentBanner } from './consent/CookieConsentBanner.js';
import { bindCookieSettingsTrigger, mountCookieSettingsModal } from './consent/CookieSettingsModal.js';
import { initCookieConsent } from './consent/useCookieConsent.js';

function initCookieUi() {
  initCookieConsent();
  mountCookieConsentBanner();
  mountCookieSettingsModal();
  bindCookieSettingsTrigger('#cookieSettingsFooterBtn');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCookieUi, { once: true });
} else {
  initCookieUi();
}
