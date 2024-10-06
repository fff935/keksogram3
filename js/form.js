// form.js

// Отримуємо елементи форми
const uploadFileInput = document.getElementById('upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.getElementById('upload-cancel');
const uploadSubmitButton = document.getElementById('upload-submit');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const previewImage = document.querySelector('.img-upload__preview img'); // Отримуємо елемент для попереднього перегляду

// Функція для показу форми
const showForm = () => {
  imgUploadOverlay.classList.remove('hidden'); // Відкриваємо форму
};

// Функція для очищення значень полів форми
const clearForm = () => {
  uploadFileInput.value = ''; // Очищаємо поле вибору файлу
  hashtagsInput.value = ''; // Очищаємо поле хештегів
  descriptionInput.value = ''; // Очищаємо поле опису
  previewImage.src = 'img/upload-default-image.jpg'; // Встановлюємо дефолтне зображення
};

// Функція для приховування форми
const hideForm = () => {
  imgUploadOverlay.classList.add('hidden'); // Закриваємо форму
  clearForm(); // Очищаємо форму
};

// Функція для валідації хештегів
const validateHashtags = () => {
  const hashtags = hashtagsInput.value.trim();
  const hashtagsArray = hashtags.split(' ').filter(Boolean); // Розділяємо хештеги і очищаємо пусті значення
  const uniqueHashtags = new Set();
  
  // Очистка попередніх повідомлень про помилки
  hashtagsInput.setCustomValidity('');

  if (hashtagsArray.length > 5) {
    hashtagsInput.setCustomValidity('Максимальна кількість хештегів - 5.');
    return false; // Валідація не пройшла
  }

  for (const hashtag of hashtagsArray) {
    const trimmedHashtag = hashtag.trim();
    const isValid = /^#[A-Za-z0-9]{1,19}$/.test(trimmedHashtag); // Валідація на хештег

    if (!isValid) {
      hashtagsInput.setCustomValidity('Хештег повинен починатися з #, складатися тільки з букв і цифр, і не може бути довшим за 20 символів.');
      return false; // Валідація не пройшла
    }

    const lowerCaseHashtag = trimmedHashtag.toLowerCase();
    if (uniqueHashtags.has(lowerCaseHashtag)) {
      hashtagsInput.setCustomValidity('Хештеги не повинні повторюватися.');
      return false; // Валідація не пройшла
    }

    uniqueHashtags.add(lowerCaseHashtag);
  }

  return true; // Валідація пройшла
};

// Функція для валідації коментаря
const validateDescription = () => {
  const description = descriptionInput.value.trim();

  if (description.length > 140) {
    descriptionInput.setCustomValidity('Довжина коментаря не може перевищувати 140 символів.');
    return false; // Валідація не пройшла
  }

  // Очищення попереднього повідомлення про помилку
  descriptionInput.setCustomValidity('');
  return true; // Валідація пройшла
};

// Функція для валідації форми
const validateForm = () => {
  const hashtagsValid = validateHashtags();
  const descriptionValid = validateDescription();

  return hashtagsValid && descriptionValid; // Повертаємо результат валідації
};

// Функція для відображення попереднього перегляду зображення
const displayPreviewImage = (file) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    previewImage.src = event.target.result; // Встановлюємо нове зображення для попереднього перегляду
  };
  reader.readAsDataURL(file); // Читаємо файл як URL
};

// Обробник події для відкриття форми при виборі файлу
const onFileChange = (event) => {
  if (event.target.files.length > 0) {
    displayPreviewImage(event.target.files[0]); // Відображаємо попередній перегляд обраного зображення
    showForm(); // Відкриваємо форму
  }
};

// Додаємо обробник події для вибору файлу
uploadFileInput.addEventListener('change', onFileChange);

// Обробник події для закриття форми
uploadCancelButton.addEventListener('click', hideForm);

// Обробник події для валідації при відправці форми
uploadSubmitButton.addEventListener('click', (event) => {
  if (!validateForm()) {
    event.preventDefault(); // Зупиняємо відправку, якщо валідація не пройдена
    hashtagsInput.reportValidity(); // Показуємо повідомлення про помилку
    descriptionInput.reportValidity(); // Показуємо повідомлення про помилку
  }
});

// Обробник подій для ESC у полях вводу
[hashtagsInput, descriptionInput].forEach(input => {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.stopPropagation(); // Запобігаємо закриттю форми при натисканні ESC
    }
  });
});

// Експорт функцій
export { showForm, hideForm };
