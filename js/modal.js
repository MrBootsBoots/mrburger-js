const buttons = document.querySelectorAll('.reviews__btn');
const orderButton = document.querySelector('#send');
const reviews = document.querySelectorAll('.reviews__item-hover');
const template = document.querySelector('#modal-template').innerHTML;
const modal = createModal();

for (var button of buttons) {
  button.addEventListener('click', e => {
    modal.setContent();
    modal.open();
  });
};

for (var review of reviews) {
  review.addEventListener('click', e => {
    let content = review.cloneNode(true),
    btn = content.querySelector('.reviews__btn');
    content.removeChild(btn);
    modal.setContent(content.innerHTML);
  })
};

function createModal(content) {
  const container = document.createElement('div');
  container.className = 'popup';
  container.innerHTML = template;

  const contentBlock = container.querySelector('.popup__content')

  const closeBtn = container.querySelector('.popup__close');
  closeBtn.addEventListener('click', e => {
    document.body.removeChild(container);
  });

  const orderBtn = container.querySelector('.btn_popup_close');
  orderBtn.innerText = 'ЗАКРЫТЬ';
  orderBtn.addEventListener('click', e => {
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
    },
    hideSmallBtn() {
      closeBtn.style.display = 'none';
    },
    showButton() {
      orderBtn.style.display = 'flex';
      orderBtn.style.alignSelf = 'center';
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
      modal.setContent(`${content}. Ошибка ${request.status}`)
      modal.open(content);
      modal.hideSmallBtn();
      modal.showButton();
    } else {
      let content = request.response.message;
      modal.setContent(content);
      modal.open(content);
      modal.hideSmallBtn();
      modal.showButton();
    }

    setTimeout(() => {
      modal.close();
    }, 30222300);
  });
}
let orderForm = document.querySelector('#order-form');
orderForm.addEventListener('submit', submitForm);

// проверка правильности заполнения
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
