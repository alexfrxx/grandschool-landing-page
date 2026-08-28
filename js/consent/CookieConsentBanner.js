'use strict';

import {
  acceptAllCookies,
  openCookieSettings,
  rejectOptionalCookies,
  subscribeCookieConsent,
} from './useCookieConsent.js';

const BANNER_ID = 'cookieConsentBanner';

function createBannerElement() {
  const banner = document.createElement('aside');
  banner.id = BANNER_ID;
  banner.className = 'cookie-banner hidden cookieFadeIn';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-labelledby', 'cookieBannerTitle');
  banner.setAttribute('aria-live', 'polite');

  banner.innerHTML = `
    <div class="cookie-banner__inner">
      <div class="cookie-banner__header">
        <svg class="cookie-banner__icon" width="24" height="24" aria-hidden="true">
          <use xlink:href="/img/sprite.svg#cookies"></use>
        </svg>
        <h2 class="cookie-banner__title" id="cookieBannerTitle">Używamy plików cookies</h2>
      </div>
      <p class="cookie-banner__description">
        Używamy niezbędnych plików cookies, aby strona działała prawidłowo. Za Twoją zgodą możemy także używać cookies analitycznych i marketingowych, które pomagają nam ulepszać stronę oraz lepiej dopasować komunikację.
      </p>
      <div class="cookie-banner__actions">
        <button type="button" class="cookie-banner__btn cookie-banner__btn--primary" data-action="accept-all">
          Zaakceptuj wszystkie
        </button>
        <button type="button" class="cookie-banner__btn cookie-banner__btn--secondary" data-action="reject-optional">
          Odrzuć opcjonalne
        </button>
        <button type="button" class="cookie-banner__btn cookie-banner__btn--secondary" data-action="customize">
          Dostosuj
        </button>
      </div>
    </div>
  `;

  return banner;
}

/**
 * @param {HTMLElement} banner
 */
function bindBannerActions(banner) {
  banner.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const button = target.closest('[data-action]');
    if (!(button instanceof HTMLButtonElement)) return;

    const action = button.dataset.action;
    if (action === 'accept-all') acceptAllCookies();
    else if (action === 'reject-optional') rejectOptionalCookies();
    else if (action === 'customize') openCookieSettings();
  });
}

/**
 * @param {HTMLElement} banner
 */
function syncBannerVisibility(banner) {
  return subscribeCookieConsent(({ showBanner, settingsOpen }) => {
    const visible = showBanner && !settingsOpen;
    banner.classList.toggle('hidden', !visible);
    banner.setAttribute('aria-hidden', visible ? 'false' : 'true');
  });
}

export function mountCookieConsentBanner() {
  if (document.getElementById(BANNER_ID)) return () => {};

  const banner = createBannerElement();
  document.body.prepend(banner);
  bindBannerActions(banner);
  return syncBannerVisibility(banner);
}
