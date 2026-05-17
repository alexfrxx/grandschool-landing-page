'use strict';

import {
  CONSENT_CHANGE_EVENT,
  getStoredConsent,
  isExternalMediaAllowed,
  mergeConsent,
} from './consent/storage.js';

const YT_NO_COOKIE_BASE = 'https://www.youtube-nocookie.com/embed';
const DEFAULT_WIDTH = 866;
const DEFAULT_HEIGHT = 485;

/**
 * @param {HTMLElement} root
 */
function readConfig(root) {
  return {
    videoId: root.dataset.videoId || '',
    title: root.dataset.title || 'YouTube video player',
    placeholderMessage:
      root.dataset.placeholderMessage ||
      'Aby obejrzeć ten film, zaakceptuj pliki cookies związane z osadzaniem YouTube.',
    acceptLabel: root.dataset.acceptLabel || 'Akceptuję i oglądam',
    thumbnailSrc: root.dataset.thumbnailSrc || '',
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  };
}

/**
 * @param {string} videoId
 */
function buildEmbedSrc(videoId) {
  const params = new URLSearchParams({ rel: '0' });
  return `${YT_NO_COOKIE_BASE}/${encodeURIComponent(videoId)}?${params}`;
}

/**
 * @param {number} width
 * @param {number} height
 */
function applyBoxStyle(el, width, height) {
  el.style.width = '100%';
  el.style.maxWidth = '100%';
  el.style.minWidth = '0';
  el.style.aspectRatio = `${width} / ${height}`;
}

/**
 * @param {HTMLElement} root
 * @param {ReturnType<typeof readConfig>} config
 */
function renderIframe(root, config) {
  root.replaceChildren();

  const wrapper = document.createElement('div');
  wrapper.className = 'youtube-consent-root';
  applyBoxStyle(wrapper, config.width, config.height);

  const iframe = document.createElement('iframe');
  iframe.loading = 'lazy';
  iframe.width = String(config.width);
  iframe.height = String(config.height);
  iframe.src = buildEmbedSrc(config.videoId);
  iframe.title = config.title;
  iframe.allow =
    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allowFullscreen = true;

  wrapper.appendChild(iframe);
  root.appendChild(wrapper);
}

/**
 * @param {HTMLElement} root
 * @param {ReturnType<typeof readConfig>} config
 */
function renderPlaceholder(root, config) {
  root.replaceChildren();

  const wrapper = document.createElement('div');
  wrapper.className = 'youtube-consent-root';
  applyBoxStyle(wrapper, config.width, config.height);

  const placeholder = document.createElement('div');
  placeholder.className = 'youtube-consent-placeholder';

  if (config.thumbnailSrc) {
    const img = document.createElement('img');
    img.className = 'youtube-consent-placeholder__thumb';
    img.src = config.thumbnailSrc;
    img.alt = '';
    img.decoding = 'async';
    placeholder.appendChild(img);
  } else {
    const block = document.createElement('div');
    block.className = 'youtube-consent-placeholder__block';
    block.setAttribute('aria-hidden', 'true');
    placeholder.appendChild(block);
  }

  const overlay = document.createElement('div');
  overlay.className = 'youtube-consent-placeholder__overlay';

  const message = document.createElement('p');
  message.className = 'youtube-consent-placeholder__message';
  message.textContent = config.placeholderMessage;

  const cta = document.createElement('button');
  cta.type = 'button';
  cta.className = 'youtube-consent-placeholder__cta';
  cta.textContent = config.acceptLabel;
  cta.addEventListener('click', () => {
    mergeConsent({ externalMedia: true });
    render(root);
  });

  overlay.append(message, cta);
  placeholder.appendChild(overlay);
  wrapper.appendChild(placeholder);
  root.appendChild(wrapper);
}

/**
 * @param {HTMLElement} root
 */
function render(root) {
  const config = readConfig(root);
  if (!config.videoId) return;

  if (isExternalMediaAllowed(getStoredConsent())) {
    renderIframe(root, config);
  } else {
    renderPlaceholder(root, config);
  }
}

/**
 * @param {HTMLElement} root
 */
function initYouTubeConsent(root) {
  render(root);
  window.addEventListener(CONSENT_CHANGE_EVENT, () => render(root));
  window.addEventListener('storage', () => render(root));
}

const mount = document.getElementById('youtube-video-root');
if (mount) {
  initYouTubeConsent(mount);
}
