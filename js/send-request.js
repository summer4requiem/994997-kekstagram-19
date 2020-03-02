'use strict';

(function () {
  var SUCCESS_CODE = 200;
  var URL = 'https://js.dump.academy/kekstagram/8data';

  window.sendRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + '' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за' + xhr.timeout + 'мс');
    });

    xhr.timeout = 1000;
    xhr.send();
  };
})();
