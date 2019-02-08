// Team section js
const items = document.querySelectorAll('.team-accordeon__item');

for (item of items) {
  item.addEventListener('click', handleAcco);
}

function handleAcco(e) {
  const curItem = e.currentTarget;
  const closedItem = curItem.classList.contains('active');

  if (closedItem) {
    closeItem(items);
  } else {
    closeItem(items);
    openItem(curItem);
  }
}

function closeItem(items) {
  Array.from(items).forEach(elem => {
    elem.classList.remove('active');
    elem.querySelector('.team-accordeon__content').style.height = 0;
  });
}

function openItem(item) {
  const content = item.querySelector('.team-accordeon__content');
  const textBlock = content.firstElementChild;
  const reqHeight = textBlock.getBoundingClientRect().height;

  item.classList.add('active');
  content.style.height = `${reqHeight}px`;
}
