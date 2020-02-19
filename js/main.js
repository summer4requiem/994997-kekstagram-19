'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var fullScreenPhoto = document.querySelector('.big-picture');
  var bodyDocument = document.body;
  var imageUpload = document.querySelector('.img-upload');
  var fullScreenPreview = document.querySelector('.big-picture__preview');
  var bigPictureCancel = fullScreenPreview.querySelector('.big-picture__cancel');
  var imgUploadCancel = document.querySelector('.img-upload__cancel');
  var uploadFile = document.querySelector('.img-upload__input');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadOverlay = imageUpload.querySelector('.img-upload__overlay');
  var textDescription = imageUpload.querySelector('.text__description');


  textDescription.addEventListener('invalid', function () {
    if (textDescription.validity.tooLong) {
      textDescription.setCustomValidity('Максимальная длина комментария');
    } else {
      textDescription.setCustomValidity('');
    }
  });

  bigPictureCancel.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY) {
      fullScreenPreview.classList.add('hidden');
      fullScreenPhoto.classList.remove('overlay');
      bodyDocument.classList.remove('modal-open');
    }
  });

  var onUploadEscKeyDown = function (evt) {
    if (evt.key === ESC_KEY && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
      imgUploadOverlay.classList.add('hidden');
      bodyDocument.classList.remove('modal-open');
      document.removeEventListener('keydown', onUploadEscKeyDown);
    }
  };

  imgUploadCancel.addEventListener('click', function () {
    imgUploadOverlay.classList.add('hidden');
    bodyDocument.classList.remove('modal-open');
  });


  uploadFile.addEventListener('click', function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onUploadEscKeyDown);
  });


  bigPictureCancel.addEventListener('click', function () {
    bodyDocument.classList.remove('modal-open');
    fullScreenPhoto.classList.add('hidden');
  });
})();
