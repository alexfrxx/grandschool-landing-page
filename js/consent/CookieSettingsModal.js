'use strict';

import { createFocusTrap } from './focusTrap.js';
import {
  acceptAllCookies,
  closeCookieSettings,
  openCookieSettings,
  rejectOptionalCookies,
  saveCookiePreferences,
  subscribeCookieConsent,
} from './useCookieConsent.js';

const MODAL_ID = 'cookieSettingsModal';

/**
 * @param {HTMLButtonElement} toggle
 * @param {boolean} checked
 */
function setToggleState(toggle, checked) {
  toggle.setAttribute('aria-checked', checked ? 'true' : 'false');
  toggle.classList.toggle('cookie-toggle--on', checked);
}

function createModalElement() {
  const modal = document.createElement('div');
  modal.id = MODAL_ID;
  modal.className = 'cookie-settings hidden';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'cookieSettingsTitle');
  modal.setAttribute('aria-hidden', 'true');

  modal.innerHTML = `
    <button
      type="button"
      class="cookie-settings__overlay"
      data-action="close-overlay"
      aria-label="Zamknij ustawienia cookies"
    ></button>
    <div class="cookie-settings__panel" role="document">
      <button
        type="button"
        class="cookie-settings__close"
        data-action="close"
        aria-label="Zamknij ustawienia cookies"
      >
        <svg width="19" height="19" aria-hidden="true">
          <use xlink:href="/img/sprite.svg#closeBtn"></use>
        </svg>
      </button>

      <h2 class="cookie-settings__title" id="cookieSettingsTitle">Ustawienia cookies</h2>
      <p class="cookie-settings__description">
        Możesz zdecydować, na które kategorie plików cookies wyrażasz zgodę. Niezbędne cookies są zawsze aktywne, ponieważ są potrzebne do prawidłowego działania strony.
      </p>

      <div class="cookie-settings__categories">
        <section class="cookie-settings__category" aria-labelledby="cookieCategoryNecessary">
          <div class="cookie-settings__category-header">
            <h3 class="cookie-settings__category-title" id="cookieCategoryNecessary">Niezbędne</h3>
            <span class="cookie-settings__badge" aria-hidden="true">Zawsze aktywne</span>
          </div>
          <p class="cookie-settings__category-text">
            Te pliki cookies są konieczne do działania strony, bezpieczeństwa oraz zapamiętania podstawowych ustawień.
          </p>
        </section>

        <section class="cookie-settings__category" aria-labelledby="cookieCategoryAnalytics">
          <div class="cookie-settings__category-header">
            <h3 class="cookie-settings__category-title" id="cookieCategoryAnalytics">Analityczne</h3>
            <button
              type="button"
              class="cookie-toggle"
              id="cookieToggleAnalytics"
              role="switch"
              aria-checked="false"
              aria-labelledby="cookieCategoryAnalytics"
            >
              <span class="cookie-toggle__track" aria-hidden="true">
                <span class="cookie-toggle__thumb"></span>
              </span>
              <span class="visually-hidden">Włącz cookies analityczne</span>
            </button>
          </div>
          <p class="cookie-settings__category-text">
            Pomagają nam zrozumieć, jak odwiedzający korzystają ze strony, abyśmy mogli ją ulepszać.
          </p>
        </section>

        <section class="cookie-settings__category" aria-labelledby="cookieCategoryMarketing">
          <div class="cookie-settings__category-header">
            <h3 class="cookie-settings__category-title" id="cookieCategoryMarketing">Marketingowe</h3>
            <button
              type="button"
              class="cookie-toggle"
              id="cookieToggleMarketing"
              role="switch"
              aria-checked="false"
              aria-labelledby="cookieCategoryMarketing"
            >
              <span class="cookie-toggle__track" aria-hidden="true">
                <span class="cookie-toggle__thumb"></span>
              </span>
              <span class="visually-hidden">Włącz cookies marketingowe</span>
            </button>
          </div>
          <p class="cookie-settings__category-text">
            Pomagają mierzyć skuteczność kampanii reklamowych i dopasowywać komunikację marketingową.
          </p>
        </section>
      </div>

      <div class="cookie-settings__actions">
        <button type="button" class="cookie-settings__btn cookie-settings__btn--primary" data-action="save">
          Zapisz ustawienia
        </button>
        <button type="button" class="cookie-settings__btn cookie-settings__btn--secondary" data-action="accept-all">
          Zaakceptuj wszystkie
        </button>
        <button type="button" class="cookie-settings__btn cookie-settings__btn--secondary" data-action="reject-optional">
          Odrzuć opcjonalne
        </button>
      </div>
    </div>
  `;

  return modal;
}

