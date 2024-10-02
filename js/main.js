import { generatePhotos } from './mokData.js';
import { renderThumbnails } from './renderThumbnails.js';

const photos = generatePhotos();
renderThumbnails(photos);
