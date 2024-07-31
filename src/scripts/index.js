import '../pages/index.css'; 
import { createCard } from '../components/card.js'; 
import { openPopup, closePopup } from '../components/modal.js'; 
import { enableValidation, clearValidation } from '../components/validation.js'; 
import { loadUserInfo, loadCards, saveProfileData, addCard, changeAvatar } from '../components/api.js'; 

// Добавляем каждому попапу анимацию
const popupList = document.querySelectorAll('.popup'); 
popupList.forEach(function(popup) { 
  popup.classList.add('popup_is-animated'); 
}); 

// Глобальные переменные
const cardsContainer = document.querySelector('.places__list');
const avatarButton = document.querySelector('.profile__image'); 
const editButton = document.querySelector('.profile__edit-button'); 
const addButton = document.querySelector('.profile__add-button'); 
const popupEdit = document.querySelector('.popup_type_edit'); 
const popupNewCard = document.querySelector('.popup_type_new-card'); 
const popupImage = document.querySelector('.popup_type_image'); 
const popupAvatar = document.querySelector('.popup_type_change-avatar'); 
const closePopupButtons = document.querySelectorAll('.popup__close'); 
const changeAvatarForm = document.forms.change_avatar; 
const inputAvatarURL = changeAvatarForm.elements.link; 
const editNameForm = document.forms.edit_profile; 
const inputName = editNameForm.elements.name; 
const inputJob = editNameForm.elements.description; 
const profileTitle = document.querySelector('.profile__title'); 
const profileDescription = document.querySelector('.profile__description'); 
const newPlaceForm = document.forms.new_place; 
const inputPlace = newPlaceForm.elements.place_name; 
const inputURL = newPlaceForm.elements.link; 
const imagePopup = document.querySelector('.popup__image'); 
const captionPopup = document.querySelector('.popup__caption'); 

// Обработчики закрытия попапов
closePopupButtons.forEach(function(icon) { 
  icon.addEventListener('click', function() { 
    closePopup(icon.closest('.popup')); 
  }); 
});

// Установка значений формы для редактирования профиля
function setValuesEditForm() { 
  inputName.value = profileTitle.textContent; 
  inputJob.value = profileDescription.textContent; 
}

// Обработка изменения аватара
avatarButton.addEventListener('click', function() { 
  openPopup(popupAvatar); 
  changeAvatarForm.reset(); 
  clearValidation(changeAvatarForm, validationConfig); 
});

changeAvatarForm.addEventListener('submit', function(evt) { 
  evt.preventDefault(); 
  renderLoading(true, popupAvatar); 
  changeAvatar(inputAvatarURL.value) 
    .then(data => { 
      avatarButton.style.backgroundImage = `url(${data.avatar})`; 
      closePopup(popupAvatar); 
    }) 
    .catch(err => console.log('Ошибка при обновлении аватара: ', err)) 
    .finally(() => { 
      renderLoading(false, popupAvatar); 
    }); 
});

// Обработка редактирования профиля
editButton.addEventListener('click', function() { 
  openPopup(popupEdit); 
  clearValidation(profileForm, validationConfig); 
  setValuesEditForm(); 
});

editNameForm.addEventListener('submit', function(evt) { 
  evt.preventDefault(); 
  renderLoading(true, popupEdit); 
  saveProfileData(inputName.value, inputJob.value) 
    .then(res => { 
      profileTitle.textContent = res.name; 
      profileDescription.textContent = res.about; 
      closePopup(popupEdit); 
    }) 
    .catch(err => console.log('Ошибка обновления данных пользователя: ', err)) 
    .finally(() => { 
      renderLoading(false, popupEdit); 
    }); 
});

// Обработка добавления новой карточки
addButton.addEventListener('click', function() { 
  openPopup(popupNewCard); 
  newPlaceForm.reset(); 
  clearValidation(placeForm, validationConfig); 
});

newPlaceForm.addEventListener('submit', function(evt) { 
  evt.preventDefault(); 
  renderLoading(true, popupNewCard); 
  addCard(inputPlace.value, inputURL.value) 
    .then(data => { 
      const myId = data.owner._id; 
      const newCard = createCard(data, showImage, myId, data._id); 
      cardsContainer.prepend(newCard); 
      closePopup(popupNewCard); 
    }) 
    .catch(err => console.log('Ошибка при добавлении карточки: ', err)) 
    .finally(() => { 
      renderLoading(false, popupNewCard); 
    }); 
});

// Показ изображения карточки
function showImage(evt) { 
  imagePopup.src = evt.target.src; 
  imagePopup.alt = evt.target.alt; 
  captionPopup.textContent = evt.target.alt; 

  if(evt.target.classList.contains('card__image')) { 
    openPopup(popupImage); 
  } 
}

// Валидация форм
const profileForm = document.querySelector('.edit_profile_form'); 
const placeForm = document.querySelector('.new_place_form'); 

const validationConfig = { 
  formSelector: '.popup__form', 
  inputSelector: '.popup__input', 
  submitButtonSelector: '.popup__button', 
  inactiveButtonClass: 'popup__button_inactive', 
  inputErrorClass: 'popup__input_type_error', 
  errorClass: 'popup-input-error_active' 
}; 

enableValidation(validationConfig);

// Загрузка данных пользователя и карточек
Promise.all([loadUserInfo(), loadCards()]) 
  .then(([userInfo, cardsArr]) => { 
    avatarButton.style.backgroundImage = `url(${userInfo.avatar})`; 
    profileTitle.textContent = userInfo.name; 
    profileDescription.textContent = userInfo.about; 
    const myId = userInfo._id; 

    cardsArr.forEach(function(cardData) { 
      const card = createCard(cardData, showImage, myId, cardData._id); 
      cardsContainer.append(card); 
    }); 
  }) 
  .catch((err) => { 
    console.log('Запрос не выполнен: ', err); 
  });

// Функция уведомления о загрузке
function renderLoading(isLoading, popup) { 
  const submitButton = popup.querySelector('.popup__button'); 
  if(isLoading) { 
    submitButton.textContent = 'Сохранение...'; 
  } else { 
    submitButton.textContent = 'Сохранить'; 
  } 
}