'use strict';

document.addEventListener('DOMContentLoaded', () => {
  (function () {
    const courseTitle = document.querySelector('.courseTitle'),
      courseSubtitle = document.querySelector('.courseSubtitle'),
      coursesList = document.querySelector('.coursesList'),
      fullCourseList = document.querySelector('.fullCourseList'),
      testimonialsBlock = document.querySelector('.testimonials'),
      videoBlock = document.querySelector('.video'),
      supportBlock = document.querySelector('.projectSupport'),
      skillsBlock = document.querySelector('.skills'),
      feelingsBlock = document.querySelector('.feelings'),
      statsBlock = document.querySelector('.projectStats');

    const allBlocksForAnimation = [
      coursesList,
      courseSubtitle,
      courseTitle,
      fullCourseList,
      testimonialsBlock,
      videoBlock,
      supportBlock,
      skillsBlock,
      feelingsBlock,
      statsBlock,
    ];

    let options = {
      threshold: 0.45,
    };

    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;

    if (width < 768) {
      options.threshold = 0.15;
    } else if (width < 1024) {
      options.threshold = 0.3;
    } else if (width <= 1024 && height < 601) {
      options.threshold = 0.1;
    } else if (width <= 1280 && height < 801) {
      options.threshold = 0.1;
    }

    function aboutUsAnimation(entries) {
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
