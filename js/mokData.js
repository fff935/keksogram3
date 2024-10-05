function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const descriptions = [
  "Чудовий захід сонця над океаном.",
  "Прогулянка по лісу після дощу.",
  "Затишне кафе в серці міста.",
  "Моя улюблена книжка на полиці.",
  "Сніданок на березі моря.",
  "Велопрогулянка в горах.",
  "Квіти в парку розквітли.",
  "Магія нічного міста.",
  "Смачний обід з друзями.",
  "Пейзаж річки в ранковому тумані.",
];

const messages = [
  "Все відмінно!",
  "Загалом все непогано. Але не всі.",
  "Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.",
  "Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.",
  "Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.",
  "Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?",
];

const names = ["Олег", "Катерина", "Іван", "Марина", "Артем", "Олександр"];

function generateComments(count) {
  return Array(count).fill(null).map(() => ({
    id: getRandomInt(100, 999),
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: messages[getRandomInt(0, messages.length - 1)],
    name: names[getRandomInt(0, names.length - 1)],
  }));
}

export function generatePhotos() {
  return Array(25).fill(null).map((_, i) => ({
    id: i + 1,
    url: `photos/${i + 1}.jpg`,
    description: descriptions[getRandomInt(0, descriptions.length - 1)],
    likes: getRandomInt(15, 200),
    comments: generateComments(getRandomInt(1, 50)),
  }));
}
