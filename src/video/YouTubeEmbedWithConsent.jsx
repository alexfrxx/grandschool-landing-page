import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CONSENT_CHANGE_EVENT,
  getStoredConsent,
  isExternalMediaAllowed,
  mergeConsent,
} from '../consent/storage.js';

const YT_NO_COOKIE_BASE = 'https://www.youtube-nocookie.com/embed';

/**
 * GDPR-friendly YouTube embed: no iframe and no YouTube requests until `externalMedia` consent.
 * Extend the same consent pattern for Vimeo etc. by branching on `provider` (reserved).
 *
 * @param {{
 *   videoId: string;
 *   thumbnailSrc?: string;
 *   title?: string;
 *   className?: string;
 *   placeholderMessage?: string;
 *   acceptLabel?: string;
 *   width?: number;
 *   height?: number;
 *   provider?: 'youtube';
 * }} props
 */
export function YouTubeEmbedWithConsent({
  videoId,
  thumbnailSrc,
  title = 'YouTube video player',
  className = '',
  placeholderMessage = 'To watch this video, please accept YouTube cookies',
  acceptLabel = 'Accept and watch',
  width = 866,
  height = 485,
  provider = 'youtube',
}) {
  const [allowed, setAllowed] = useState(() => isExternalMediaAllowed(getStoredConsent()));

  const syncFromStorageOrEvent = useCallback(
    (/** @type {Event} */ e) => {
      // CustomEvent from persistConsent/mergeConsent carries the new consent; use it so the iframe
      // updates in the same tick. StorageEvent (other tab) has no useful detail; read from localStorage.
      const c =
        e && 'detail' in e && e.detail && typeof e.detail === 'object' && 'consent' in e.detail
          ? e.detail.consent
          : getStoredConsent();
      setAllowed(isExternalMediaAllowed(c));
    },
    [],
  );

  useEffect(() => {
    window.addEventListener(CONSENT_CHANGE_EVENT, syncFromStorageOrEvent);
    window.addEventListener('storage', syncFromStorageOrEvent);
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, syncFromStorageOrEvent);
      window.removeEventListener('storage', syncFromStorageOrEvent);
    };
  }, [syncFromStorageOrEvent]);

  const embedSrc = useMemo(() => {
    if (provider !== 'youtube') return '';
    const params = new URLSearchParams({ rel: '0' });
    return `${YT_NO_COOKIE_BASE}/${encodeURIComponent(videoId)}?${params}`;
  }, [videoId, provider]);

  const onAcceptWatch = () => {
    mergeConsent({ externalMedia: true });
    setAllowed(true);
  };

  const rootClass = ['youtube-consent-root', className].filter(Boolean).join(' ');

  const boxStyle = {
    width: '100%',
    maxWidth: '100%',
    minWidth: 0,
    aspectRatio: `${width} / ${height}`,
  };

  if (allowed) {
    return (
      <div className={rootClass} style={boxStyle}>
        <iframe
          loading="lazy"
          width={width}
          height={height}
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={rootClass} style={boxStyle}>
      <div className="youtube-consent-placeholder">
        {thumbnailSrc ? (
          <img
            className="youtube-consent-placeholder__thumb"
            src={thumbnailSrc}
            alt=""
            decoding="async"
          />
        ) : (
          <div className="youtube-consent-placeholder__block" aria-hidden />
        )}
        <div className="youtube-consent-placeholder__overlay">
          <p className="youtube-consent-placeholder__message">{placeholderMessage}</p>
          <button type="button" className="youtube-consent-placeholder__cta" onClick={onAcceptWatch}>
            {acceptLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
