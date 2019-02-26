// only digits input
const phone = document.querySelector('#phone');
const house = document.querySelector('#house');
const housing = document.querySelector('#housing');
const flat = document.querySelector('#flat');
const floor = document.querySelector('#floor');



phone.addEventListener('keydown', function() {

  let digit = false;
  let control = false;

  if(event.key >= 0 || event.key <= 9) {
    digit = true;
  };
  if(event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace' || event.key === 'Tab') {
    control = true;
  };
  if(!digit && !control) {
    event.preventDefault();
  };
});

house.addEventListener('keydown', function() {

  let digit = false;
  let control = false;

  if(event.key >= 0 || event.key <= 9) {
    digit = true;
  };
  if(event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace' || event.key === 'Tab') {
    control = true;
  };
  if(!digit && !control) {
    event.preventDefault();
  };
});

housing.addEventListener('keydown', function() {

  let digit = false;
  let control = false;

  if(event.key >= 0 || event.key <= 9) {
    digit = true;
  };
  if(event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace' || event.key === 'Tab') {
    control = true;
  };
  if(!digit && !control) {
    event.preventDefault();
  };
});

flat.addEventListener('keydown', function() {

  let digit = false;
  let control = false;

  if(event.key >= 0 || event.key <= 9) {
    digit = true;
  };
  if(event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace' || event.key === 'Tab') {
    control = true;
  };
  if(!digit && !control) {
    event.preventDefault();
  };
});

floor.addEventListener('keydown', function() {

  let digit = false;
  let control = false;

  if(event.key >= 0 || event.key <= 9) {
    digit = true;
  };
  if(event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace' || event.key === 'Tab') {
    control = true;
  };
  if(!digit && !control) {
    event.preventDefault();
  };
});