/**
 * @param {HTMLElement} modal
 */
function bindModalActions(modal) {
  const analyticsToggle = modal.querySelector('#cookieToggleAnalytics');
  const marketingToggle = modal.querySelector('#cookieToggleMarketing');

  if (!(analyticsToggle instanceof HTMLButtonElement)) return;
  if (!(marketingToggle instanceof HTMLButtonElement)) return;

  analyticsToggle.addEventListener('click', () => {
    const next = analyticsToggle.getAttribute('aria-checked') !== 'true';
    setToggleState(analyticsToggle, next);
  });

  marketingToggle.addEventListener('click', () => {
    const next = marketingToggle.getAttribute('aria-checked') !== 'true';
    setToggleState(marketingToggle, next);
  });

  modal.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const actionable = target.closest('[data-action]');
    if (!actionable) return;

    const action = actionable.dataset.action;
    if (action === 'close-overlay' || action === 'close') {
      closeCookieSettings();
      return;
    }

    if (!(actionable instanceof HTMLButtonElement)) return;

    if (action === 'accept-all') acceptAllCookies();
    else if (action === 'reject-optional') rejectOptionalCookies();
    else if (action === 'save') {
      saveCookiePreferences({
        analytics: analyticsToggle.getAttribute('aria-checked') === 'true',
        marketing: marketingToggle.getAttribute('aria-checked') === 'true',
      });
    }
  });
}

/**
 * @param {HTMLElement} modal
 * @param {HTMLButtonElement} analyticsToggle
 * @param {HTMLButtonElement} marketingToggle
 */
function syncModalState(modal, analyticsToggle, marketingToggle) {
  const panel = modal.querySelector('.cookie-settings__panel');
  if (!(panel instanceof HTMLElement)) return () => {};

  const trap = createFocusTrap(panel, {
    onEscape: closeCookieSettings,
  });

  return subscribeCookieConsent(({ consent, settingsOpen }) => {
    setToggleState(analyticsToggle, consent?.analytics === true);
    setToggleState(marketingToggle, consent?.marketing === true);

    modal.classList.toggle('hidden', !settingsOpen);
    modal.setAttribute('aria-hidden', settingsOpen ? 'false' : 'true');
    document.body.classList.toggle('cookie-settings-open', settingsOpen);

    if (settingsOpen) trap.activate();
    else trap.deactivate();
  });
}

/**
 * @param {string} [selector]
 */
export function bindCookieSettingsTrigger(selector = '#cookieSettingsFooterBtn') {
  const trigger = document.querySelector(selector);
  if (!trigger) return;

  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    openCookieSettings();
  });
}

export function mountCookieSettingsModal() {
  if (document.getElementById(MODAL_ID)) return () => {};

  const modal = createModalElement();
  document.body.appendChild(modal);

  const analyticsToggle = modal.querySelector('#cookieToggleAnalytics');
  const marketingToggle = modal.querySelector('#cookieToggleMarketing');
  if (!(analyticsToggle instanceof HTMLButtonElement)) return () => {};
  if (!(marketingToggle instanceof HTMLButtonElement)) return () => {};

  bindModalActions(modal);
  return syncModalState(modal, analyticsToggle, marketingToggle);
}
