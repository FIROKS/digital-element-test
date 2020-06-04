'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var STATUS_CODE_OK = 200;
  var disableBodyScroll = bodyScrollLock.disableBodyScroll;
  var enableBodyScroll = bodyScrollLock.enableBodyScroll;

  var onFormElementSubmit = function (evt) {
    evt.preventDefault();

    if (nameInputElement.validity.valid && emailInputElement.validity.valid && messageInputElement.validity.valid) {
      sendForm();
    }
  };

  var sendForm = function () {
    var name = nameInputElement.value;
    var email = emailInputElement.value;
    var message = messageInputElement.value;

    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
        xhrProcess(successElement);
      } else {
        xhrProcess(errorElement);
      }
    });

    xhr.addEventListener('error', function () {
      xhrProcess(errorElement);
    });

    xhr.open('POST', 'http://rest.learncode.academy/api/afrianska/form', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify({
      name: name,
      email: email,
      message: message
    }));
  };

  var xhrProcess = function (element) {
    formContainerElement.classList.remove('modal--show');
    element.classList.add('modal--show');
    enableBodyScroll(modalElement);
    setTimeout(function () {
      element.classList.add('modal--reveal');
      formContainerElement.classList.remove('modal--reveal');
    }, 100);

    setTimeout(function () {
      element.classList.remove('modal--reveal');
    }, 1500);

    setTimeout(function () {
      modalElement.classList.remove('modal--show');
      element.classList.remove('modal--show');
    }, 2500);
  };

  var onOpenButtonElementClick = function (evt) {
    evt.preventDefault();

    openModal();
  };

  var onModalElementClick = function (evt) {
    if (!formWrapperElement.contains(evt.target)) {
      evt.preventDefault();

      closeModal();
    }
  };

  var onWindowKeydown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();

      closeModal();
    }
  };

  var openModal = function () {
    modalElement.classList.add('modal--show');
    formContainerElement.classList.add('modal--show');

    setTimeout(function () {
      formContainerElement.classList.add('modal--reveal');
    }, 100);
    disableBodyScroll(modalElement);

    window.addEventListener('keydown', onWindowKeydown);
    modalElement.addEventListener('click', onModalElementClick);
  };

  var closeModal = function () {

    formContainerElement.classList.remove('modal--reveal');
    setTimeout(function () {
      modalElement.classList.remove('modal--show');
      formContainerElement.classList.remove('modal--show');
    }, 600);
    enableBodyScroll(modalElement);

    window.removeEventListener('keydown', onWindowKeydown);
    modalElement.removeEventListener('click', onModalElementClick);
  };

  var openButtonElement = document.querySelector('#open-modal');
  var modalElement = document.querySelector('.modal');
  var formWrapperElement = document.querySelector('.modal__wrapper');
  var formContainerElement = document.querySelector('.modal__form');
  var successElement = document.querySelector('.modal__success');
  var errorElement = document.querySelector('.modal__error');
  var formElement = document.querySelector('#form');

  if (formElement) {
    var nameInputElement = formElement.querySelector('#name');
    var emailInputElement = formElement.querySelector('#email');
    var messageInputElement = formElement.querySelector('#message');

    formElement.addEventListener('submit', onFormElementSubmit);
  }

  if (openButtonElement && modalElement && formWrapperElement) {

    openButtonElement.addEventListener('click', onOpenButtonElementClick);
  }

})();
