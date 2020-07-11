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

/*handler inside the ad submission form */
const checkForm = () => {
  const validForm = elementsModalSubmit.every(el => el.value);
  modalBtnSubmit.disabled = !validForm;
  modalBtnWarning.style.display = validForm ? 'none' : '';
}

const closeModal = event => {
  const target = event.target;
  if (target.closest('.modal__close') ||
      target.classList.contains('modal') ||
      event.code === 'Escape') {
      modalAdd.classList.add('hide');
      modalItem.classList.add('hide');
      document.removeEventListener('keydown', closeModal);
      modalSubmit.reset();
      checkForm();
  }
};

modalSubmit.addEventListener('input', checkForm);

modalSubmit.addEventListener('submit', event => {
  event.preventDefault();
  const itemObj = {};
  for (const el of elementsModalSubmit) {
    itemObj[el.name] = el.value;
  }
  dataBase.push(itemObj);
  closeModal({ target: modalAdd });
});

addAd.addEventListener('click', () => {
  modalAdd.classList.remove('hide');
  modalBtnSubmit.disabled = true;
  document.addEventListener('keydown', closeModal);
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);

catalog.addEventListener('click', (event) => {
  const target = event.target;
  if(target.closest('.card')) {
    modalItem.classList.remove('hide');
    document.addEventListener('keydown', closeModal);
  }
});
