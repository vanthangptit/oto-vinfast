document.addEventListener('DOMContentLoaded', function () {
  const userPage = document.querySelector('.js-user-page');
  if (!userPage) return;

  const __GLOBAL = {
    urlApi: '/api/user',
  };

  const userTable = document.querySelector('.js-user-table');
  const tableResponsive = userTable.querySelector('.js-table-responsive');
  const tbodyTable = userTable.querySelector('table tbody');
  const noResults = userTable.querySelector('.js-no-results');
  const messageError = userTable.querySelector('.js-message-error');
  const paginationContain = document.querySelector('.js-pagination-contain');

  const pageSize = parseInt(paginationContain.getAttribute('data-page-size'));
  const pagination = new Pagination(paginationContain, {});

  function handleApiSuccess(response) {
    const { pageIndex, pageSize, pageCount, users } = response.data;
    messageError.classList.add('hidden');
    if (!users || !users.length) {
      noResults.classList.remove('hidden');
      tableResponsive.classList.add('hidden');

      return;
    }

    paginationContain.setAttribute('data-page-size', pageSize);
    tableResponsive.classList.remove('hidden');
    noResults.classList.add('hidden');
    tbodyTable.innerHTML = renderTable(users);
    pagination.render({ pageIndex, pageCount });
  }

  function handleApiError(err) {
    messageError.innerHTML = err.message;
    messageError.classList.add('hidden');
  }

  function renderTable(users) {
    let listTemplate = '', i = 0;

    while (i < users.length) {
      const item = users[i];
      listTemplate += `
        <tr>
          <td>${item.id}</td>
          <td>${item.firstName}</td>
          <td>${item.lastName}</td>
          <td>${item.email}</td>
          <td>${item.username}</td>
          <td>${item.created_at}</td>
          <td>${item.updated_at}</td>
        </tr>
      `;
      i++;
    }

    return listTemplate;
  }

  paginationContain.addEventListener('pagination.valueChanged', function (event) {
    if (!event.pageIndex) return;

    const url = `${__GLOBAL.urlApi}/${event.pageIndex}/${pageSize}`;
    setTimeout(() => {
      callApi(url, 'GET', null, handleApiSuccess, handleApiError);
    }, 1000);
  });
});
