// open review

let reviewOpen = function (content) {
  let container = document.querySelector('.reviews__list');

  container.addEventListener('click', e => {
    e.preventDefault();
    let target = e.target;
    if (target.className === 'review__btn') {
      overlay.open('#modal-review', content);
    }
  });
}
content = document.querySelector('#overlay1').innerHTML;
reviewOpen(content);

// Modal

const overlay = (function () {
  let body = document.querySelector('body');
  let link = document.createElement('a'); // create link

  link.classList.add('modal-review__close');
  link.setAttribute('href', '#');

  let openOverlay = function (modalId, content) {
    let overlay = document.querySelector(modalId);
    let innerOverlay = overlay.querySelector('.modal-review__inner');

    if(content) {
      innerOverlay.innerHTML = content;
    }
    innerOverlay.appendChild(link); // add close link after all modal content

    overlay.classList.add('active'); // add class and show modal
    body.classList.add('locked');

    link.addEventListener('click', e => { // close btn onclick event
      e.preventDefault();
      closeOverlay(modalId); // close
    });

    overlay.addEventListener('click', e => { // click outside modal
      e.preventDefault();
      if (e.target === overlay) {
        closeOverlay(modalId); // close
      }
    });

    document.addEventListener('keydown', e => {
      if (e.keyCode == 27) closeOverlay(modalId); // close if ESC clicked
    });
  }

  let closeOverlay = function (modalId) {
    let overlay = document.querySelector(modalId);

    overlay.classList.remove('active');
    body.classList.remove('locked');
  }

  let setContent = function (modalId, content) {
    let overlay = document.querySelector(modalId);
    let innerOverlay = overlay.querySelector('.modal-review__inner');

    if(content) {
      innerOverlay.innerHTML = content;
      innerOverlay.appendChild(link); // add close link after all modal content
    }
  }
  return {
    open: openOverlay,
    close: closeOverlay,
    setContent: setContent
  }
});

// AJAX

var ajaxForm = function (form) { // send request
  let formData = new FormData()
    formData.append('name', form.elements.name.value);
    formData.append('phone', form.elements.phone.value);
    formData.append('comment', form.elements.comment.value);
    formData.append('to', "ilia.kniazev1@gmail.com");

  let url = 'https://webdev-api.loftschool.com/sendmail';

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
      overlay.open('#modal-review', `${content}. Ошибка ${request.status}`)
    } else {
      let content = request.response.message;
      overlay.open('#modal-review', content);
    }
  });
}

let orderForm = document.querySelector('#order-form');
orderForm.addEventListener('submit', submitForm);
