document.querySelectorAll('.courseCard').forEach((card) => {
  const openBtn = card.querySelector('.view-details');
  const modal = card.querySelector('.course-modal');
  const closeBtn = card.querySelector('.close-btn');

  openBtn.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});
