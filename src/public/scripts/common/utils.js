function getUrlParameterByName(name, url) {
  if (!url) { url = window.location.href }
  name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) { return null }
  if (!results[2]) { return '' }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function callApi(url, method, data, success, failure) {
  data = data ? JSON.stringify(data) : null;
  $.ajax({
    contentType: 'application/json',
    url,
    dataType: 'json',
    data,
    method,
    async: true,
    success: function (response) {
      const { message, errorCode } = response;

      if (errorCode === 'FAILURE') {
        failure(message);

        return;
      }

      success(response);
    },
    error: function (err) {
      failure();
    },
  });
}

function formatThreeDigits(integerStr) {
  let len = integerStr.length;
  let formatted = "";

  let breakpoint = (len - 1) % 3;

  for (let i = 0; i < len; i++) {
    formatted += integerStr.charAt(i);
    if (i % 3 === breakpoint) {
      if (i < len - 1) // don't add dot for last digit
        formatted += ".";
    }
  }

  return formatted;
}
