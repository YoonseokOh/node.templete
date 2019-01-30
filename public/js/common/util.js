window.js = window.js || {};
window.js.util = window.js.util || {};
window.js.util = (function () {
  var debug = false;

  function getApiCall(url, callback, errorCallback) {
    $.ajax({
      type: 'GET',
      url: url,
      success: function (result) {
        if (debug) {
          console.log('getApiCall success');
          console.log(result);
        }
        if (result && result.status) {
          callback(result.data);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        if (debug) {
          console.log('getApiCall error');
          console.log(jqXHR);
        }

        if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
          $('.loading').removeClass('loading');
          $('body').trigger('openpopup', [jqXHR.responseJSON.message]);
        }
        if (errorCallback) {
          errorCallback();
        }
      }
    });
  }

  function postApiCall(option, callback) {
    var base = {
      type: 'POST',
      dataType: 'json',
      cache: false,
      beforeSend: function(){
        // $('body').trigger('openspinner');
      },
      complete: function(){
        // $('loading').removeClass('loading');
        // $('body').trigger('closespinner');
      },
      success: function (json) {
        callback(json);
      }
    };

    $.ajax($.extend({}, base, option)).fail(function (jqXHR, textStatus, errorThrown) {
      if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
        $('body').trigger('openpopup', [(jqXHR.responseJSON.code ? (jqXHR.responseJSON.code + ' - ') : '') + jqXHR.responseJSON.message]);
      }
    });
  }

  function btnLoadingSpinner(btn, bool) {
    if (bool) {
      btn.addClass('loading');
    } else {
      btn.removeClass('loading');
    }
  }

  function setBtnValidation(input, btnSubmit) {
    input.on('keyup', function (e) {
      var $form = $(e.target).closest('form');
      var $list = $form.find('.valid');
      var $btnSubmit = btnSubmit || $form.find('.btn-round') || $form.find('.btn');

      if (checkInput($list)) {
        $btnSubmit.removeClass('disabled');
      } else {
        $btnSubmit.addClass('disabled');
      }
    });
  }

  function checkRecaptcha(recaptcha) {
    if(recaptcha && !grecaptcha.getResponse()){
      alert('Please check spam protection.');
      return false;
    }
    return true;
  }

  function saveCookie(key, value) {
    if (key && value) {
      document.cookie = key + '=' + value + ';path=/;';
    }
  }

  function getCookie(name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');

    // ??
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }

  return {
    getApiCall,
    postApiCall,
    isObjEmpty,
    apiRequest,
    checkInput,
    btnLoadingSpinner,
    setBtnValidation,
    checkRecaptcha,
    saveCookie,
    getCookie
  }
})();
