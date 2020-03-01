'use strict';

(function () {
  var SUCCESS_CODE = 200;
  var URL = 'https://js.dump.academy/kekstagram/data';

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
    xhr.send();
  };
})();
