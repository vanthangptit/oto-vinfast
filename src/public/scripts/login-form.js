document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('.js-login-form');
  if (!loginForm) { return }

  const _GLOBAL = {
    urlApi: '/api/login',
    method: 'POST'
  };

  const btnSubmit = document.querySelector('.js-btn-submit');
  const messageError = document.querySelector('.message-error');

  function handleCallApiSuccess(response) {
    window.location.href = response.redirectUrl;
  }

  function handleCallApiFailed(err) {
    messageError.classList.remove('hidden');
    messageError.innerHTML = err;
  }

  btnSubmit.onclick = function (e) {
    e.preventDefault();

    const account = document.querySelector('.js-account').value;
    const password = document.querySelector('.js-password').value;
    const validateAcc = validateAccount(account);

    if (!validateAcc) {
      messageError.classList.remove('hidden');
      messageError.innerHTML = 'An invalid email or username.';
      return;
    }

    const requestData = {
      account,
      password
    };

    callApi(_GLOBAL.urlApi, _GLOBAL.method, requestData, handleCallApiSuccess, handleCallApiFailed);
  };
});