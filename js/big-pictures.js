'use strict';
// отрисовка большой фт=отографии
(function () {
  var fullScreenPreview = document.querySelector('.big-picture__preview');
  var socialComments = document.querySelector('.social__comments');


  var renderFullScreenPhoto = function (userData) {
    fullScreenPreview.querySelector('.big-picture__img img').src = userData.window.data.url;
    fullScreenPreview.querySelector('.big-picture__img img').alt = userData.window.data.description;
    fullScreenPreview.querySelector('.social__caption').textContent = userData.window.data.description;
    fullScreenPreview.querySelector('.likes-count').textContent = userData.window.data.likes;
    fullScreenPreview.querySelector('.comments-count').textContent = userData.window.data.length;

    for (var i = 0; i < window.data.comments.length; i++) {
      socialComments.appendChild(window.generateFullScreenComment);
      showFullPhoto(window.data);
    }
  };

  var showFullPhoto = function (usersDta) {
    renderFullScreenPhoto(usersDta[0]);
  };

  window.bigPicture = renderFullScreenPhoto();

})();
