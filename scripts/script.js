'use strict';

const dataBase = [];

const modalAdd = document.querySelector('.modal__add');
const addAd = document.querySelector('.add__ad');
const modalBtnSubmit = document.querySelector('.modal__btn-submit');
const modalSubmit = document.querySelector('.modal__submit');
const catalog = document.querySelector('.catalog');
const modalItem = document.querySelector('.modal__item');
const modalBtnWarning = document.querySelector('.modal__btn-warning');

const elementsModalSubmit = [...modalSubmit.elements]
  .filter(el => el.tagName !== 'BUTTON' &&  el.type !== 'submit');

const closeModal = function(event) {
  const target = event.target;
  if(target.classList.contains('modal__close') || target === this) {
    this.classList.add('hide');
    if(this === modalAdd) {
      modalSubmit.reset();
    }
  }
}

const closeModalEscape = function(event) {
  if(event.key === 'Escape') {
    modalAdd.classList.add('hide');
    modalItem.classList.add('hide');
    document.removeEventListener('keydown', closeModalEscape);
  }
}

modalSubmit.addEventListener('input', () => {
  const validForm = elementsModalSubmit.every(el => el.value);
  modalBtnSubmit.disabled = !validForm;
  modalBtnWarning.style.display = validForm ? 'none' : '';
});

modalSubmit.addEventListener('submit', event => {
  event.preventDefault();
  const itemObj = {};
  for (const el of elementsModalSubmit) {
    itemObj[el.name] = el.value;
  }
  dataBase.push(itemObj);
  modalSubmit.reset();
});

addAd.addEventListener('click', () => {
  modalAdd.classList.remove('hide');
  modalBtnSubmit.disabled = true;
  document.addEventListener('keydown', closeModalEscape);
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);

catalog.addEventListener('click', (event) => {
  const target = event.target;
  if(target.closest('.card')) {
    modalItem.classList.remove('hide');
    document.addEventListener('keydown', closeModalEscape);
  }
});
