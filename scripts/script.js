'use strict';

const modalAdd = document.querySelector('.modal__add');
const addAd = document.querySelector('.add__ad');
const modalBtnSubmit = document.querySelector('.modal__btn-submit');
const modalSubmit = document.querySelector('.modal__submit');
const catalog = document.querySelector('.catalog');
const modalItem = document.querySelector('.modal__item');

addAd.addEventListener('click', () => {
  modalAdd.classList.remove('hide');
  modalBtnSubmit.disabled = true;
});

modalAdd.addEventListener('click', (event) => {
  const target = event.target;
  if(target.classList.contains('modal__close') || target === modalAdd) {
    modalAdd.classList.add('hide');
    modalSubmit.reset();
  }
});

catalog.addEventListener('click', (event) => {
  const target = event.target;
  modalItem.classList.remove('hide');
  if(target.classList.contains('modal__close') || target === modalItem) {
    modalItem.classList.add('hide');
  }
});

document.addEventListener('keydown', (event) => {
  if(event.key === 'Escape') {
    modalAdd.classList.add('hide');
    modalItem.classList.add('hide');
  }
});