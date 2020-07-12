'use strict';

const dataBase = JSON.parse(localStorage.getItem('awito') || []);
let counter = dataBase.length;
const infoPhoto = {};

const modalAdd = document.querySelector('.modal__add');
const addAd = document.querySelector('.add__ad');
const modalBtnSubmit = document.querySelector('.modal__btn-submit');
const modalSubmit = document.querySelector('.modal__submit');
const catalog = document.querySelector('.catalog');
const modalItem = document.querySelector('.modal__item');
const modalBtnWarning = document.querySelector('.modal__btn-warning');
const modalFileInput = document.querySelector('.modal__file-input');
const modalFileBtn = document.querySelector('.modal__file-btn');
const modalImgAdd = document.querySelector('.modal__image-add');
const modalImgItem = document.querySelector('.modal__image-item');
const modalHeaderItem = document.querySelector('.modal__header-item');
const modalStatusItem = document.querySelector('.modal__status-item');
const modalDescriptionItem = document.querySelector('.modal__description-item');
const modalCostItem = document.querySelector('.modal__cost-item');
const searchInput = document.querySelector('.search__input');
const menuContainer = document.querySelector('.menu__container');

const textFileBtn = modalFileBtn.textContent;
const srcModalImage = modalImgAdd.src;

const elementsModalSubmit = [...modalSubmit.elements]
  .filter(el => el.tagName !== 'BUTTON' &&  el.type !== 'submit');

/* send data to localStorage */
const saveDB = () =>  localStorage.setItem('awito', JSON.stringify(dataBase));

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
      modalImgAdd.src = srcModalImage;
      modalFileBtn.textContent = textFileBtn;
  }
};

const renderCard = (db = dataBase) => {
  catalog.textContent = '';
  db.forEach((item, i) => {
    catalog.insertAdjacentHTML('beforeend', `
      <li class="card" data-id-item="${item.id}">
        <img class="card__image" src="data:image/jpeg;base64,${item.image}" alt="${item.nameItem}">
        <div class="card__description">
          <h3 class="card__header">${item.nameItem}</h3>
          <div class="card__price">${item.costItem}</div>
        </div>
      </li>
    `); /* don't change but add */
  });
};


/* add ad to database */
modalSubmit.addEventListener('submit', event => {
  event.preventDefault();
  const itemObj = {};
  for (const el of elementsModalSubmit) {
    itemObj[el.name] = el.value;
  }
  itemObj.id = counter++;
  itemObj.image = infoPhoto.base64;
  dataBase.push(itemObj);
  closeModal({ target: modalAdd });
  saveDB();
  renderCard();
});

searchInput.addEventListener('input', event => {
  const valueSearch = searchInput.value.trim().toLowerCase();
  if(valueSearch.length > 2) {
    const result = dataBase.filter(item => item.nameItem.toLowerCase().includes(valueSearch) ||
                                  item.descriptionItem.toLowerCase().includes(valueSearch));
    renderCard(result);
  }
});

modalFileInput.addEventListener('change', event => {
  const target = event.target;
  const reader = new FileReader();
  const file = target.files[0];

  infoPhoto.fileName = file.name;
  infoPhoto.size = file.size;

  reader.readAsBinaryString(file);

  reader.addEventListener('load', event => {
    console.log(infoPhoto.size);
    console.log(infoPhoto);
    if(infoPhoto.size < 5500000) {
      modalFileBtn.textContent = infoPhoto.fileName;
      infoPhoto.base64 = btoa(event.target.result); /* convert img */
      modalImgAdd.src = `data:image/jpeg;base64,${infoPhoto.base64}`; /* adding picture */
    } else {
      modalFileBtn.textContent = 'Файл не должен превышать 5 Mб';
      modalFileInput.value = '';
      checkForm();
    }
  });
});

modalSubmit.addEventListener('input', checkForm);

addAd.addEventListener('click', () => {
  modalAdd.classList.remove('hide');
  modalBtnSubmit.disabled = true;
  document.addEventListener('keydown', closeModal);
});

catalog.addEventListener('click', (event) => {
  const target = event.target;
  const card = target.closest('.card');
  if(card) {
    const item = dataBase.find(obj => obj.id === +card.dataset.idItem);

    modalImgItem.src = `data:image/jpeg;base64,${item.image}`;
    modalHeaderItem.textContent = item.nameItem;
    modalStatusItem.textContent = item.status === 'new' ? 'Новый' : 'Б/У';
    modalDescriptionItem.textContent = item.descriptionItem;
    modalCostItem.textContent = item.costItem;
    modalItem.classList.remove('hide');
    document.addEventListener('keydown', closeModal);
  }
});

menuContainer.addEventListener('click', event => {
  const target = event.target;
  if(target.tagName === 'A') {
    const result = dataBase.filter(item => item.category === target.dataset.category);
    renderCard();
  }
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);

renderCard();