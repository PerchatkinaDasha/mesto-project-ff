export function createCard(card, cardTemplate, deleteCard, likeCard, putLikes, openImg) {
  const placesItem = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
    placesItem.id = card._id;

  const buttonDel = placesItem.querySelector(".card__delete-button");
  const cardImage = placesItem.querySelector(".card__image");
  const buttonLike = placesItem.querySelector(".card__like-button");
  cardImage.src = card.link;
  cardImage.alt = "Местность " + card.name;
  placesItem.querySelector(".card__title").textContent = card.name;
  cardImage.addEventListener("click", openImg);
  buttonDel.addEventListener("click", deleteCard);
  buttonLike.addEventListener("click", (evt) => {
    putLikes(card._id) 
    likeCard(evt)
  });
  return placesItem;
}

export function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

export function likeCard(evt) {
  console.log(evt.target.closest(".places__item"))
  evt.target.classList.toggle("card__like-button_is-active");
}