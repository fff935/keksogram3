export function showBigPicture(photo) {
    const bigPictureElement = document.querySelector(".big-picture");
    const imgElement = bigPictureElement.querySelector(".big-picture__img img");
    const likesCountElement = bigPictureElement.querySelector(".likes-count");
    const commentsCountElement = bigPictureElement.querySelector(".comments-count");
    const commentsListElement = bigPictureElement.querySelector(".social__comments");
    const descriptionElement = bigPictureElement.querySelector(".social__caption");

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
  }

  function setupCloseBigPicture() {
    const closeButton = document.querySelector(".big-picture__cancel");
  
    closeButton.addEventListener("click", closeBigPicture);
  
    document.addEventListener("keydown", function (evt) {
      if (evt.key === "Escape" || evt.key === "Esc") {
        closeBigPicture();
      }
    });
  }
  