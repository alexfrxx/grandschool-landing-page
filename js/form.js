'use strict';

(function () {
  const formWrap = document.querySelector(`.contact-form__wrap`);
  const formOverlay = document.querySelector(`.contact-overlay`);
  const startBtn = document.querySelectorAll(`.freeLessonBtn`);
  const formCloseBtn = formWrap.querySelector(`.close-btn`);

  function getFormPopup() {
    formWrap.classList.add(`opened-form`);
  }
  function removeFormPopup() {
    formWrap.classList.remove(`opened-form`);
  }

  startBtn.forEach((button) => {
    button.addEventListener(`click`, getFormPopup);
  });
  formCloseBtn.addEventListener(`click`, removeFormPopup);
  formOverlay.addEventListener(`click`, removeFormPopup);
  window.openForm = {
    getFormPopup,
    formWrap,
  };
})();
