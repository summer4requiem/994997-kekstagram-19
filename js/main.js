'use strict';
var sampleText = ['В целом всё неплохо. Но не всё.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.'];
var names = ['Андрей', 'Виталий', 'Кирилл', 'Вячеслав', 'Надежда', 'Аня'];
var TOTAL_OBJECTS = 25;
var minValue = 15;
var maxValue = 200;

// куда создаем шаблон
var similarPictures = document.querySelector('.pictures');
// чем заполняем шаблон
var templatePicture = document.querySelector('#picture').content.querySelector('.picture');


var getRandomNumber = function (min, max) {
  return Math.random() * (max - min) + min;
};

var getRandomElement = function (array) {
  return array[getRandomNumber(0, array.length)];
};

var addComment = function () {
  return {
    avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
    message: sampleText[getRandomElement(0, sampleText.length)],
    name: names[getRandomElement(0, names.length)]
  };
};

var comment = [];

var createComment = function () {
  for (var i = 0; i < TOTAL_OBJECTS; i++) {
    comment.push(addComment());
  }
  return comment;
};


// // функция для создания массива из 25 сгенерированных JS объектов
var usersArray = [];

var userPictures = function () {
  for (var i = 0; i < TOTAL_OBJECTS; i++) {
    usersArray.push({
      url: 'photos /' + i + '.jpg',
      description: 'Описание фотографии',
      likes: getRandomNumber(minValue, maxValue),
      comments: createComment()
    });
  }
};


var createUsers = function (users) {
  for (var i = 0; i < TOTAL_OBJECTS; i++) {
    var userElement = templatePicture.cloneNode(true);
    similarPictures.appendChild(userElement);
    userElement.querySelector('.picture__img').src = users.url;
    userElement.querySelector('.picture__comments').textContent = users.comments;
    userElement.querySelector('.picture__likes').textContent = users.likes;
  }
};

createUsers(usersArray);

var fragment = document.createDocumentFragment();
for (var i = 0; i < TOTAL_OBJECTS; i++) {
  fragment.appendChild(userPictures(usersArray));
}
similarPictures.appendChild(fragment);
