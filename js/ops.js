const sections = $('.section');
const display = $('.maincontent');
let inscroll = false;

const md = new MobileDetect(window.navigator.userAgent);

const isMobile = md.mobile();

const switchActiveClassFixedMenu = menuItemIndex => {
  $('.fixed-menu__item')
    .eq(menuItemIndex)
    .addClass('active')
    .siblings()
    .removeClass('active')
};

const makeTransition = sectionEq => {
  if (inscroll) return;

  inscroll = true;

  const position = sectionEq * -100 + '%';

  sections
    .eq(sectionEq)
    .addClass('active')
    .siblings()
    .removeClass('active')

  display.css({
    'transform' : `translateY(${position})`
  });

  setTimeout(() => {
    inscroll = false;
    switchActiveClassFixedMenu(sectionEq);
  }, 1000 + 300); // = transtiton duration + 300 ms - time to complete inertion on touch-devices
};

const scrollToSection = direction => {
  const activeSection = sections.filter('.active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === 'next' && nextSection.length) {
    makeTransition(nextSection.index());
  }
  if (direction === 'prev' && prevSection.length) {
    makeTransition(prevSection.index());
  }
};

$('.wrapper').on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;

  if (deltaY > 0) {
    scrollToSection('next');
  }
  if (deltaY < 0) {
    scrollToSection('prev');
  }
});

$('.wrapper').on('touchmove', e => {
  e.preventDefault();
}); // mobile up-scroll data-scroll 0 prevention

$(document).on('keydown', e => {
  switch(e.keyCode) {
    case 38:
      scrollToSection('prev'); break;
    case 40:
      scrollToSection('next'); break;
  }
});

$('[data-scroll-to]').on('click', e => {
  e.preventDefault();
  const target = $(e.currentTarget).attr('data-scroll-to');
  makeTransition(target);
});

if (isMobile) {
  $(window).swipe({
    swipe: function(event, direction) {
      const nextOrPrev = direction === 'up' ? 'next' : 'prev';
      scrollToSection(nextOrPrev);
    }
  })
};
