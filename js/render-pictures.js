'use strict';
(function () {
  var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
  var similarPictures = document.querySelector('.pictures');

  var renderPicture = function (picture) {
    var userElement = templatePicture.cloneNode(true);
    userElement.querySelector('.picture__img').setAttribute('src', picture.url);
    userElement.querySelector('.picture__comments').textContent = picture.comments.length;
    userElement.querySelector('.picture__likes').textContent = picture.likes;

    userElement.addEventListener('click', function () {
      window.bigPicture.render(picture);
    });
    return userElement;
  };

  var generatePictureFragment = function (arr) {
    var fragmentPicture = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      var pictureElement = renderPicture(arr[i]);
      pictureElement.setAttribute('data-num', i);
      fragmentPicture.appendChild(pictureElement);
    }
    return fragmentPicture;
  };

  var appendPicture = function (fragment) {
    similarPictures.appendChild(generatePictureFragment(fragment));
  };

  window.render = {
    appendPicture: appendPicture,
    renderPicture: renderPicture
  };
})();
