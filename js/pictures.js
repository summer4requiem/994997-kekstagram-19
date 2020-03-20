'use strict';
// отрисовк миниатюры;
(function () {
  var imgFilters = document.querySelector('.img-filters');

  var successHandler = function (data) {
    window.photos = data;
    window.renderPicture.append(data);
    imgFilters.classList.remove('img-filters--inactive');
  };

  window.backend.load(successHandler);
})();
