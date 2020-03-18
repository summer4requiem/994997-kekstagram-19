'use strict';
(function () {
  var MAX_HASHTAGS = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var imgUploadForm = document.querySelector('.img-upload__form');
  var DEFAULT_BORDER = 'none';
  var ERROR_BORDER = '3px solid red';


  var textHashtags = document.querySelector('.text__hashtags');
  textHashtags.addEventListener('input', function () {

    var inputText = textHashtags.value.toLowerCase().trim();

    var inputArray = inputText.split(/\s+/);

    textHashtags.setCustomValidity('');

    if (!inputText) {
      textHashtags.style.border = DEFAULT_BORDER;
      return;
    }

    var isStartNoHashTag = inputArray.some(function (item) {
      return item[0] !== '#';
    });

    if (isStartNoHashTag) {
      textHashtags.setCustomValidity('хэш-тег должен начинаться с символа #');
    }

    var isHashTagOnly = inputArray.some(function (item) {
      return item === '#';
    });

    if (isHashTagOnly) {
      textHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки ');
    }

    var isSplitSpaceHashtag = inputArray.some(function (item) {
      return item.indexOf('#', 1) >= 1;
    });

    if (isSplitSpaceHashtag) {
      textHashtags.setCustomValidity('хэш-теги разделяются пробелами');
    }

    var isRepeatHashTag = inputArray.some(function (item, i, array) {
      return array.indexOf(item, i + 1) >= i + 1;
    });

    if (isRepeatHashTag) {
      textHashtags.setCustomValidity('один и тот же хеш-тег не может быть использован дважды');
    }

    var isLongHashTag = inputArray.some(function (item) {
      return item.length > MAX_HASHTAG_LENGTH;
    });

    if (isLongHashTag) {
      textHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решетку');
    }

    if (inputArray.length > MAX_HASHTAGS) {
      textHashtags.setCustomValidity('нельзя указать больше 5 хеш-тегов');
    }

    textHashtags.style.border = imgUploadForm.checkValidity() ? DEFAULT_BORDER : ERROR_BORDER;

  });
})();
