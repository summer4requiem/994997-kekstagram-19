'use strict';

(function () {
  var SAMPLE_TEXT = ['В целом всё неплохо. Но не всё.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.'];
  var NAMES = ['Андрей', 'Виталий', 'Кирилл', 'Вячеслав', 'Надежда', 'Аня'];
  var MAX_COMMENT = 5;
  var AVATAR_MIN_NUMBER = 1;
  var AVATAR_MAX_NUMBER = 6;
  var TOTAL_OBJECTS = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomElement = function (array) {
    return array[getRandomNumber(0, array.length)];
  };

  var generateFullScreenComment = function () {
    var container = document.createElement('li');
    container.classList.add('social__comment');

    var commentImg = document.createElement('img');
    commentImg.classList.add('social__picture');
    commentImg.style.width = '35px';
    commentImg.style.height = '35px';
    commentImg.src = 'img/avatar-' + getRandomNumber(AVATAR_MIN_NUMBER, AVATAR_MAX_NUMBER) + '.svg';

    var text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = getRandomNumber(SAMPLE_TEXT);

    container.appendChild(commentImg);
    container.appendChild(text);
    return container;
  };

  var addComment = function () {
    return {
      avatar: 'img/avatar-' + getRandomNumber(AVATAR_MIN_NUMBER, AVATAR_MAX_NUMBER) + '.svg',
      message: getRandomElement(SAMPLE_TEXT),
      name: getRandomElement(NAMES)
    };
  };

  var createComments = function () {
    var comments = [];
    for (var i = 0; i < MAX_COMMENT; i++) {
      comments.push(addComment());
    }
    return comments;
  };

  var usersData = function () {
    var usersArray = [];
    for (var i = 0; i < TOTAL_OBJECTS; i++) {
      usersArray.push({
        url: 'photos/' + (i + AVATAR_MIN_NUMBER) + '.jpg',
        description: 'Описание фотографии',
        likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
        comments: createComments()
      });
    }
    return usersArray;
  };

  window.data = usersData();
  window.generateFullScreenComment = generateFullScreenComment();

})();
