const button = document.querySelector('.btn_background_black');
const orderButton = document.querySelector('#send');
const template = document.querySelector('#modal-template').innerHTML;
const modal = createModal();

button.addEventListener('click', e => {
  modal.setContent();
  modal.open();
});

function createModal(content) {
  const container = document.createElement('div');
  container.className = 'popup';
  container.innerHTML = template;

  const contentBlock = container.querySelector('.popup__content')

  const closeBtn = container.querySelector('.popup__close');
  closeBtn.addEventListener('click', e => {
    document.body.removeChild(container);
  });

  const overlay = container.querySelector('.overlay');
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      document.body.removeChild(container);
    }
  });


  return {
    open() {
      document.body.appendChild(container);
    },
    close() {
      document.body.removeChild(container);
    },
    setContent(content) {
      contentBlock.innerHTML = content;
    }
  };
}

// ajax

var ajaxForm = function (form) { // send request
  let formData = new FormData()
    formData.append('name', form.elements.name.value);
    formData.append('phone', form.elements.phone.value);
    formData.append('comment', form.elements.comment.value);
    formData.append('to', "ilia.kniazev1@gmail.com");

  let url = 'https://webdev-api.loftschool.com/sendmail/';

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', url);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.send(formData);

  return xhr;
}

var submitForm = function (e) { // обратотка ответа с сервера
  e.preventDefault();
  var form = e.target;
  let request = ajaxForm(form);  // присваиваем ответ сервера в переменную request

  request.addEventListener('load', () => {
    if (request.status >= 400) {
      let content = "Ошибка соединения с сервером, попробуйте позже";
      overlay.open(`${content}. Ошибка ${request.status}`)
    } else {
      let content = request.response.message;
      overlay.open(content, orderButton);
    }

    setTimeout(() => {
      overlay.close(content, orderButton);
    }, 3000);
  });
}
let orderForm = document.querySelector('#order-form');
orderForm.addEventListener('submit', submitForm);

// проверка правильности заполен
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
