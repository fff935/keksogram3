// Імпорт функцій для генерації даних та відображення зображень
import { generatePhotos } from './mokData.js';
import { renderThumbnails } from './renderThumbnails.js';
import { showBigPicture } from './bigPicture.js';

// Генерація фотографій
const photos = generatePhotos();

// Відображення мініатюр фотографій
renderThumbnails(photos);

// Додавання обробників подій для відкриття великого зображення
function setupThumbnailsClickHandlers() {
  const pictureElements = document.querySelectorAll('.picture');  // Усі мініатюри

  pictureElements.forEach((pictureElement, index) => {
    pictureElement.addEventListener('click', () => {
      const photo = photos[index];  // Отримання фото за індексом
      showBigPicture(photo);        // Показ великого фото
    });
  });
}

// Виклик функції для обробки натискань на мініатюри
setupThumbnailsClickHandlers();
