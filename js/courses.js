document.querySelectorAll('.course1').forEach((button) => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.coursesList');
    card.classList.toggle('FirstCardOpen');
  });
});

document.querySelectorAll('.course2').forEach((button) => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.coursesList');
    card.classList.toggle('SecondCardOpen');
  });
});

document.querySelectorAll('.course3').forEach((button) => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.coursesList');
    card.classList.toggle('ThirdCardOpen');
  });
});

document.querySelectorAll('.closeBtn').forEach((button) => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.FirstCardOpen, .SecondCardOpen, .ThirdCardOpen');
    if (card) {
      card.classList.remove('FirstCardOpen', 'SecondCardOpen', 'ThirdCardOpen');
      card.classList.add('coursesList');
    }
  });
});
