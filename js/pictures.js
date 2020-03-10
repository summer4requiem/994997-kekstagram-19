'use strict';
// отрисовк миниатюры;
(function () {

  var imgFilters = document.querySelector('.img-filters');

  var successHandler = function (data) {
    window.render.renderPicture(data);
    window.appendPicture.appendChild(data);
    imgFilters.classList.remove('img-filters--inactive');
  };

  window.backend.load(successHandler);

})();
