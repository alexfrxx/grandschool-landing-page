function animateCounter(el, duration = 1000) {
  const target = +el.getAttribute('data-target');
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = Math.floor(progress * target);
    el.textContent = currentValue;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

const counters = document.querySelectorAll('.counter');
let started = false;

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !started) {
        started = true;
        counters.forEach((counter) => animateCounter(counter, 700));
        observer.disconnect();
      }
    });
  },
  { threshold: 0.5 },
);

const statsSection = document.getElementById('projectStats');
observer.observe(statsSection);
