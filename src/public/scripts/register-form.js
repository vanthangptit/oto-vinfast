document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.querySelector('.js-register-form');
  if (!registerForm) { return }

  const _GLOBAL = {
    urlApi: '/api/register',
    method: 'POST'
  };

  const btnSubmit = document.querySelector('.js-btn-submit');
  const messageError = document.querySelector('.message-error');

  function handleCallApiSuccess(response) {
    window.location.href = '/login'
  }

  function handleCallApiFailed(err) {
    messageError.classList.remove('hidden');
    messageError.innerHTML = err;
  }

  btnSubmit.onclick = function (e) {
    e.preventDefault();

    const firstName = document.querySelector('.js-first-name').value;
    const lastName = document.querySelector('.js-last-name').value;
    const username = document.querySelector('.js-username').value;
    const email = document.querySelector('.js-email').value;
    const password = document.querySelector('.js-password').value;
    const confirmPassword = document.querySelector('.js-confirm-password').value;

    if (!validateAccount(email)) {
      messageError.classList.remove('hidden');
      messageError.innerHTML = 'An invalid email.';
      return;
    }

    if (password !== confirmPassword) {
      messageError.classList.remove('hidden');
      messageError.innerHTML = 'Password not match';
      return;
    }

    const requestData = {
      firstName,
      lastName,
      username,
      email,
      password
    };

    if (Object.entries(requestData).length === 0) { return }

    callApi(_GLOBAL.urlApi, _GLOBAL.method, requestData, handleCallApiSuccess, handleCallApiFailed);
  };
});