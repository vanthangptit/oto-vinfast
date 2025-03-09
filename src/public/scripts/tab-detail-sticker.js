document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.js-header');
  const tabDetail = document.querySelector('.js-tab-detail');
  const formDetail = document.querySelector('.js-form-detail');

  if (!header || !tabDetail || !formDetail) return;
  const tabDetailSticker = tabDetail.querySelector('.tab-detail-sticker');
  const formDetailSticker = formDetail.querySelector('.form-detail-sticker');
  const fixedHeaderElement = header.querySelector('.js-fixed-header');

  function handlingFixedForTabDetail(navContainHeight) {
    if (!tabDetailSticker) return;
    if (window.scrollY <= tabDetail.offsetTop - navContainHeight) {
      tabDetailSticker.classList.remove('is-fixed');
      tabDetailSticker.style.top = '0px';
    } else {
      if (tabDetailSticker.classList.contains('is-fixed')) return;
      tabDetailSticker.style.top = `${navContainHeight}px`;
      tabDetailSticker.classList.add('is-fixed');
    }
  }

  function handlingFixedForFormDetail(navContainHeight, tabDetailStickerHeight) {
    if (!formDetailSticker) return;
    if (window.scrollY <= formDetail.offsetTop - navContainHeight - tabDetailStickerHeight) {
      formDetailSticker.classList.remove('is-fixed');
      formDetailSticker.style.top = '0px';
    } else {
      if (formDetailSticker.classList.contains('is-fixed')) return;
      formDetailSticker.style.cssText  = `top: ${navContainHeight + tabDetailStickerHeight}px; left: ${formDetail.offsetLeft}px`;
      formDetailSticker.classList.add('is-fixed');
    }
  }

  // Handling the fixed header
  function scrollHandler() {
    const navContainHeight = fixedHeaderElement.offsetHeight;
    const tabDetailStickerHeight = tabDetailSticker.offsetHeight;
    formDetail.style.width = `${formDetail.offsetWidth}px`;
    handlingFixedForTabDetail(navContainHeight);
    handlingFixedForFormDetail(navContainHeight, tabDetailStickerHeight);
  }

  window.addEventListener('scroll', scrollHandler);

  window.addEventListener('resize', function(e) {
    const navContainHeight = fixedHeaderElement.offsetHeight;
    header.style.height = `${navContainHeight}px`;
  });

  scrollHandler();
});