'use strict';
(function () {
  var ESC_KEY = 'Escape';

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  window.utils = {
    getRandomNumber: getRandomNumber,
    ESC_KEY: ESC_KEY
  };

})();
