const burger = document.querySelector('.burger');
const burgerClose = document.querySelector('.btn-close-hidden');
const hiddenBox = document.querySelector('.hidden-box');
const hiddenBlock = document.querySelector('.hidden-box__inner');
const $body = document.body
const wrapCont = document.querySelector('.wrapper-content')
const hero = document.querySelector('.hero')
const education = document.querySelector('.education')
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
let paddingOffset = window.innerWidth - $body.offsetWidth + 'px '

heroBtn.addEventListener('click', () => {
   wrapCont.classList.add('wrapper-content--toggle-style')
   popup.classList.add('popup--js-open')
   $body.style.overflowY = 'hidden'
   hero.style.paddingRight = paddingOffset
   education.style.paddingRight = paddingOffset

})

btnClosePopup.addEventListener('click', () => {
   popup.classList.remove('popup--js-open')
   $body.style.overflowY = 'visible'
   hero.style.paddingRight = '0px'
   education.style.paddingRight = '0px'

})
btnSubmit.addEventListener('click', () => {
   popup.classList.remove('popup--js-open')
   $body.style.overflowY = 'visible'
   wrapCont.style.paddingRight = '0px'
})

popup.addEventListener('click', (e) => {
   if (e.target === popup) {
      popup.classList.remove('popup--js-open')
      $body.style.overflow = 'visible'
      hero.style.paddingRight = '0px'
      education.style.paddingRight = '0px'
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



