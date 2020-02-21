'use strict';
(function () {
  var pinHandle = document.querySelector('.effect-level__pin');
  var saturationLine = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var MAX_PERСENT = 100;


  pinHandle.addEventListener('mousedown', function (evt) {
    // положение курсора по х от левого верхнего угла страницы
    evt.preventDefault();
    var startCoords = evt.clientX;


    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      // считаем дельту на каждое движение
      var shift = startCoords - moveEvt.clientX;
      startCoords = moveEvt.clientX;

      var shiftLeft = (pinHandle.offsetLeft - shift);

      if (shiftLeft < 0) {
        shiftLeft = 0;
      } else if (shiftLeft > saturationLine.clientWidth) {
        shiftLeft = saturationLine.clientWidth;
      }

      pinHandle.style.left = shiftLeft + 'px';
      saturationLine.style.width = shiftLeft + 'px';

      effectLevelValue.value = Math.round(shiftLeft / (saturationLine.clientWidth / MAX_PERСENT));
    };

    var onMouseUp = function (Upevt) {
      Upevt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseUp', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseUp', onMouseUp);
  });

})();
