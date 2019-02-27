const leftBtn = document.querySelector('#arrow-left');
const rightBtn = document.querySelector('#arrow-right');
const items = document.querySelector('.slider__list');

const step = items.firstElementChild.getBoundingClientRect().width;
const slidesInView = 1;
let currentRight = 0;
const maxRight = (items.children.length - slidesInView) * step;
const minRight = 0;

rightBtn.addEventListener('click', e => {
  e.preventDefault();
  if(currentRight < maxRight) {
    currentRight += step;
    items.style.right = `${currentRight}px`;
  } else {
    currentRight = 0;
    items.style.right = 0;
  }
})

leftBtn.addEventListener('click', e => {
  e.preventDefault();
  if(currentRight > minRight) {
    currentRight -= step;
    items.style.right = `${currentRight}px`;
  } else {
    currentRight = maxRight;
    items.style.right = maxRight + 'px';
  }
})
