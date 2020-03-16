'use strict';
// отрисовка большой фотографии
(function () {
  var MAX_ADDED_COMMENTS = 5;

  var bodyDocument = document.querySelector('body');
  var fullScreenPreview = document.querySelector('.big-picture');
  var socialComments = fullScreenPreview.querySelector('.social__comments');
  var loadedComents = fullScreenPreview.querySelector('.comments-loaded');
  var bigPictureCancel = fullScreenPreview.querySelector('.big-picture__cancel');
  var commentsLoader = document.querySelector('.social__comments-loader');


  var onBigPictureCancel = function () {
    bodyDocument.classList.remove('modal-open');
    fullScreenPreview.classList.add('hidden');
    document.removeEventListener('click', onBigPictureCancel);
  };

  var onBigPictureEscKeyDown = function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      fullScreenPreview.classList.add('hidden');
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

  var updateComments = function () {
    loadedComents.textContent = MAX_ADDED_COMMENTS;
    socialComments.innerHTML = '';
    commentsLoader.classList.remove('hidden');
  };


  var renderFullScreenPhoto = function (userData) {
    var count = 0;
    updateComments();
    fullScreenPreview.querySelector('.big-picture__img img').src = userData.url;
    fullScreenPreview.querySelector('.big-picture__img img').alt = userData.description;
    fullScreenPreview.querySelector('.social__caption').textContent = userData.description;
    fullScreenPreview.querySelector('.likes-count').textContent = userData.likes;
    fullScreenPreview.querySelector('.comments-count').textContent = userData.comments.length;

    for (var i = 0; i < MAX_ADDED_COMMENTS; i++) {
      socialComments.appendChild(generateFullScreenComment(userData.comments[i]));
    }

    commentsLoader.addEventListener('click', function () {
      count += MAX_ADDED_COMMENTS;
      var currentNum = (count + MAX_ADDED_COMMENTS);
      userData.comments.slice(count, currentNum).forEach(function (item) {
        socialComments.appendChild(generateFullScreenComment(item));
      });

      if (currentNum >= userData.comments.length) {
        currentNum = userData.comments.length;
        commentsLoader.classList.add('hidden');
      }
      loadedComents.textContent = currentNum;
    });


    fullScreenPreview.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscKeyDown);
    bigPictureCancel.addEventListener('click', onBigPictureCancel);
  };
  window.bigPicture = renderFullScreenPhoto;

})();
