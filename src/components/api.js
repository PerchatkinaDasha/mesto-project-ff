const TOKEN = 'addfed15-a266-4dc6-a1db-593a4d29e187';

const config = {
    base: 'https://nomoreparties.co/v1/wff-cohort-18/',
    headers: {
        authorization: TOKEN,
        'Content-Type': 'application/json',
    },
};

//1:Загрузка информации о пользователе с сервера GET https://nomoreparties.co/v1/:cohortId/users/me
export const getProfile = () => {
	return fetch(config.base + "users/me", {
		headers: config.headers,
	})
	 .then(handleResponse);
	};

//2: метод загрузки карточек GET https://nomoreparties.co/v1/cohortId/cards
export const getCards = () => {
	return fetch(config.base + "cards", {
		headers: config.headers,
	})
	.then((res) => handleResponse(res, `Ошибка: ${res.status} во время загрузки карточек.`));
};

//3:  метод редактирования профиля с помощью патча PATCH https://nomoreparties.co/v1/cohortId/users/me
export const patchProfile = (name, about) => {
	return fetch(config.base + "users/me", {
        method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			"name": name,
			"about": about,
		  }),
	})
	.then((res) => handleResponse(res, `Ошибка: ${res.status} во время редактирования профиля.`));
};

//4: метод добавления карточки POST https://nomoreparties.co/v1/cohortId/cards 
export const postCards = (name, link) => {
	return fetch(config.base + "cards ", {
        method: 'POST',
		headers: config.headers,
		body: JSON.stringify({
			"name": name,
			"link": link,
		  }),
	})
	.then((res) => handleResponse(res, `Ошибка: ${res.status} во время добавления карточки.`));
};

//5: метод удаления карточки DELETE https://nomoreparties.co/v1/cohortId/cards/cardId
export const deleteCards = (cardId) => {
	return fetch(config.base + `cards/${cardId}`, {
        method: 'DELETE',
		headers: config.headers,
	})
	.then((res) => handleResponse(res, `Ошибка: ${res.status} во время удаления карточки.`));
};

//6: метод  постановки лайка PUT https://nomoreparties.co/v1/cohortId/cards/likes/cardId
export const putLikes= (cardId) => {
	return fetch(config.base + `cards/likes/${cardId}`, {
        method: 'PUT',
		headers: config.headers,
	})
		.then((res) => handleResponse(res, `Ошибка: ${res.status} во время постановки лайка.`));
};

//7: метод снятия лайка DELETE https://nomoreparties.co/v1/cohortId/cards/likes/cardId
export const deletelikes= (cardId) => {
	return fetch(config.base + `cards/likes/${cardId}`, {
        method: 'DELETE',
		headers: config.headers,
	})
		.then((res) => handleResponse(res, `Ошибка: ${res.status} во время удаления лайка.`));
};

//8: обновления аватара пользователя PATCH https://nomoreparties.co/v1/cohortId/users/me/avatar
export const patchAvatar = (avatar) => {
	return fetch(config.base + "users/me/avatar", {
        method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			avatar,
		  }),
	})
		.then((res) => handleResponse(res,`Ошибка: ${res.status} во время обновления аватара пользователя.`));
	
};

function handleResponse(response) {
	if (response.ok) return response.json();
	return Promise.reject(`Ошибка: ${response.status} во время запроса информации о профиле.`);
}
