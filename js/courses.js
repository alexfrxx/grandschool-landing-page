document.querySelectorAll('.view-details').forEach((button) => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.courseCard');
    card.classList.toggle('open');
  });
});
