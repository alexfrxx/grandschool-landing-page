document.querySelectorAll('.view-details').forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const card = e.target.closest('.course-card');
    card.classList.add('expanded');
  });
});

document.querySelectorAll('.close-details').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.course-card');
    card.classList.remove('expanded');
  });
});
