'use strict';
var currentFilter = '';
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectValue = document.querySelector('.effect-level__value');
var effecIntensity = document.querySelector('.effect-level__depth');
var effectsRadio = document.querySelectorAll('.effects__radio');
var imageUpload = document.querySelector('.img-upload');
var effectLevel = imageUpload.querySelector('.effect-level');
var imgUploadPreview = imageUpload.querySelector('.img-upload__preview');

// модуль, который работает с формой редактирования изображения.
var changeEffectRadio = function (evt) {
  if (currentFilter !== '') {
    imgUploadPreview.classList.remove(currentFilter);
  }

  currentFilter = evt.target.value !== 'none' ? 'effects__preview--' + evt.target.value : '';

  if (currentFilter === '') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }

  imgUploadPreview.classList.add(currentFilter);
  effectLevelPin.style.left = '100%';
  effecIntensity.style.width = '100%';
  imgUploadPreview.style.filter = '';
  effectValue.value = 100;
};

effectLevel.classList.add('hidden');

// события на эффекты
effectsRadio.forEach(function (element) {
  element.addEventListener('change', changeEffectRadio);
});
