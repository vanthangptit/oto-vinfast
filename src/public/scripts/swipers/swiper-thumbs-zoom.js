document.addEventListener('DOMContentLoaded', function () {
  const sliderThumbnail = new Swiper('.slider-thumbnail', {
    slidesPerView: 4,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    spaceBetween: 10,
  });

  const slider = new Swiper('.slider', {
    slidesPerView: 1,
    spaceBetween: 10,
    direction: 'horizontal',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: sliderThumbnail
    },
    zoom: {
      maxRatio: 5,
    },
  });
});

