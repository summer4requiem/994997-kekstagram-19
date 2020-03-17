'use strict';
// отрисовка большой фотографии
(function () {
  var MAX_ADDED_COMMENTS = 5;

  var fullScreenPreview = document.querySelector('.big-picture');
  var socialComments = fullScreenPreview.querySelector('.social__comments');
  var loadedComents = fullScreenPreview.querySelector('.comments-loaded');
  var bigPictureCancel = fullScreenPreview.querySelector('.big-picture__cancel');
  var commentsLoader = fullScreenPreview.querySelector('.social__comments-loader');


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

  var updateComments = function (count) {
    loadedComents.textContent = count;
    socialComments.innerHTML = '';

    if (count >= MAX_ADDED_COMMENTS) {
      commentsLoader.classList.remove('hidden');
    } else {
      commentsLoader.classList.add('hidden');
    }
  };


  var renderFullScreenPhoto = function (userData) {
    var count = 0;
    var commentsLength = userData.comments.length < MAX_ADDED_COMMENTS ? userData.comments.length : MAX_ADDED_COMMENTS;
    updateComments(commentsLength);

    fullScreenPreview.querySelector('.big-picture__img img').src = userData.url;
    fullScreenPreview.querySelector('.big-picture__img img').alt = userData.description;
    fullScreenPreview.querySelector('.social__caption').textContent = userData.description;
    fullScreenPreview.querySelector('.likes-count').textContent = userData.likes;
    fullScreenPreview.querySelector('.comments-count').textContent = userData.comments.length;

    for (var i = 0; i < commentsLength; i++) {
      socialComments.appendChild(generateFullScreenComment(userData.comments[i]));
    }

    var onCommentsLoaderClick = function () {
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
    };

    if (commentsLength >= MAX_ADDED_COMMENTS) {
      commentsLoader.addEventListener('click', onCommentsLoaderClick);
    }

    var onBigPictureCancel = function () {
      document.body.classList.remove('modal-open');
      fullScreenPreview.classList.add('hidden');
      count = 0;
      document.removeEventListener('click', onBigPictureCancel);
      commentsLoader.removeEventListener('click', onCommentsLoaderClick);
    };

    var onBigPictureEscKeyDown = function (evt) {
      if (evt.key === window.utils.ESC_KEY) {
        fullScreenPreview.classList.add('hidden');
        document.body.classList.remove('modal-open');
        count = 0;
        document.removeEventListener('keydown', onBigPictureEscKeyDown);
        commentsLoader.removeEventListener('click', onCommentsLoaderClick);
      }
    };

    fullScreenPreview.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscKeyDown);
    bigPictureCancel.addEventListener('click', onBigPictureCancel);
  };
  window.bigPicture = renderFullScreenPhoto;

})();
