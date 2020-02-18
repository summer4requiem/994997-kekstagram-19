'use strict';
// модуль для отрисовки увеличенного изображения

var fullScreenPreview = document.querySelector('.big-picture__preview');
var socialComments = document.querySelector('.social__comments');
var fullScreenPhoto = document.querySelector('.big-picture');
var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
var loaderBtn = document.querySelector('.comments-loader');


window.preview = {
  renderFullScreenPhoto: function (userData) {
    fullScreenPreview.querySelector('.big-picture__img img').src = userData.url;
    fullScreenPreview.querySelector('.big-picture__img img').alt = userData.description;
    fullScreenPreview.querySelector('.social__caption').textContent = userData.description;
    fullScreenPreview.querySelector('.likes-count').textContent = userData.likes;
    fullScreenPreview.querySelector('.comments-count').textContent = userData.comments.length;

    for (var i = 0; i < window.data.maxComments; i++) {
      socialComments.appendChild(window.data.generateFullScreenComment());
    }

  },
  renderPicture: function (picture, index) {
    var userElement = templatePicture.cloneNode(true);
    userElement.querySelector('.picture__img').src = picture.url;
    userElement.querySelector('.picture__comments').textContent = picture.comments.length;
    userElement.querySelector('.picture__likes').textContent = picture.likes;
    userElement.tabIndex = index;

    userElement.addEventListener('click', function () {
      window.preview.renderFullScreenPhoto(picture);
      fullScreenPhoto.classList.remove('hidden');
      loaderBtn.classList.add('hidden');
    });

    return userElement;
  },

  showFullPhoto: function (usersDta) {
    window.preview.renderFullScreenPhoto(usersDta[0]);
  }
};
