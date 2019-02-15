// send data to API server
const orderForm = document.querySelector('#order-form');
const send = document.querySelector('#send');

send.addEventListener('click', e => {
  e.preventDefault();

  if (validateForm(orderForm)) {
    const FormData = {
      name: orderForm.elements.name.value,
      phone: orderForm.elements.phone.value,
      comment: orderForm.elements.comment.value
    };
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.send(JSON.stringify(FormData));
    xhr.addEventListener('load', () => {
      if (xhr.response.status) {
        console.log('Успешно отправлено');
      }
    })
  }
});

function validateForm(form) {
  let valid = true;

  if (!validateField(form.elements.name)) {
    valid = false;
  }
  if (!validateField(form.elements.phone)) {
    valid = false;
  }
  if (!validateField(form.elements.comment)) {
    valid = false;
  }

  return valid;
}

function validateField(field) {
    field.nextElementSibling.textContent = field.validationMessage;

    return field.checkValidity();
}
