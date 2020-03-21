'use strict';
(function () {
  var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
  var similarPictures = document.querySelector('.pictures');

  var renderPicture = function (picture) {
    var userElement = templatePicture.cloneNode(true);
    userElement.querySelector('.picture__img').src = picture.url;
    userElement.querySelector('.picture__comments').textContent = picture.comments.length;
    userElement.querySelector('.picture__likes').textContent = picture.likes;

    userElement.addEventListener('click', function () {
      window.bigPicture.render(picture);
    });
    return userElement;
  };


  var generatePictureFragment = function (arr) {
    var fragmentPicture = document.createDocumentFragment();
    arr.forEach(function (el) {
      var pictureElement = renderPicture(el);
      fragmentPicture.appendChild(pictureElement);
    });
    return fragmentPicture;
  };


  var appendPicture = function (fragment) {
    similarPictures.appendChild(generatePictureFragment(fragment));
  };

  window.renderPicture = {
    append: appendPicture,
    render: renderPicture
  };
})();
