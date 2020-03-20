'use strict';

(function () {
  var SUCCESS_CODE = 200;
  var TIME_OUT = 10000;
  var GET_URL = 'https://js.dump.academy/kekstagram/data';
  var POST_URL = 'https://js.dump.academy/kekstagram';
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var tagMain = document.querySelector('main');

  var sendRequest = function (onSuccess, onError, url, method) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, url);
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
    xhr.timeout = TIME_OUT;
    return xhr;
  };

  var errorCallback = function (errorMessage) {
    var reporteError = templateError.cloneNode(true);
    templateError.querySelector('.error__title').textContent = errorMessage;
    tagMain.appendChild(reporteError);

    var onErrorKeyDown = function (evt) {
      if (evt.key === window.utils.ESC_KEY) {
        tagMain.removeChild(reporteError);
        document.removeEventListener('keydown', onErrorKeyDown);
      }
    };

    reporteError.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('error') || evt.target.classList.contains('error__button')) {
        tagMain.removeChild(reporteError);
        document.removeEventListener('keydown', onErrorKeyDown);
      }
    });
    document.addEventListener('keydown', onErrorKeyDown);
  };

  var load = function (onSuccess) {
    var xhr = sendRequest(onSuccess, errorCallback, GET_URL, 'GET');
    xhr.send();
  };

  var upload = function (onSuccess, data) {
    var xhr = sendRequest(onSuccess, errorCallback, POST_URL, 'POST');
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload,
    onError: errorCallback
  };
})();

