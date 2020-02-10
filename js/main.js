'use strict';
var sampleText = ['В целом всё неплохо. Но не всё.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.'];
var names = ['Андрей', 'Виталий', 'Кирилл', 'Вячеслав', 'Надежда', 'Аня'];
var TOTAL_OBJECTS = 25;
var minLikes = 15;
var maxLikes = 200;
var maxComments = 5;
var avatarMinNumber = 1;
var avatarMaxNumber = 6;
var MAX_HASHTAGS = 5;
var MAX_HASHTAG_LENGTH = 20;
var ESC_KEY = 'Escape';


var similarPictures = document.querySelector('.pictures');
var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
var loaderBtn = document.querySelector('.comments-loader');
var fullScreenPhoto = document.querySelector('.big-picture');
var fullScreenPreview = document.querySelector('.big-picture__preview');
var bodyDocument = document.body;
var socialComments = document.querySelector('.social__comments');
var bigPictureCancel = fullScreenPreview.querySelector('.cancel');
var uploadFile = document.querySelector('.img-upload__input');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var effectsRadio = document.querySelectorAll('.effects__radio');
var imgUploadPreview = document.querySelector('.img-upload__preview img');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectValue = document.querySelector('.effect-level__value');
var textHashtags = document.querySelector('.text__hashtags');
var effecIntensity = document.querySelector('.effect-level__depth');
var scaleSmoller = document.querySelector('.scale__control--smaller');
var scaleBigger = document.querySelector('.scale__control--bigger');
var scaleValue = document.querySelector('.scale__control--value');


bigPictureCancel.addEventListener('keydown', function (evt) {
  if (evt.key === ESC_KEY) {
    fullScreenPreview.classList.add('hidden');
    fullScreenPhoto.classList.remove('overlay');
  }
});

textHashtags.addEventListener('change', function () {
  var inputText = textHashtags.value.toLowerCase().trim();
  if (!inputText) {
    return;
  }

  var inputArray = inputText.split(/\s+/);

  var isStartNoHashTag = inputArray.some(function (item) {
    return item[0] !== '#';
  });
  // в любом случае срабатывает

  if (isStartNoHashTag) {
    textHashtags.setCustomValidity('хэш-тег должен начинаться с символа #');
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
});


var changeEffectRadio = function (evt) {
  imgUploadPreview.className = '';
  var currentFilter = evt.target.value !== 'none' ? 'effects__preview--' + evt.target.value : null;
  imgUploadPreview.classList.add(currentFilter);
  effectLevelPin.style.left = '100%';
  effecIntensity.style.width = '100%';
  imgUploadPreview.style.filter = '';
  effectValue.value = 100;
};

// события на эффекты
effectsRadio.forEach(function (element) {
  element.addEventListener('change', changeEffectRadio);
});


scaleSmoller.addEventListener('click', function () {
  imgUploadPreview.style.transform = 'scale(0.75)';
  scaleValue.value = 75 + '%';
});

// не понимаю какой тут должен быть скейл, выглядит ужасно при любом :/
scaleBigger.addEventListener('click', function () {
  imgUploadPreview.style.transform = 'scale(1)';
  scaleValue.value = 100 + '%';
});

uploadFile.addEventListener('click', function (evt) {
  evt.preventDefault();
  uploadOverlay.classList.remove('hidden');
});

var addVisible = function (className) {
  className.classList.remove('hidden');
};

var addClassName = function (className, assign) {
  className.classList.add(assign);
};

bigPictureCancel.addEventListener('click', function (evt) {
  evt.preventDefault();
  addClassName(fullScreenPhoto, 'hidden');
});


addVisible(fullScreenPhoto);
addClassName(bodyDocument, 'modal-open');
addClassName(loaderBtn, 'hidden');


var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};


var getRandomElement = function (array) {
  return array[getRandomNumber(0, array.length)];
};

var addComment = function () {
  return {
    avatar: 'img/avatar-' + getRandomNumber(avatarMinNumber, avatarMaxNumber) + '.svg',
    message: getRandomElement(sampleText),
    name: getRandomElement(names)
  };
};


var createComments = function () {
  var comments = [];
  for (var i = 0; i < maxComments; i++) {
    comments.push(addComment());
  }
  return comments;
};


var usersData = function () {
  var usersArray = [];
  for (var i = 0; i < TOTAL_OBJECTS; i++) {
    usersArray.push({
      url: 'photos/' + (i + avatarMinNumber) + '.jpg',
      description: 'Описание фотографии',
      likes: getRandomNumber(minLikes, maxLikes),
      comments: createComments()
    });
  }
  return usersArray;
};


var renderUser = function (user) {
  var userElement = templatePicture.cloneNode(true);
  userElement.querySelector('.picture__img').src = user.url;
  userElement.querySelector('.picture__comments').textContent = user.comments.length;
  userElement.querySelector('.picture__likes').textContent = user.likes;
  return userElement;
};


var generateFullScreenComment = function () {
  var container = document.createElement('li');
  container.classList.add('social__comment');

  var commentImg = document.createElement('img');
  commentImg.classList.add('social__picture');
  commentImg.style.width = '35px';
  commentImg.style.height = '35px';
  commentImg.src = 'img/avatar-' + getRandomNumber(avatarMinNumber, avatarMaxNumber) + '.svg';

  var text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = getRandomElement(sampleText);

  container.appendChild(commentImg);
  container.appendChild(text);

  return container;
};


var renderFullScreenPhoto = function (userData) {
  fullScreenPreview.querySelector('.big-picture__img img').src = userData.url;
  fullScreenPreview.querySelector('.big-picture__img img').alt = userData.description;
  fullScreenPreview.querySelector('.social__caption').textContent = userData.description;
  fullScreenPreview.querySelector('.likes-count').textContent = userData.likes;
  fullScreenPreview.querySelector('.comments-count').textContent = userData.comments.length;
  for (var i = 0; i < maxComments; i++) {
    socialComments.appendChild(generateFullScreenComment());
  }
};


var showFullPhoto = function (usersDta) {
  renderFullScreenPhoto(usersDta[0]);
};


var showPhotos = function () {
  var pictures = usersData();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < TOTAL_OBJECTS; i++) {
    fragment.appendChild(renderUser(pictures[i]));
  }

  similarPictures.appendChild(fragment);
  showFullPhoto(pictures);
};


showPhotos();
