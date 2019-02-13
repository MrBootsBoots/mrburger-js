const leftBtn = document.querySelector('#arrow-left');
const rightBtn = document.querySelector('#arrow-right');
const items = document.querySelector('.slider__list');

const step = 58;
let currentRight = 0;
const maxRight = 232;
const minRight = 0;

rightBtn.addEventListener('click', e => {
  e.preventDefault();
  if(currentRight < maxRight) {
    currentRight += step;
    items.style.right = `${currentRight}rem`;
  }
})

leftBtn.addEventListener('click', e => {
  e.preventDefault();
  if(currentRight > minRight) {
    currentRight -= step;
    items.style.right = `${currentRight}rem`;
  }
})
