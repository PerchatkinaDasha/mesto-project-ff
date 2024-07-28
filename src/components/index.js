import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import {enableValidation, clearValidation} from "./validation.js";
import {getProfile, getCards, patchProfile, postCards, deleteCards, putLikes, deletelikes, patchAvatar} from "./api.js";

const placesList = document.querySelector(".places__list");
const pEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const pAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImg = document.querySelector(".popup_type_image");
const formEditProfile = document.forms["edit-profile"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileForm = document.forms['edit-profile'];
const profileFormNameInput = profileForm.elements['name'];
const buttonEditProfileAvatar = document.querySelector(".profile__avatar");
const popupEditProfileAvatar = document.querySelector(".popup_type_avatar");
const formEditProfileAvatar = document.forms['form-avatar'];
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
const formNewPlace = document.forms["new-place"];
popupTypeImg.classList.add("popup_is-animated");
popupTypeEdit.classList.add("popup_is-animated");
popupTypeNewCard.classList.add("popup_is-animated");

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

getCards().then((data) => {
  data.forEach(function (card) {
    placesList.append(createCard(card, cardTemplate, deleteCard, likeCard, putLikes, openImg));
  });
  }
)

function openImg(evt) {
  openModal(popupTypeImg);
  popupTypeImg.querySelector(".popup__image").src = evt.target.src;
  popupTypeImg.querySelector(".popup__image").alt = evt.target.alt;
  popupTypeImg.querySelector(".popup__caption").textContent = evt.target.alt;
}

pEditButton.addEventListener("click", (evt) => {
  openModal(popupTypeEdit);
  formEditProfile.elements.name.value = profileTitle.textContent;
  formEditProfile.elements.description.value = profileDescription.textContent;
});

pAddButton.addEventListener("click", (evt) => {
  openModal(popupTypeNewCard);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  const name = formEditProfile.elements.name.value;
  const about = formEditProfile.elements.description.value;
  profileTitle.textContent = name;
  profileDescription.textContent = about;
  patchProfile(name, about)
  closeModal(evt.target.closest(".popup_is-opened"));
}

function handleNewPlaceSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: formNewPlace.elements["place-name"].value,
    link: formNewPlace.elements.link.value,
  };
  postCards(card.name, card.link)
  placesList.prepend(createCard(card, cardTemplate, deleteCard, likeCard, openImg));
  formNewPlace.reset();
  closeModal(evt.target.closest(".popup_is-opened"));
}

buttonEditProfileAvatar.addEventListener("click", (evt) => {
  openModal(popupEditProfileAvatar);
  handleEditAvatar(evt);
}); 

// Код выполняемый при открытии модального окна
function handleEditAvatar(evt) {
  evt.preventDefault();
}

// код, который после заполнения формы и нажатия "сохранить" выводит метод, который обновит аватар
function saveProfileAvatar(evt) {
  console.log(document.forms['form-avatar'].elements['avatar'].value)
  patchAvatar(document.forms['form-avatar'].elements['avatar'].value)
}

// код, который делает запрос информации о пользователе и при 
function loadingProfile(evt) {
  const avatar = document.querySelector('.profile__image');
  const name = document.querySelector('.profile__title');
  const about = document.querySelector('.profile__description');
  getProfile().then((data) => {
    avatar.src = data.avatar 
    name.textContent = data.name 
    about.textContent = data.about 
    console.log(data)
  })
}

formEditProfile.addEventListener("submit", handleEditProfileSubmit);
formNewPlace.addEventListener("submit", handleNewPlaceSubmit);
formEditProfileAvatar.addEventListener("submit", saveProfileAvatar);


loadingProfile();
enableValidation(settings);

