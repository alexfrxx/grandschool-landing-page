'use strict';

document.addEventListener('DOMContentLoaded', () => {
  (function () {
    const heroBlock = document.querySelector('.hero'),
      coursesBlock = document.querySelector('.courses'),
      testimonialsBlock = document.querySelector('.testimonials'),
      videoBlock = document.querySelector('.video'),
      supportBlock = document.querySelector('.projectSupport'),
      skillsBlock = document.querySelector('.skills'),
      feelingsBlock = document.querySelector('.feelings'),
      statsBlock = document.querySelector('.projectStats');

    const allBlocksForAnimation = [
      heroBlock,
      coursesBlock,
      testimonialsBlock,
      videoBlock,
      supportBlock,
      skillsBlock,
      feelingsBlock,
      statsBlock,
    ];

    let options = {
      threshold: 0.3,
    };

    if (document.documentElement.clientWidth < 768) {
      let options = {
        threshold: 0.1,
      };
    }

    function aboutUsAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add('animated');
        }
      });
    }

    const observer = new IntersectionObserver(aboutUsAnimation, options);

    allBlocksForAnimation.forEach((block) => observer.observe(block));
  })();
});
