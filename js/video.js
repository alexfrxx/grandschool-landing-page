'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const videoBtn = document.querySelector('.start-video-btn');

  videoBtn.addEventListener('click', function () {
    this.parentElement.innerHTML = `
    <iframe
          loading="lazy"
          width="866"
          height="485"
          src="https://www.youtube-nocookie.com/embed/S_zMbLa_nAE?rel=0"
          title="YouTube video player"
          allow="
            accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture;
            web-share;
          "
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        `;
  });
});
