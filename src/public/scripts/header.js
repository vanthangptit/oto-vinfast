document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.js-header');
  const body = document.querySelector('body');
  if (!header) return;

  const informLanguage = header.querySelector('.js-inform-language');
  const hamburgerIcon = header.querySelector('.js-hamburger-icon');
  const backdrop = header.querySelector('.js-backdrop');
  const navbarNav = header.querySelector('.navbar-nav');
  const itemDropdowns = header.querySelectorAll('.js-item-dropdown');

  function handleShowNavigation() {
    hamburgerIcon.classList.add('show');
    navbarNav.classList.add('show');
    body.classList.add('hidden-scroll');
    backdrop.classList.remove('hidden');
  }

  function handleHideNavigation() {
    hamburgerIcon.classList.remove('show');
    navbarNav.classList.remove('show');
    body.classList.remove('hidden-scroll');
    backdrop.classList.add('hidden');
  }

  for (let item of itemDropdowns) {
    item.onclick = function () {
      this.classList.contains('open') ? this.classList.remove('open') :
        this.classList.add('open');
    }
  }

  informLanguage.onclick = function (e) {
    const parent = this.parentElement;
    parent.classList.contains('show') ? parent.classList.remove('show') : parent.classList.add('show');
  };

  hamburgerIcon.onclick = function(e) {
    this.classList.contains('show') ? handleHideNavigation() : handleShowNavigation();
  };

  window.addEventListener('click', function(e) {
    const langBox = informLanguage.parentElement;

    if (!langBox.contains(e.target)) {
      if (langBox.classList.contains('show')) {
        langBox.classList.remove('show');
      }
    }

    for (let item of itemDropdowns) {
      if (!item.contains(e.target)) {
        if (item.classList.contains('open')) {
          item.classList.remove('open');
        }
      }
    }

    if (backdrop.contains(e.target)) {
      handleHideNavigation();
    }
  });

  window.addEventListener('resize', function(e) {
    handleHideNavigation();
  });
});