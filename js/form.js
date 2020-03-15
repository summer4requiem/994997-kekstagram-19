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
  var tagMain = document.querySelector('main');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var textHashtags = document.querySelector('.text__hashtags');
  var defaultFilter = document.querySelector('#effect-none');
  var scaleValue = imageUpload.querySelector('.scale__control--value');


  var onCloseEditor = function () {
    imgUploadOverlay.classList.add('hidden');
    imgUploadPreview.removeAttribute('class');
    imgUploadPreview.removeAttribute('style');
    effectLevelPin.style.left = '20%';
    effecIntensity.style.width = '20%';
    textDescription.value = '';
    textHashtags.value = '';
    defaultFilter.checked = true;
    scaleValue.value = '100%';
  };

  submitBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.backend.upload(onSuccess, new FormData(imgUploadForm));
    onCloseEditor();
  });

  var onSuccess = function () {
    var reportSuccess = templateSuccess.cloneNode(true);
    tagMain.appendChild(reportSuccess);

    var onSuccessKeyDown = function (evt) {
      if (evt.key === window.utils.ESC_KEY) {
        tagMain.removeChild(reportSuccess);
        document.removeEventListener('keydown', onSuccessKeyDown);
      }
    };

    reportSuccess.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('success') || evt.target.classList.contains('success__button')) {
        tagMain.removeChild(reportSuccess);
        document.removeEventListener('keydown', onSuccessKeyDown);
      }
    });
    document.removeEventListener('keydown', onSuccessKeyDown);
  };


  textDescription.addEventListener('invalid', function () {
    if (textDescription.validity.tooLong) {
      textDescription.setCustomValidity('Максимальная длина комментария');
    } else {
      textDescription.setCustomValidity('');
    }
  });

  imgUploadCancel.addEventListener('click', onCloseEditor);

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
  effectsRadio.forEach(function (element) {
    element.addEventListener('change', onChangeEffectRadio);
  });

  window.currentFilter = function () {
    return currentFilter;
  };
})();
