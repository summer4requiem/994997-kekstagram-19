'use strict';

// модуль, который работает с галереей изображений; Использует вспомогательные модули

window.gallery = {
  usersData: function () {
    var usersArray = [];
    for (var i = 0; i < window.data.TOTAL_OBJECTS; i++) {
      usersArray.push({
        url: 'photos/' + (i + window.data.avatarMinNumber) + '.jpg',
        description: 'Описание фотографии',
        likes: window.data.getRandomNumber(window.data.minLikes, window.data.maxLikes),
        comments: createComments()
      });
    }
    return usersArray;
  }
};

var createComments = function () {
  var comments = [];
  for (var i = 0; i < window.data.maxComments; i++) {
    comments.push(addComment());
  }
  return comments;
};

var addComment = function () {
  return {
    avatar: 'img/avatar-' + window.data.getRandomNumber(window.data.avatarMinNumber, window.data.avatarMaxNumber) + '.svg',
    message: window.data.getRandomNumber(window.data.sampleText),
    name: window.data.getRandomNumber(window.data.names)
  };
};
