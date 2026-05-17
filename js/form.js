'use strict';

const formWrap = document.querySelector('.contact-form__wrap');
if (formWrap) {
  const formOverlay = document.querySelector('.contact-overlay');
  const startBtn = document.querySelectorAll('.freeLessonBtn');
  const formCloseBtn = formWrap.querySelector('.close-btn');

  window.addEventListener('load', () => {
    formWrap.classList.add('ready');
  });

  function getFormPopup() {
    formWrap.classList.add('opened-form');
  }
  function removeFormPopup() {
    formWrap.classList.remove('opened-form');
    document.activeElement.blur();
  }
  function onEscPress(evt) {
    if (evt.key === 'Escape') {
      removeFormPopup();
    }
  }

  startBtn.forEach((button) => {
    button.addEventListener('click', getFormPopup);
  });
  if (formCloseBtn) {
    formCloseBtn.addEventListener('click', removeFormPopup);
  }
  if (formOverlay) {
    formOverlay.addEventListener('click', removeFormPopup);
  }

  document.addEventListener('keydown', onEscPress);

  window.openForm = {
    getFormPopup,
    formWrap,
  };
}
