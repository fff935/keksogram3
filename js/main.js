import { generatePhotos } from './mokData.js';
import { renderThumbnails } from './renderThumbnails.js';
import { showBigPicture } from './bigPicture.js';

const photos = generatePhotos();

renderThumbnails(photos);

function setupThumbnailsClickHandlers() {
  const pictureElements = document.querySelectorAll('.picture');  

  pictureElements.forEach((pictureElement, index) => {
    pictureElement.addEventListener('click', () => {
      const photo = photos[index];  
      showBigPicture(photo);        
    });
  });
}

setupThumbnailsClickHandlers();
