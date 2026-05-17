function animateCounter(el, duration = 1000) {
  const target = +el.getAttribute('data-target');
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
const statsSection = document.getElementById('projectStats');

if (statsSection && counters.length > 0) {
  let started = false;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          counters.forEach((counter) => animateCounter(counter, 700));
          obs.disconnect();
        }
      });
    },
    { threshold: 0.5 },
  );

  observer.observe(statsSection);
}
