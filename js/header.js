const header = document.querySelector('header'),
  sectionTrigger = document.querySelector(' .courses');

const headerObserver = new IntersectionObserver(
  ([entry]) => {
    if (entry.boundingClientRect.top < 0) {
      header.classList.add('headerFixed');
    } else {
      header.classList.remove('headerFixed');
    }
  },
  {
    root: null,
    threshold: 0,
  },
);

headerObserver.observe(sectionTrigger);
