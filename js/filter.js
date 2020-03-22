'use strict';
(function () {
  var MAX_RANDOM_PHOTO = 10;
  var filtersForm = document.querySelector('.img-filters__form');

  var deletePictures = function () {
    var pictures = document.querySelectorAll('.picture');
    for (var i = 0; i < pictures.length; i++) {
      pictures[i].remove();
    }
  };

  var mixPhotos = function (array) {
    var randoms = [];
    for (var i = 0; i < MAX_RANDOM_PHOTO; i++) {
      var index = window.utils.getRandomNumber(0, array.length);
      randoms.push(array[index]);
      array.splice(index, 1);
    }
    return randoms;
  };

  var sortComments = function (array) {
    return array.sort(function (lessComments, moreComments) {
      return moreComments.comments.length - lessComments.comments.length;
    });
  };

  var resetPhotos = function () {
    return window.photos;
  };

  var changeFilter = window.debounce(function (cb) {
    var arrayCopy = window.photos.slice();
    var data = cb(arrayCopy);
    deletePictures();
    window.renderPicture.append(data);
  });


  var activateBtnFilter = function (evt) {
    var activeButton = filtersForm.querySelector('.img-filters__button--active');
    if (activeButton) {
      activeButton.classList.remove('img-filters__button--active');
    }

    evt.target.classList.add('img-filters__button--active');
  };


  filtersForm.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('img-filters__button') && !evt.target.classList.contains('img-filters__button--active')) {
      var currentBtn = evt.target.getAttribute('id');
      switch (currentBtn) {
        case 'filter-random':
          changeFilter(mixPhotos);
          break;
        case 'filter-discussed':
          changeFilter(sortComments);
          break;
        default:
          changeFilter(resetPhotos);
          break;
      }
      activateBtnFilter(evt);
    }
  });
})();
