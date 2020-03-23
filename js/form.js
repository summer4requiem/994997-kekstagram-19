'use strict';
(function () {
  var currentFilter = '';
  var tagMain = document.querySelector('main');
  var imageUpload = document.querySelector('.img-upload');
  var imgUploadForm = imageUpload.querySelector('.img-upload__form');
  var effectLevelPin = imageUpload.querySelector('.effect-level__pin');
  var imgUploadPreview = imageUpload.querySelector('.img-upload__preview');
  var effectValue = imageUpload.querySelector('.effect-level__value');
  var effecIntensity = imageUpload.querySelector('.effect-level__depth');
  var effectsRadio = imgUploadForm.querySelectorAll('.effects__radio');
  var effectLevel = imageUpload.querySelector('.effect-level');
  var imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
  var uploadFile = imageUpload.querySelector('#upload-file');
  var imgUploadOverlay = imageUpload.querySelector('.img-upload__overlay');
  var textDescription = imageUpload.querySelector('.text__description');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var textHashtags = imageUpload.querySelector('.text__hashtags');
  var defaultFilter = imgUploadForm.querySelector('#effect-none');
  var scaleValue = imageUpload.querySelector('.scale__control--value');


  var onEditorClose = function () {
    imgUploadPreview.style = '';
    effectLevelPin.style.left = '100%';
    effecIntensity.style.width = '100%';
    textDescription.value = '';
    textHashtags.value = '';
    textHashtags.style = '';
    defaultFilter.checked = true;
    scaleValue.value = '100%';
    imgUploadOverlay.classList.add('hidden');
    effectLevel.classList.add('hidden');
    uploadFile.value = '';
  };

  uploadFile.addEventListener('change', function () {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onUploadEscKeyDown);
  });

  imgUploadForm.addEventListener('submit', function (evt) {
    window.backend.upload(successCallback, new FormData(imgUploadForm));
    evt.preventDefault();
    imgUploadPreview.classList.remove(currentFilter);
    onEditorClose();
  });

  var successCallback = function () {
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

  imgUploadCancel.addEventListener('click', onEditorClose);


  var onUploadEscKeyDown = function (evt) {
    if (evt.key === window.utils.ESC_KEY && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
      imgUploadOverlay.classList.add('hidden');
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onUploadEscKeyDown);
    }
  };

  var onEffectRadioChange = function (evt) {
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
    element.addEventListener('change', onEffectRadioChange);
  });

  window.currentFilter = function () {
    return currentFilter;
  };
})();
