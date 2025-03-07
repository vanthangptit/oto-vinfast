document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.js-header');
  const body = document.querySelector('body');
  let SCROLL_Y = 0;

  if (!header) return;

  const hamburgerIconElement = header.querySelector('.js-hamburger-icon');
  const fixedHeaderElement = header.querySelector('.js-fixed-header');
  const backdrop = header.querySelector('.js-backdrop');
  const navbarMenu = header.querySelector('.js-navbar-menu');
  const itemDropdowns = header.querySelectorAll('.js-icon-dropdown');

  function handleShowNavigation() {
    hamburgerIconElement.classList.add('show');
    navbarMenu.classList.add('show');
    body.classList.add('hidden-scroll');
    backdrop.classList.remove('hidden');
  }

  function handleHideNavigation() {
    hamburgerIconElement.classList.remove('show');
    navbarMenu.classList.remove('show');
    body.classList.remove('hidden-scroll');
    backdrop.classList.add('hidden');
  }

  // Handling the fixed header
  function scrollHandler() {
    const navContainHeight = fixedHeaderElement.offsetHeight;
    header.style.height = `${navContainHeight}px`;

    if (SCROLL_Y > window.scrollY) { // Scroll up
      if (window.scrollY === 0) {
        fixedHeaderElement.classList.remove('is-fixed');
      }
    } else { // Scroll down
      if (window.scrollY > navContainHeight + 15) {
        if (fixedHeaderElement.classList.contains('is-fixed')) return;
        fixedHeaderElement.classList.add('is-fixed');
      }
    }

    SCROLL_Y = window.scrollY;
  }

  for (let item of itemDropdowns) {
    item.onclick = function (e) {
      e.preventDefault();
      const itemDropdownElement = this.closest('.item-dropdown');
      if (!itemDropdownElement) return;
      itemDropdownElement.classList.contains('open') ? itemDropdownElement.classList.remove('open') :
        itemDropdownElement.classList.add('open');
    }
  }

  hamburgerIconElement.onclick = function(e) {
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

  scrollHandler();
});