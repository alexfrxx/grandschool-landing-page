const header = document.querySelector('header'),
  headerWrapper = document.querySelector('.headerWrapper');
sectionTrigger = document.querySelector('.courses');

const headerObserver = new IntersectionObserver(
  ([entry]) => {
    if (!entry.isIntersecting) {
      //   header.style.backgroundColor = 'white';
      //   header.style.position = 'fixed';
      //   header.style.transition = 'all 1s ease';
      //   header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
      headerWrapper.style.padding = '19px 25px';
      header.classList.add('headerFixed');
    } else {
      //   header.style.backgroundColor = '';
      //   header.style.position = '';
      //   header.style.boxShadow = '';
      //   headerWrapper.style.padding = '';
      header.classList.remove('headerFixed');
    }
  },
  {
    root: null,
    threshold: 0,
  },
);

headerObserver.observe(sectionTrigger);
