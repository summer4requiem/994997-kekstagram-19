'use strict';
(function () {
  // модуль, который работает с формой редактирования изображения.
  var currentFilter = '';
  var imgUploadForm = document.querySelector('.img-upload__form');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectValue = document.querySelector('.effect-level__value');
  var effecIntensity = document.querySelector('.effect-level__depth');
  var effectsRadio = document.querySelectorAll('.effects__radio');
  var imageUpload = document.querySelector('.img-upload');
  var effectLevel = imageUpload.querySelector('.effect-level');
  var imgUploadPreview = imageUpload.querySelector('.img-upload__preview');
  var imgUploadCancel = document.querySelector('.img-upload__cancel');
  var uploadFile = document.querySelector('.img-upload__input');
  var submitBtn = imgUploadForm.querySelector('.img-upload__submit');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadOverlay = imageUpload.querySelector('.img-upload__overlay');
  var bodyDocument = document.querySelector('body');
  var textDescription = imageUpload.querySelector('.text__description');

  submitBtn.addEventListener('submit', function (evt, onSuccess) {
    evt.preventDefault();
    window.backend.upload(onSuccess, new FormData(imgUploadForm));
  });


  textDescription.addEventListener('invalid', function () {
    if (textDescription.validity.tooLong) {
      textDescription.setCustomValidity('Максимальная длина комментария');
    } else {
      textDescription.setCustomValidity('');
    }
  });

  imgUploadCancel.addEventListener('click', function () {
    imgUploadOverlay.classList.add('hidden');
    bodyDocument.classList.remove('modal-open');
  });

  uploadFile.addEventListener('click', function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onUploadEscKeyDown);
  });

  var onUploadEscKeyDown = function (evt) {
    if (evt.key === window.utils.ESC_KEY && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
      imgUploadOverlay.classList.add('hidden');
      bodyDocument.classList.remove('modal-open');
      document.removeEventListener('keydown', onUploadEscKeyDown);
    }
  };

  var onChangeEffectRadio = function (evt) {
    if (currentFilter !== '') {
      imgUploadPreview.classList.remove(currentFilter);
    }
    currentFilter = evt.target.value !== 'none' ? 'effects__preview--' + evt.target.value : '';

    if (currentFilter === '') {
      effectLevel.classList.add('hidden');
    } else {
      imgUploadPreview.classList.add(currentFilter);
      effectLevel.classList.remove('hidden');
    }

    effectLevelPin.style.left = '100%';
    effecIntensity.style.width = '100%';
    imgUploadPreview.style.filter = '';
    effectValue.value = 100;
  };

  effectLevel.classList.add('hidden');
  // события на эффекты
  effectsRadio.forEach(function (element) {
    element.addEventListener('change', onChangeEffectRadio);
  });

  window.currentFilter = function () {
    return currentFilter;
  };
})();
