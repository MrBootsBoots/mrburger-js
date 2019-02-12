const hamburgerIcon = document.querySelector('.hamburger-menu-link');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const hamburgerMenuItem = document.querySelectorAll('#nav__item');
const hamburgerCloseBtn = document.querySelector('#close-hamburger');
const hamburgerLogo = document.querySelector('#logo__link');

// hamburger-icon onclick
hamburgerIcon.addEventListener('click', e => {
  e.preventDefault();
  hamburgerMenu.style.display = 'flex';
  hamburgerIcon.style.display = 'none';
  document.body.style.overflow = 'hidden';
});

//close-icon onclick
hamburgerCloseBtn.addEventListener('click', e => {
  e.preventDefault();
  hamburgerMenu.style.display = '';
  hamburgerIcon.style.display = '';
  document.body.style.overflow = '';
});

//logo onclick close
hamburgerLogo.addEventListener('click', e => {
  e.preventDefault();
  hamburgerMenu.style.display = '';
  hamburgerIcon.style.display = '';
  document.body.style.overflow = '';
});

//nav__item click -> go to #link
for (let i = 0; i < hamburgerMenuItem.length; i++) {
  hamburgerMenuItem[i].addEventListener('click', e => {
    hamburgerMenu.style.display = '';
    hamburgerIcon.style.display = '';
    document.body.style.overflow = '';
  })
}
