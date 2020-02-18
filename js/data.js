'use strict';
var sampleText = ['В целом всё неплохо. Но не всё.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.'];
var names = ['Андрей', 'Виталий', 'Кирилл', 'Вячеслав', 'Надежда', 'Аня'];
var maxComments = 5;
var avatarMinNumber = 1;
var avatarMaxNumber = 6;
var TOTAL_OBJECTS = 25;
var minLikes = 15;
var maxLikes = 200;


window.data = {
  names: names,
  sampleText: sampleText,
  maxComments: maxComments,
  avatarMinNumber: avatarMinNumber,
  avatarMaxNumber: avatarMaxNumber,
  minLikes: minLikes,
  maxLikes: maxLikes,
  TOTAL_OBJECTS: TOTAL_OBJECTS,

  getRandomNumber: function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },

  getRandomElement: function (array) {
    return array[window.data.getRandomNumber(0, array.length)];
  },
  generateFullScreenComment: function () {
    var container = document.createElement('li');
    container.classList.add('social__comment');

    var commentImg = document.createElement('img');
    commentImg.classList.add('social__picture');
    commentImg.style.width = '35px';
    commentImg.style.height = '35px';
    commentImg.src = 'img/avatar-' + window.getRandomNumber(avatarMinNumber, avatarMaxNumber) + '.svg';

    var text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = window.getRandomNumber(sampleText);

    container.appendChild(commentImg);
    container.appendChild(text);
    return container;
  }
};
