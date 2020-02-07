'use strict';
var sampleText = ['В целом всё неплохо. Но не всё.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.'];
var names = ['Андрей', 'Виталий', 'Кирилл', 'Вячеслав', 'Надежда', 'Аня'];
var TOTAL_OBJECTS = 25;
var minLikes = 15;
var maxLikes = 200;
var maxComments = 5;
var avatarMinNumber = 1;
var avatarMaxNumber = 6;
// var MAX_HASHTAGS_COUNT = 5;
// var MAX_HASHTAG_LENGTH = 20;


var similarPictures = document.querySelector('.pictures');
var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
var loaderBtn = document.querySelector('.comments-loader');
var fullScreenPhoto = document.querySelector('.big-picture');
var fullScreenPreview = document.querySelector('.big-picture__preview');
var bodyDocument = document.body;
var socialComments = document.querySelector('.social__comments');
var bigPictureCancel = fullScreenPreview.querySelector('.big-picture__cancel');
var uploadFile = document.querySelector('.img-upload__input');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadCancel = document.querySelector('.img-upload__cancel');
var effectsRadio = document.querySelectorAll('.effects__radio');
var imgUploadPreview = document.querySelector('.img-upload__preview');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectValue = document.querySelector('.effect-level__value');
var textHashtags = document.querySelector('.text__hashtags');
var effecIntensity = document.querySelector('.effect-level__depth');


textHashtags.addEventListener('input', function () {
  var hashTags = textHashtags.value.split(' ');
  for (var i = 0; i < hashTags.length; i++) {
    if (hashTags[i] === '#') {
      textHashtags.setCustomValidity('удалось');
    }
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


uploadFile.addEventListener('click', function (evt) {
  evt.preventDefault();
  uploadOverlay.classList.remove('hidden');
});


imgUploadCancel.addEventListener('click', function () {
  uploadOverlay.classList.add('hidden');
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
