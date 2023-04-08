/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
var burger = document.querySelector('.burger');
var burgerClose = document.querySelector('.btn-close-hidden');
var hiddenBox = document.querySelector('.hidden-box');
var hiddenBlock = document.querySelector('.hidden-box__inner');
var $body = document.body;

//burger - menu открытие и закрытие
burger.addEventListener('click', function () {
  hiddenBox.classList.add('hidden-box--js-open-box');
  $body.style.overflow = 'hidden';
});
burgerClose.addEventListener('click', function () {
  hiddenBox.classList.remove('hidden-box--js-open-box');
  $body.style.overflow = 'visible';
});

// попап
var heroBtn = document.querySelector('.hero__btn');
var popup = document.querySelector('.popup');
var btnClosePopup = document.querySelector('.popup__close');
var btnSubmit = document.querySelector('.btn--type-pay');
heroBtn.addEventListener('click', function () {
  popup.classList.add('popup--js-open');
  $body.style.overflowY = 'hidden';
});
btnClosePopup.addEventListener('click', function () {
  popup.classList.remove('popup--js-open');
  $body.style.overflowY = 'visible';
});
btnSubmit.addEventListener('click', function () {
  popup.classList.remove('popup--js-open');
  $body.style.overflowY = 'visible';
});
popup.addEventListener('click', function (e) {
  if (e.target === popup) {
    popup.classList.remove('popup--js-open');
    $body.style.overflow = 'visible';
  }
});

// отменяем дефолтное действие у кнопки 'Оплатить'.
btnSubmit.addEventListener('click', function (e) {
  e.preventDefault();
});

//записываем в localStorag данные вводимые в поле email
var inputMail = document.querySelector('.popup__form-email');
inputMail.addEventListener('input', function () {
  localStorage.setItem(inputMail.name, inputMail.value);
});
if (inputMail.type === 'email') {
  inputMail.value = localStorage.getItem(inputMail.name, inputMail.value);
}
/******/ })()
;