document.querySelectorAll('.course1').forEach((button) => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.coursesList');
    card.classList.toggle('firstCardOpen');
  });
});

document.querySelectorAll('.course2').forEach((button) => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.coursesList');
    card.classList.toggle('secondCardOpen');
  });
});

document.querySelectorAll('.course3').forEach((button) => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.coursesList');
    card.classList.toggle('thirdCardOpen');
  });
});

document.querySelectorAll('.closeBtn').forEach((button) => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.firstCardOpen, .secondCardOpen, .thirdCardOpen');
    if (card) {
      card.classList.remove('firstCardOpen', 'secondCardOpen', 'thirdCardOpen');
      card.classList.add('coursesList');
    }
  });
});

document.querySelectorAll('.overlay').forEach((button) => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.firstCardOpen, .secondCardOpen, .thirdCardOpen');
    if (card) {
      card.classList.remove('firstCardOpen', 'secondCardOpen', 'thirdCardOpen');
      card.classList.add('coursesList');
    }
  });
});

document.querySelectorAll('.close-details').forEach((button) => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.firstCardOpen, .secondCardOpen, .thirdCardOpen');
    if (card) {
      card.classList.remove('firstCardOpen', 'secondCardOpen', 'thirdCardOpen');
      card.classList.add('coursesList');
    }
  });
});
