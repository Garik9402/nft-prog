const burger = document.querySelector('.burger');
const burgerClose = document.querySelector('.btn-close-hidden');
const hiddenBox = document.querySelector('.hidden-box');
const hiddenBlock = document.querySelector('.hidden-box__inner');
const $body = document.body

//burger - menu открытие и закрытие
burger.addEventListener('click', () => {
   hiddenBox.classList.add('hidden-box--js-open-box')
   $body.style.overflow = 'hidden';
});
burgerClose.addEventListener('click', () => {
   hiddenBox.classList.remove('hidden-box--js-open-box')
   $body.style.overflow = 'visible';
});

// попап
const heroBtn = document.querySelector('.hero__btn')
const popup = document.querySelector('.popup')
const btnClosePopup = document.querySelector('.popup__close')
const btnSubmit = document.querySelector('.btn--type-pay')

heroBtn.addEventListener('click', () => {
   popup.classList.add('popup--js-open')
   $body.style.overflowY = 'hidden'
})

btnClosePopup.addEventListener('click', () => {
   popup.classList.remove('popup--js-open')
   $body.style.overflowY = 'visible'
})
btnSubmit.addEventListener('click', () => {
   popup.classList.remove('popup--js-open')
   $body.style.overflowY = 'visible'
})
popup.addEventListener('click', (e) => {
   if (e.target === popup) {
      popup.classList.remove('popup--js-open')
      $body.style.overflow = 'visible'
   }
})

// отменяем дефолтное действие у кнопки 'Оплатить'.
btnSubmit.addEventListener('click', (e) => {
   e.preventDefault()
})

//записываем в localStorag данные вводимые в поле email
const inputMail = document.querySelector('.popup__form-email')
inputMail.addEventListener('input', () => {
   localStorage.setItem(inputMail.name, inputMail.value)
})

if (inputMail.type === 'email') {
   inputMail.value = localStorage.getItem(inputMail.name, inputMail.value)
}



