'use strict';

(function () {
  var imageUpload = document.querySelector('.img-upload');
  var scaleSmoller = imageUpload.querySelector('.scale__control--smaller');
  var scaleBigger = imageUpload.querySelector('.scale__control--bigger');
  var scaleValue = imageUpload.querySelector('.scale__control--value');
  var imgUploadPreview = imageUpload.querySelector('.img-upload__preview');

  var Zoom = {
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

  var changeZoom = function (sign) {
    var zoom = parseInt(scaleValue.value, 10);

    zoom = zoom + sign * Zoom.STEP;

    if (zoom > Zoom.MAX) {
      zoom = Zoom.MAX;
    }

    if (zoom < Zoom.MIN) {
      zoom = Zoom.MIN;
    }

    imgUploadPreview.style.transform = 'scale(' + (zoom / 100) + ')';
    scaleValue.value = zoom + '%';
  };

  var onScaleInc = function () {
    changeZoom(1);
  };

  var onScaleDec = function () {
    changeZoom(-1);
  };

  scaleSmoller.addEventListener('click', onScaleDec);
  scaleBigger.addEventListener('click', onScaleInc);
})();
