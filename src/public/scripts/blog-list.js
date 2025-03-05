document.addEventListener('DOMContentLoaded', function () {
  const blogList = document.querySelector('.js-blog-list');
  if (!blogList) return;

  const __GLOBAL = {
    urlApi: '/api/post',
    loading: false
  };

  const pageSize = parseInt(blogList.getAttribute('data-page-size'));
  const blogLoading = document.querySelector('.js-blog-loading');

  function handleApiSuccess(response) {
    blogLoading.classList.add('hidden');
    if (!response.data) return;

    __GLOBAL.loading = false;
    const { pageCount, pageIndex, posts } = response.data;
    blogList.setAttribute('data-page-count', pageCount);
    blogList.setAttribute('data-page-index', pageIndex);
    blogList.setAttribute('data-page-size', pageIndex);
    blogList.insertAdjacentHTML('beforeend', `${renderTemplate(posts)}`);
  }

  function getPageIndex() {
    const blogList = document.querySelector('.js-blog-list');
    return parseInt(blogList.getAttribute('data-page-index'));
  }

  function getPageCount() {
    const blogList = document.querySelector('.js-blog-list');
    return parseInt(blogList.getAttribute('data-page-count'));
  }

  function handleApiError(err) {
    blogLoading.classList.add('hidden');
  }

  function handleCallApi(pageIndex) {
    __GLOBAL.loading = true;
    blogLoading.classList.remove('hidden');
    setTimeout(() => {
      callApi(`${__GLOBAL.urlApi}/${pageIndex}/${pageSize}/BLOG`, 'GET', null, handleApiSuccess, handleApiError);
    }, 1000);
  }

  function renderTemplate(posts) {
    let listTemplate = '';

    for (let post of posts) {
      listTemplate += `
        <div class="post-preview">
          <a class="post-link js-post-link" href="/blog/detail?id=${post.id}">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-subtitle">${post.content}</p>
          </a>

          <p class="post-meta">
            Posted by <a href="#!">${post.author}</a> on ${post.created_at}
          </p>
        </div>
      `;
    }

    return listTemplate;
  }

  document.addEventListener('scroll', function(e) {
    if (getPageCount() === 1) return;
    const blogList = document.querySelector('.js-blog-list');
    const offsetToCallApi = blogList.offsetTop + blogList.offsetHeight;
    const currentOffset = window.pageYOffset + window.innerHeight;

    if (currentOffset >= offsetToCallApi) {
      const pageIndex = getPageIndex() + 1;
      if ( pageIndex > getPageCount() || __GLOBAL.loading) {
        __GLOBAL.loading = true;
        return;
      }

      handleCallApi(pageIndex);
    }
  });
});