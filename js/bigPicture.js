const COMMENTS_STEP = 5; // Кількість коментарів, що відображаються за раз
let currentCommentIndex = 0;
let totalComments = 0;
let commentsArray = [];

// Лічильник коментарів і кнопка завантаження ще
const commentCountBlock = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

// Функція для оновлення лічильника коментарів
const updateCommentCount = () => {
  const displayedComments = Math.min(currentCommentIndex, totalComments);
  commentCountBlock.textContent = `${displayedComments} із ${totalComments} коментарів`;
};

// Функція для створення елемента коментаря
const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');
  commentElement.innerHTML = `
    <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
    <p class="social__text">${comment.message}</p>
  `;
  return commentElement;
};

// Функція для показу коментарів
const showComments = () => {
  const commentsContainer = document.querySelector('.social__comments');
  const fragment = document.createDocumentFragment();
  
  const commentsToShow = commentsArray.slice(currentCommentIndex, currentCommentIndex + COMMENTS_STEP);
  commentsToShow.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });

  commentsContainer.appendChild(fragment);
  currentCommentIndex += COMMENTS_STEP;

  updateCommentCount();

  // Ховаємо кнопку, якщо більше немає коментарів
  if (currentCommentIndex >= totalComments) {
    commentsLoader.classList.add('hidden');
  }
};

// Обробник кліку для кнопки "Завантажити ще"
commentsLoader.addEventListener('click', () => {
  showComments();
});

// Функція для ініціалізації коментарів
const initializeComments = (comments) => {
  commentsArray = comments;
  totalComments = commentsArray.length;
  currentCommentIndex = 0;

  // Очищаємо старі коментарі
  const commentsContainer = document.querySelector('.social__comments');
  commentsContainer.innerHTML = '';

  // Показуємо перші коментарі
  showComments();
};

// Функція для відображення великого зображення
export function showBigPicture(photo) {
  const bigPictureElement = document.querySelector(".big-picture");
  const imgElement = bigPictureElement.querySelector(".big-picture__img img");
  const likesCountElement = bigPictureElement.querySelector(".likes-count");
  const commentsCountElement = bigPictureElement.querySelector(".comments-count");
  const commentsListElement = bigPictureElement.querySelector(".social__comments");
  const descriptionElement = bigPictureElement.querySelector(".social__caption");

  // Перевіряємо наявність елементів перед роботою з ними
  if (!imgElement || !likesCountElement || !commentsCountElement || !commentsListElement || !descriptionElement) {
    console.error('Не вдалося знайти один із необхідних елементів у DOM.');
    return; // Виходимо, якщо не знайдено один із елементів
  }

  imgElement.src = photo.url;
  likesCountElement.textContent = photo.likes;
  commentsCountElement.textContent = photo.comments.length;
  descriptionElement.textContent = photo.description;

  commentsListElement.innerHTML = "";

  // Виводимо коментарі
  photo.comments.forEach((comment) => {
    const commentElement = document.createElement("li");
    commentElement.classList.add("social__comment");

    commentElement.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;

    commentsListElement.appendChild(commentElement);
  });

  bigPictureElement.classList.remove("hidden");
  document.body.classList.add("modal-open");

  setupCloseBigPicture();
}


// Функція для закриття великого зображення
function closeBigPicture() {
  const bigPictureElement = document.querySelector(".big-picture");
  bigPictureElement.classList.add("hidden");
  document.body.classList.remove("modal-open");

  // Очищуємо події, щоб уникнути повторного виклику
  const closeButton = document.querySelector(".big-picture__cancel");
  closeButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onEscapePress);

  resetBigPictureState();
}

// Скидаємо стан модального вікна після закриття
function resetBigPictureState() {
  const bigPictureElement = document.querySelector(".big-picture");
  const commentsContainer = bigPictureElement.querySelector('.social__comments');
  const likesCountElement = bigPictureElement.querySelector(".likes-count");
  const commentsCountElement = bigPictureElement.querySelector(".comments-count");
  const descriptionElement = bigPictureElement.querySelector(".social__caption");

  // Перевіряємо наявність елементів перед очищенням
  if (commentsContainer) {
    commentsContainer.innerHTML = '';
  }

  if (likesCountElement) {
    likesCountElement.textContent = '';
  }

  if (commentsCountElement) {
    commentsCountElement.textContent = '';
  }

  if (descriptionElement) {
    descriptionElement.textContent = '';
  }
}


// Функція для обробки натискання клавіші "Escape"
function onEscapePress(evt) {
  if (evt.key === "Escape" || evt.key === "Esc") {
    closeBigPicture();
  }
}

// Налаштування обробників для закриття модального вікна
function setupCloseBigPicture() {
  const closeButton = document.querySelector(".big-picture__cancel");

  closeButton.addEventListener("click", closeBigPicture);

  document.addEventListener("keydown", onEscapePress);
}

// Функція для додавання обробників кліку на всі фотографії
const setupImageClickHandlers = () => {
  const photoElements = document.querySelectorAll('.photo-item'); // Приклад класу для зображення
  photoElements.forEach((photoElement, index) => {
    photoElement.addEventListener('click', () => {
      const photoData = getPhotoDataByIndex(index); // Функція для отримання даних фото
      showBigPicture(photoData);
    });
  });
};

// Функція для отримання даних фотографій (залежить від вашої структури даних)
function getPhotoDataByIndex(index) {
  return photosArray[index]; // Передбачається, що у вас є масив із даними всіх фотографій
}

// Ініціалізація після завантаження сторінки
setupImageClickHandlers();
