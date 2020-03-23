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

    var fragmentComments = document.createDocumentFragment();
    for (var i = 0; i < commentsLength; i++) {
      fragmentComments.appendChild(generateFullScreenComment(userData.comments[i]));
    }
    socialComments.appendChild(fragmentComments);

    var onCommentsLoaderClick = function () {
      count += MAX_ADDED_COMMENTS;
      var currentNum = (count + MAX_ADDED_COMMENTS);
      userData.comments.slice(count, currentNum).forEach(function (item) {
        fragmentComments.appendChild(generateFullScreenComment(item));
      });

      socialComments.appendChild(fragmentComments);

      if (currentNum >= userData.comments.length) {
        currentNum = userData.comments.length;
        commentsLoader.classList.add('hidden');
      }
      loadedComents.textContent = currentNum;
    };

    // если комментариев меньше 5 не навешиваем событие
    if (commentsLength >= MAX_ADDED_COMMENTS) {
      commentsLoader.addEventListener('click', onCommentsLoaderClick);
    }

    var closeBigPicture = function () {
      fullScreenPreview.classList.add('hidden');
      document.body.classList.remove('modal-open');
      count = 0;
      commentsLoader.removeEventListener('click', onCommentsLoaderClick);
    };

    var onBigPictureCancel = function () {
      closeBigPicture();
      document.removeEventListener('click', onBigPictureCancel);
    };

    var onBigPictureEscKeyDown = function (evt) {
      if (evt.key === window.utils.ESC_KEY) {
        closeBigPicture();
        document.removeEventListener('keydown', onBigPictureEscKeyDown);
      }
    };

    fullScreenPreview.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscKeyDown);
    bigPictureCancel.addEventListener('click', onBigPictureCancel);
  };

  window.bigPicture = {
    render: renderFullScreenPhoto
  };

})();
