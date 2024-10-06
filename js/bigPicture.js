const COMMENTS_STEP = 5;
let currentCommentIndex = 0;
let totalComments = 0;
let commentsArray = [];

const commentCountBlock = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const updateCommentCount = () => {
  const displayedComments = Math.min(currentCommentIndex, totalComments);
  commentCountBlock.textContent = `${displayedComments} із ${totalComments} коментарів`;
};

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');
  commentElement.innerHTML = `
    <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
    <p class="social__text">${comment.message}</p>
  `;
  return commentElement;
};

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

  if (currentCommentIndex >= totalComments) {
    commentsLoader.classList.add('hidden');
  }
};

commentsLoader.addEventListener('click', () => {
  showComments();
});

const initializeComments = (comments) => {
  commentsArray = comments;
  totalComments = commentsArray.length;
  currentCommentIndex = 0;

  const commentsContainer = document.querySelector('.social__comments');
  commentsContainer.innerHTML = '';

  showComments();
};

export function showBigPicture(photo) {
  const bigPictureElement = document.querySelector(".big-picture");
  const imgElement = bigPictureElement.querySelector(".big-picture__img img");
  const likesCountElement = bigPictureElement.querySelector(".likes-count");
  const commentsCountElement = bigPictureElement.querySelector(".comments-count");
  const commentsListElement = bigPictureElement.querySelector(".social__comments");
  const descriptionElement = bigPictureElement.querySelector(".social__caption");

  if (!imgElement || !likesCountElement || !commentsCountElement || !commentsListElement || !descriptionElement) {
    console.error('Не вдалося знайти один із необхідних елементів у DOM.');
    return; 
  }

  imgElement.src = photo.url;
  likesCountElement.textContent = photo.likes;
  commentsCountElement.textContent = photo.comments.length;
  descriptionElement.textContent = photo.description;

  commentsListElement.innerHTML = "";

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

function closeBigPicture() {
  const bigPictureElement = document.querySelector(".big-picture");
  bigPictureElement.classList.add("hidden");
  document.body.classList.remove("modal-open");

  const closeButton = document.querySelector(".big-picture__cancel");
  closeButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onEscapePress);

  resetBigPictureState();
}

function resetBigPictureState() {
  const bigPictureElement = document.querySelector(".big-picture");
  const commentsContainer = bigPictureElement.querySelector('.social__comments');
  const likesCountElement = bigPictureElement.querySelector(".likes-count");
  const commentsCountElement = bigPictureElement.querySelector(".comments-count");
  const descriptionElement = bigPictureElement.querySelector(".social__caption");

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

function onEscapePress(evt) {
  if (evt.key === "Escape" || evt.key === "Esc") {
    closeBigPicture();
  }
}

function setupCloseBigPicture() {
  const closeButton = document.querySelector(".big-picture__cancel");

  closeButton.addEventListener("click", closeBigPicture);

  document.addEventListener("keydown", onEscapePress);
}

const setupImageClickHandlers = () => {
  const photoElements = document.querySelectorAll('.photo-item');
  photoElements.forEach((photoElement, index) => {
    photoElement.addEventListener('click', () => {
      const photoData = getPhotoDataByIndex(index);
      showBigPicture(photoData);
    });
  });
};

function getPhotoDataByIndex(index) {
  return photosArray[index]; 
}

setupImageClickHandlers();
