const course1 = document.querySelector('.course1');
const course2 = document.querySelector('.course2');
const course3 = document.querySelector('.course3');

if (course1) {
  course1.addEventListener('click', (e) => {
    const card = e.target.closest('.coursesList');
    card.classList.toggle('firstCardOpen');
  });
}

if (course2) {
  course2.addEventListener('click', (e) => {
    const card = e.target.closest('.coursesList');
    card.classList.toggle('secondCardOpen');
  });
}

if (course3) {
  course3.addEventListener('click', (e) => {
    const card = e.target.closest('.coursesList');
    card.classList.toggle('thirdCardOpen');
  });
}

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

const btn1 = document.querySelector('.btn1');
if (btn1) {
  btn1.addEventListener('click', (e) => {
    const card = e.target.closest('.firstCardOpen');
    if (card) {
      card.classList.remove('firstCardOpen');
      card.classList.add('coursesList');
    }
  });
}

const btn2 = document.querySelector('.btn2');
if (btn2) {
  btn2.addEventListener('click', (e) => {
    const card = e.target.closest('.secondCardOpen');
    if (card) {
      card.classList.remove('secondCardOpen');
      card.classList.add('coursesList');
    }
  });
}

const btn3 = document.querySelector('.btn3');
if (btn3) {
  btn3.addEventListener('click', (e) => {
    const card = e.target.closest('.thirdCardOpen');
    if (card) {
      card.classList.remove('thirdCardOpen');
      card.classList.add('coursesList');
    }
  });
}
