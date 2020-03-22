'use strict';
(function () {
  var MAX_HASHTAGS = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var imgUploadForm = document.querySelector('.img-upload__form');
  var DEFAULT_BORDER = 'none';
  var ERROR_BORDER = '3px solid red';

  var textHashtags = document.querySelector('.text__hashtags');
  textHashtags.addEventListener('change', function () {
    var inputText = textHashtags.value.toLowerCase().trim();
    var inputsArray = inputText.split(/\s+/);
    textHashtags.setCustomValidity('');

    if (!inputText || inputsArray[0] === '') {
      textHashtags.style.border = DEFAULT_BORDER;
      return;
    }

    var isStartNoHashTag = inputsArray.some(function (item) {
      return item[0] !== '#';
    });

    if (isStartNoHashTag) {
      textHashtags.setCustomValidity('хэш-тег должен начинаться с символа #');
    }

    var isHashTagOnly = inputsArray.some(function (item) {
      return item === '#';
    });

    if (isHashTagOnly) {
      textHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки ');
    }

    var isSplitSpaceHashtag = inputsArray.some(function (item) {
      return item.indexOf('#', 1) >= 1;
    });

    if (isSplitSpaceHashtag) {
      textHashtags.setCustomValidity('хэш-теги разделяются пробелами');
    }

    var isRepeatHashTag = inputsArray.some(function (item, i, array) {
      return array.indexOf(item, i + 1) >= i + 1;
    });

    if (isRepeatHashTag) {
      textHashtags.setCustomValidity('один и тот же хеш-тег не может быть использован дважды');
    }


    var isLongHashTag = inputsArray.some(function (item) {
      return item.length > MAX_HASHTAG_LENGTH;
    });

    if (isLongHashTag) {
      textHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решетку');
    }

    if (inputsArray.length > MAX_HASHTAGS) {
      textHashtags.setCustomValidity('нельзя указать больше 5 хеш-тегов');
    }

    var hasSpecialCharacter = inputsArray.some(function (item) {
      return item.match(/#.*?[^a-zа-яё0-9]/i);
    });

    if (hasSpecialCharacter) {
      textHashtags.setCustomValidity('Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д. ');
    }

    textHashtags.style.border = imgUploadForm.checkValidity() ? DEFAULT_BORDER : ERROR_BORDER;
  });
})();
