// Функція для створення однієї мініатюри
function createThumbnail(photo) {
  const template = document.querySelector("#picture").content.cloneNode(true);
  const imgElement = template.querySelector(".picture__img");
  const likesElement = template.querySelector(".picture__likes");
  const commentsElement = template.querySelector(".picture__comments");

  imgElement.src = photo.url; // URL для фото
  likesElement.textContent = photo.likes; // Кількість лайків
  commentsElement.textContent = photo.comments.length; // Кількість коментарів

  return template;
}

// Функція для створення всіх мініатюр
function renderThumbnails(photos) {
  const fragment = document.createDocumentFragment();
  photos.map((photo) => fragment.appendChild(createThumbnail(photo))); // Використовуємо map та createThumbnail

  const picturesContainer = document.querySelector(".pictures");
  picturesContainer.appendChild(fragment); // Вставляємо мініатюри в контейнер
}

export { createThumbnail, renderThumbnails };
