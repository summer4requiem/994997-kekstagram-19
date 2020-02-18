'use strict';

// модуль для отрисовки миниатюры;
var similarPictures = document.querySelector('.pictures');

var showPhotos = function () {
  var pictures = window.gallery.usersData();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < window.data.TOTAL_OBJECTS; i++) {
    fragment.appendChild(window.preview.renderPicture(pictures[i], i));
  }

  similarPictures.appendChild(fragment);
  window.preview.showFullPhoto(pictures);
};

showPhotos();
