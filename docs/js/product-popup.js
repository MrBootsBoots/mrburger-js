const btn = document.querySelector('.popup__container');
const popup = document.querySelector('.popup');
const content = document.querySelector('.popup__content');

btn.addEventListener('click', e => {
  popup.classList.add('opened');
})

content.addEventListener('click', e => {
  popup.classList.remove('opened');
})
