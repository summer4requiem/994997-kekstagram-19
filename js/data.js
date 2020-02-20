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


  var addComment = function () {
    return {
      avatar: 'img/avatar-' + window.utils.getRandomNumber(AVATAR_MIN_NUMBER, AVATAR_MAX_NUMBER) + '.svg',
      message: window.utils.getRandomElement(SAMPLE_TEXT),
      name: window.utils.getRandomElement(NAMES)
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
        likes: window.utils.getRandomNumber(MIN_LIKES, MAX_LIKES),
        comments: createComments()
      });
    }
    return usersArray;
  };

  window.data = usersData();

})();
