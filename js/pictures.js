'use strict';
// отрисовк миниатюры;
(function () {
  var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
  var similarPictures = document.querySelector('.pictures');
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var tagMain = document.querySelector('main');
  var errorButton = templateError.querySelector('.error__button');

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
    for (var i = 0; i < window.data.length; i++) {
      fragment.appendChild(renderPicture(pictures[i], i));
    }
    similarPictures.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var reporteError = templateError.cloneNode(true);
    templateError.querySelector('.error__title').textContent = errorMessage;
    tagMain.appendChild(reporteError);
    errorButton.onClick = ('click', function () {
      reporteError.classList.add('hidden');
    });
  };

  window.sendRequest(successHandler, errorHandler);

})();
