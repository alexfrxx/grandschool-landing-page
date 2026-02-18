document.querySelector('.course1').addEventListener('click', (e) => {
  const card = e.target.closest('.coursesList');
  card.classList.toggle('firstCardOpen');
});

document.querySelector('.course2').addEventListener('click', (e) => {
  const card = e.target.closest('.coursesList');
  card.classList.toggle('secondCardOpen');
});

document.querySelector('.course3').addEventListener('click', (e) => {
  const card = e.target.closest('.coursesList');
  card.classList.toggle('thirdCardOpen');
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

document.querySelector('.btn1').addEventListener('click', (e) => {
  const card = e.target.closest('.firstCardOpen');
  if (card) {
    card.classList.remove('firstCardOpen');
    card.classList.add('coursesList');
  }
});

document.querySelector('.btn2').addEventListener('click', (e) => {
  const card = e.target.closest('.secondCardOpen');
  if (card) {
    card.classList.remove('secondCardOpen');
    card.classList.add('coursesList');
  }
});

document.querySelector('.btn3').addEventListener('click', (e) => {
  const card = e.target.closest('.thirdCardOpen');
  if (card) {
    card.classList.remove('thirdCardOpen');
    card.classList.add('coursesList');
  }
});
