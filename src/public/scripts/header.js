document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.js-header');
  const body = document.querySelector('body');
  let SCROLL_Y = 0;

  if (!header) return;

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

  function scrollHandler(e) {
    if (SCROLL_Y > window.scrollY) { // Scroll up
      if (window.scrollY === 0) {
        console.log('dang len')
      }
    } else { // Scroll down
      const heightHeader = header.offsetHeight;
      if (window.scrollY > heightHeader) {
        console.log('dang xuong')
      }
    }

    SCROLL_Y = window.scrollY;
  }

  for (let item of itemDropdowns) {
    item.onclick = function () {
      this.classList.contains('open') ? this.classList.remove('open') :
        this.classList.add('open');
    }
  }

  hamburgerIcon.onclick = function(e) {
    this.classList.contains('show') ? handleHideNavigation() : handleShowNavigation();
  };

  window.addEventListener('click', function(e) {
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

  window.addEventListener('scroll', scrollHandler);

  window.addEventListener('resize', function(e) {
    handleHideNavigation();
  });
});