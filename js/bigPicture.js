// Функція для відображення великого фото
export function showBigPicture(photo) {
    const bigPictureElement = document.querySelector(".big-picture");
    const imgElement = bigPictureElement.querySelector(".big-picture__img img");
    const likesCountElement = bigPictureElement.querySelector(".likes-count");
    const commentsCountElement = bigPictureElement.querySelector(".comments-count");
    const commentsListElement = bigPictureElement.querySelector(".social__comments");
    const descriptionElement = bigPictureElement.querySelector(".social__caption");
  
    // Встановлюємо дані фото
    imgElement.src = photo.url;
    likesCountElement.textContent = photo.likes;
    commentsCountElement.textContent = photo.comments.length;
    descriptionElement.textContent = photo.description;
  
    // Очищаємо попередні коментарі
    commentsListElement.innerHTML = "";
  
    // Додаємо нові коментарі
    photo.comments.forEach((comment) => {
      const commentElement = document.createElement("li");
      commentElement.classList.add("social__comment");
  
      commentElement.innerHTML = `
        <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
        <p class="social__text">${comment.message}</p>
      `;
  
      commentsListElement.appendChild(commentElement);
    });
  
    // Показуємо модальне вікно з великим зображенням
    bigPictureElement.classList.remove("hidden");
  
    // Додаємо клас для блокування скролу
    document.body.classList.add("modal-open");
  
    // Налаштовуємо закриття великого фото
    setupCloseBigPicture();
  }
  
  // Функція для закриття великого фото
  function closeBigPicture() {
    const bigPictureElement = document.querySelector(".big-picture");
    bigPictureElement.classList.add("hidden");
    document.body.classList.remove("modal-open");
  }
  
  // Налаштування обробників для закриття фото
  function setupCloseBigPicture() {
    const closeButton = document.querySelector(".big-picture__cancel");
  
    // Закриття при натисканні на кнопку "Закрити"
    closeButton.addEventListener("click", closeBigPicture);
  
    // Закриття при натисканні клавіші Esc
    document.addEventListener("keydown", function (evt) {
      if (evt.key === "Escape" || evt.key === "Esc") {
        closeBigPicture();
      }
    });
  }
  