'use strict';
// отрисовк миниатюры;
(function () {
  var MAX_PICTURES_AMOUNT = 25;
  var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
  var similarPictures = document.querySelector('.pictures');

  var renderPicture = function (picture, index) {
    var userElement = templatePicture.cloneNode(true);
    userElement.querySelector('.picture__img').src = picture.url;
    userElement.querySelector('.picture__comments').textContent = picture.comments.length;
    userElement.querySelector('.picture__likes').textContent = picture.likes;
    userElement.tabIndex = index;

    userElement.addEventListener('click', function () {
      window.bigPicture.render(picture);
    });
    return userElement;
  };

  var successHandler = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_PICTURES_AMOUNT; i++) {
      fragment.appendChild(renderPicture(pictures[i], i));
    }
    similarPictures.appendChild(fragment);
  };

  window.backend.load(successHandler);
})();
