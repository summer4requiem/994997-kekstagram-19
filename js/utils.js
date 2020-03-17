'use strict';
(function () {
  var ESC_KEY = 'Escape';

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // var getRandomElement = function (array) {
  //   return array[getRandomNumber(0, array.length)];
  // };

  window.utils = {
    getRandomNumber: getRandomNumber,
    // getRandomElement: getRandomElement,
    ESC_KEY: ESC_KEY
  };

})();
