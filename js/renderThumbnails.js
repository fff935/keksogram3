function createThumbnail(photo) {
  const template = document.querySelector("#picture").content.cloneNode(true);
  const imgElement = template.querySelector(".picture__img");
  const likesElement = template.querySelector(".picture__likes");
  const commentsElement = template.querySelector(".picture__comments");

  imgElement.src = photo.url;
  likesElement.textContent = photo.likes;
  commentsElement.textContent = photo.comments.length;

  return template;
}

function renderThumbnails(photos) {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    fragment.appendChild(createThumbnail(photo));
  });

  const picturesContainer = document.querySelector(".pictures");
  picturesContainer.appendChild(fragment);
}

export { createThumbnail, renderThumbnails };
