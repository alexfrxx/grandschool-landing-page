import Splide from '@splidejs/splide';

import '@splidejs/splide/css/core';
import '../scss/styles.scss';

const MOBILE_BREAKPOINT = 1024;
let splideInstances = new Map();
function mountSplideFor(el) {
  if (splideInstances.has(el)) return;
  const PEEK = 56;
  const slider = new Splide(el, {
    type: 'loop',
    autoplay: false,
    pauseOnHover: true,
    arrows: false,
    pagination: true,
    keyboard: 'global',
    drag: true,
    speed: 600,
    fixedWidth: `calc(100% - ${PEEK}px)`,
    gap: '16px',
    focus: 'left',
    trimSpace: false,
    waitForTransition: true,
    perMove: 1,
    flickMaxPages: 1,
    flickPower: 280,
    flickThreshold: 0.6,
    dragMinThreshold: { mouse: 8, touch: 18 },
  });
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    slider.options = { ...slider.options, autoplay: false, speed: 0 };
  }
  slider.mount();
  splideInstances.set(el, slider);
}
function destroySplideFor(el) {
  const inst = splideInstances.get(el);
  if (inst) {
    inst.destroy(true); // true = чисто удалить стили/DOM-обёртки
    splideInstances.delete(el);
  }
}
function applyMobileOnlySliders() {
  const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
  const nodes = document.querySelectorAll('.splide[data-mobile-only]');

  nodes.forEach((el) => {
    if (isMobile) {
      mountSplideFor(el);
    } else {
      destroySplideFor(el);
    }
  });
}
function debounce(fn, wait = 150) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(null, args), wait);
  };
}
document.addEventListener('DOMContentLoaded', () => {
  applyMobileOnlySliders();
  window.addEventListener('resize', debounce(applyMobileOnlySliders, 150));
});
