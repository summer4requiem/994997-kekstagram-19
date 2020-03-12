'use strict';
// отрисовка большой фотографии
(function () {
  var fullScreenPreview = document.querySelector('.big-picture');
  var socialComments = document.querySelector('.social__comments');
  var bigPictureCancel = fullScreenPreview.querySelector('.big-picture__cancel');
  var fullScreenPhoto = document.querySelector('.big-picture');
  var bodyDocument = document.querySelector('body');
  var commentsLoader = document.querySelector('.social__comments-loader');
  var MAX_VISIBLE_COMMENTS = 3;


  var onBigPictureCancel = function () {
    bodyDocument.classList.remove('modal-open');
    fullScreenPhoto.classList.add('hidden');
    document.removeEventListener('click', onBigPictureCancel);
  };

  var onBigPictureEscKeyDown = function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      fullScreenPreview.classList.add('hidden');
      fullScreenPhoto.classList.remove('overlay');
      bodyDocument.classList.remove('modal-open');
      document.removeEventListener('keydown', onBigPictureEscKeyDown);
    }
  };

  var generateFullScreenComment = function (data) {
    var container = document.createElement('li');
    container.classList.add('social__comment');

    var commentImg = document.createElement('img');
    commentImg.classList.add('social__picture');
    commentImg.style.width = '35px';
    commentImg.style.height = '35px';
    commentImg.src = data.avatar;

    var text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = data.message;

    container.appendChild(commentImg);
    container.appendChild(text);
    return container;
  };

  var renderFullScreenPhoto = function (userData) {
    fullScreenPreview.querySelector('.big-picture__img img').src = userData.url;
    fullScreenPreview.querySelector('.big-picture__img img').alt = userData.description;
    fullScreenPreview.querySelector('.social__caption').textContent = userData.description;
    fullScreenPreview.querySelector('.likes-count').textContent = userData.likes;
    fullScreenPreview.querySelector('.comments-count').textContent = userData.comments.length;

    for (var i = 0; i < MAX_VISIBLE_COMMENTS; i++) {
      socialComments.appendChild(generateFullScreenComment(userData.comments[i]));
    }

    commentsLoader.addEventListener('click', function () {
      for (var j = 0; j < 5; j++) {
        socialComments.appendChild(generateFullScreenComment(userData.comments[j]));
      }
    });

    fullScreenPreview.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscKeyDown);
    bigPictureCancel.addEventListener('click', onBigPictureCancel);
  };

  window.bigPicture = renderFullScreenPhoto;


})();
