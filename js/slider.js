'use strict';
(function () {
  var MAX_PERCENT = 100;
  var EFFECT_DEFAULT_PERCENT = 1;
  var PHOBOS_MAX = 3;
  var HEAT = 0.02;
  var SATURATION_WIDTH = 453;

  var pin = document.querySelector('.effect-level__pin');
  var saturationLine = document.querySelector('.effect-level__depth');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var effectLevelValue = document.querySelector('.effect-level__value');

  var Effects = {
    'chrome': function (value) {
      return 'grayscale' + '(' + (value / MAX_PERCENT) + ')';
    },
    'sepia': function (value) {
      return 'sepia' + '(' + ((EFFECT_DEFAULT_PERCENT / MAX_PERCENT) * value) + ')';
    },
    'marvin': function (value) {
      return 'invert' + '(' + value / MAX_PERCENT + ')';
    },
    'phobos': function (value) {
      return 'blur' + '(' + PHOBOS_MAX * (value / MAX_PERCENT) + 'px)';
    },
    'heat': function (value) {
      return 'brightness' + '(' + ((EFFECT_DEFAULT_PERCENT + value * HEAT)) + ')';
    },
  };

  pin.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();
    var startCoords = downEvt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = startCoords - moveEvt.clientX;
      startCoords = moveEvt.clientX;
      var shiftLeft = (pin.offsetLeft - shift);
      if (shiftLeft <= 0) {
        shiftLeft = 0;
      } else if (shiftLeft > SATURATION_WIDTH) {
        shiftLeft = SATURATION_WIDTH;
      }

      var moveLeft = shiftLeft + 'px';

      var levelValue = Math.round(shiftLeft * MAX_PERCENT / SATURATION_WIDTH);
      imgUploadPreview.style.filter = Effects[window.currentFilter().replace('effects__preview--', '')](levelValue);
      effectLevelValue.value = levelValue;
      pin.style.left = moveLeft;
      saturationLine.style.width = moveLeft;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
