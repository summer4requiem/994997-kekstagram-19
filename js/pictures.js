'use strict';
// отрисовк миниатюры;
(function () {
  var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
  var similarPictures = document.querySelector('.pictures');
  var tagMain = document.querySelector('main');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');


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
    var reportSuccess = templateSuccess.cloneNode(true);
    var successButton = reportSuccess.querySelector('.success__button');
    tagMain.appendChild(reportSuccess);

    var onSuccessKeyDown = function (evt) {
      if (evt.key === window.utils.ESC_KEY) {
        tagMain.removeChild(reportSuccess);
        document.removeEventListener('keydown', onSuccessKeyDown);
      }
    };

    successButton.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('success') || evt.target.classList.contains('success__button')) {
        tagMain.removeChild(reportSuccess);
        document.removeEventListener('keydown', onSuccessKeyDown);
      }
    });
    document.removeEventListener('keydown', onSuccessKeyDown);
  };

  window.backend.load(successHandler);
})();
