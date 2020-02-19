'use strict';
// отрисовк миниатюры;
(function () {
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

  var showPhotos = function () {
    var pictures = window.data;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.length; i++) {
      fragment.appendChild(renderPicture(pictures[i], i));
    }

    similarPictures.appendChild(fragment);
    // showFullPhoto(pictures);
  };

  showPhotos();
})();
