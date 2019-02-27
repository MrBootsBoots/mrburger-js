const teamItems = document.querySelectorAll('.team-accordeon__item');
const menuItems = document.querySelectorAll('.menu-accordeon__item');

for (item of teamItems) {
  item.addEventListener('click', handleTeamAcco);
}
for (item of menuItems) {
  item.addEventListener('click', handleMenuAcco);
}

function handleTeamAcco(e) {
  const curTeamItem = e.currentTarget;
  const closedTeamItem = curTeamItem.classList.contains('active');

  if (closedTeamItem) {
    closeTeamItem(teamItems);
  } else {
    closeTeamItem(teamItems);
    openTeamItem(curTeamItem);
  }
}
function handleMenuAcco(e) {
  const curMenuItem = e.currentTarget;
  const closedMenuItem = curMenuItem.classList.contains('active');

  if (closedMenuItem) {
    closeMenuItem(menuItems);
  } else {
    closeMenuItem(menuItems);
    openMenuItem(curMenuItem);
  }
}

function closeTeamItem(teamItems) {
  Array.from(teamItems).forEach(elem => {
    elem.classList.remove('active');
    elem.querySelector('.team-accordeon__content').style.height = 0;
  });
}
function closeMenuItem(menuItems) {
  Array.from(menuItems).forEach(elem => {
    elem.classList.remove('active');
    elem.querySelector('.menu-accordeon__description').style.width = 0;
  });
}

function openTeamItem(item) {
  const teamContent = item.querySelector('.team-accordeon__content');
  const teamTextBlock = teamContent.firstElementChild;
  const reqHeight = teamTextBlock.getBoundingClientRect().height;

  item.classList.add('active');
  teamContent.style.height = `${reqHeight}px`;
}
function openMenuItem(item) {
  const menuContent = item.querySelector('.menu-accordeon__description');
  const menuTextBlock = menuContent.firstElementChild;
  const reqWidth = menuTextBlock.getBoundingClientRect().width;

  item.classList.add('active');
  menuContent.style.width = `${reqWidth}px`;
}
