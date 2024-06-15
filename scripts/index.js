// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(cardData, deleteCallback) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    deleteButton.addEventListener('click', deleteCallback);
    
    return cardElement;
}
// @todo: Функция удаления карточки
function deleteCallback(evt) {
    evt.target.closest('.places__item').remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function(cardData) {
    const cardElement = createCard(cardData, deleteCallback);
    cardsContainer.append(cardElement);
});