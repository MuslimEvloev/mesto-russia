const pageContent = document.querySelector(".page");
const placeList = document.querySelector(".places__list");
const formElement = document.querySelector(".popup__form");
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupSrc = document.querySelector(".popup__image");
const imagePopupTitle = document.querySelector(".popup__caption");
const popupClose = document.querySelectorAll(".popup__close");
const profileFormElement = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileImg = document.querySelector(".profile__image");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const cardFormElement = document.querySelector(".popup_type_new-card");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const imgInput = document.querySelector(".popup__input_type_url");

const buttons = document.querySelector(".button");
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.add("popup_is-animated");
}
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

function createElem(name, link) {
  const cardtemplate = document.querySelector("#card-template").content;
  const cardElem = cardtemplate.querySelector(".places__item").cloneNode(true);

  cardElem.querySelector(".card__title").textContent = name;

  const cardImage = cardElem.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener("click", function () {
    imagePopupSrc.src = cardImage.src;

    openModal(imagePopup);
  });
  cardElem
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-button_is-active");
    });
  cardElem
    .querySelector(".card__delete-button")
    .addEventListener("click", function (e) {
      // Элемент, на котором был выполнен клик
      const targetElem = e.target;

      // Определяем был ли выполнен клик
      // на одной из кнопок или внутри её
      const buttonElem = targetElem.closest(".card__delete-button");

      // Если клик был выполнен вне кнопки, buttonElem === null
      if (buttonElem === null) {
        // Если клик выполнен не на кнопке, ничего не делаем
        e.stopPropagation();
        return;
      }

      const containerElem = targetElem.closest(".card");
      containerElem.remove();
      // Выводим в консоль контейнер, содержащий нажатую кнопку
      console.log(containerElem);
    });

  return cardElem;
}

function renderCards(cards) {
  cards.forEach((card) => {
    const cardElement = createElem(card.name, card.link);
    placeList.append(cardElement);
  });
}

renderCards(initialCards);

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", function () {
    openModal(profilePopup);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  });

document
  .querySelector(".profile__add-button")
  .addEventListener("click", function () {
    openModal(cardPopup);
  });

profileImg.addEventListener("click", function () {
  imagePopupSrc.src = profileImg.style;
  openModal(imagePopup);
});

popupClose.forEach((button) => {
  button.addEventListener("click", function () {
    const popup = button.closest(".popup"); // Находим родительский попап
    closeModal(popup);
  });
});

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelectorAll(".popup");
    popup.forEach((pops) => closeModal(pops));
  }
}

if (openModal === true) {
  pageContent.addEventListener("click", function () {
    const popup = document.querySelectorAll(".popup");
    popup.forEach((pops) => closeModal(pops));
  });
}

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});
document.addEventListener("keydown", closeByEsc);
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  profilePopup.classList.remove("popup_is-opened");
  nameInput.value = "";
  jobInput.value = "";
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const newCardElem = createElem(cardNameInput.value, imgInput.value);
  placeList.prepend(newCardElem);

  cardPopup.classList.remove("popup_is-opened");
  cardNameInput.value = "";
  imgInput.value = "";
}
cardFormElement.addEventListener("submit", handleCardFormSubmit);
// ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
// ''''''''''''''''''''
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
const showInputError = (formElement, inputElement, errorMessage) => {
  const formError = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add("form__input_type_error");
  formError.textContent = errorMessage;
  formError.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const formError = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove("form__input_type_error");
  formError.classList.remove("form__input-error_active");
  formError.textContent = "";
};

const checkInputValidation = (inputElement, formElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListener = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidation(inputElement, formElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListener(formElement);
  });
};

enableValidation();
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("button_inactive");
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove("button_inactive");
    buttonElement.removeAttribute("disabled", "");
  }
}
