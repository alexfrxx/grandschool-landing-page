document.querySelectorAll('.view-details').forEach((button) => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.coursesList');
    card.classList.toggle('FirstCardOpen');
  });
});
