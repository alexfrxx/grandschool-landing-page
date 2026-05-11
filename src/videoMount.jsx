import { createElement, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { YouTubeEmbedWithConsent } from './video/YouTubeEmbedWithConsent.jsx';

const mount = document.getElementById('youtube-video-root');
if (mount) {
  const videoId = mount.dataset.videoId || '';
  const title = mount.dataset.title || 'YouTube video player';
  const placeholderMessage =
    mount.dataset.placeholderMessage ||
    'Aby obejrzeć ten film, zaakceptuj pliki cookies związane z osadzaniem YouTube.';
  const acceptLabel = mount.dataset.acceptLabel || 'Akceptuję i oglądam';
  const thumbnailSrc = mount.dataset.thumbnailSrc || undefined;

  createRoot(mount).render(
    createElement(
      StrictMode,
      null,
      createElement(YouTubeEmbedWithConsent, {
        videoId,
        title,
        placeholderMessage,
        acceptLabel,
        thumbnailSrc,
      }),
    ),
  );
}
