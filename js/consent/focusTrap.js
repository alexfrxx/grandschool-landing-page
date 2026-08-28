'use strict';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * @param {HTMLElement} container
 * @param {{ onEscape?: () => void }} [options]
 */
export function createFocusTrap(container, options = {}) {
  /** @type {HTMLElement | null} */
  let previousFocus = null;

  function getFocusableElements() {
    return [...container.querySelectorAll(FOCUSABLE)].filter(
      (el) => el instanceof HTMLElement && !el.hasAttribute('disabled'),
    );
  }

  /** @param {KeyboardEvent} event */
  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      options.onEscape?.();
      return;
    }

    if (event.key !== 'Tab') return;

    const elements = getFocusableElements();
    if (!elements.length) {
      event.preventDefault();
      return;
    }

    const first = elements[0];
    const last = elements[elements.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return {
    activate() {
      previousFocus =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      container.addEventListener('keydown', handleKeyDown);
      const [first] = getFocusableElements();
      first?.focus();
    },
    deactivate() {
      container.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus();
      previousFocus = null;
    },
  };
}
