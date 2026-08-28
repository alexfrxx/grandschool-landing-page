const header = document.querySelector('header');
const sectionTrigger = document.querySelector('.courses');

if (header && sectionTrigger) {
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
}
