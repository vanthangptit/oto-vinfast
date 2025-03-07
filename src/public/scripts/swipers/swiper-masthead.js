document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    direction: 'horizontal',
    loop: true,
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true
    },
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
  });
});

