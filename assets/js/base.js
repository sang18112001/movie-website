if (!localStorage.getItem('signAccount')) {
  localStorage.setItem('signAccount', JSON.stringify({ uid: '' }));
}
const uid = JSON.parse(localStorage.getItem('signAccount')).uid;
// Save current link
!uid && localStorage.setItem('currentPage', String(window.location.href));
// Header scroll
function scrollHeader() {
  let header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
  });
}

// Search function for header
(search_box = () =>  {
  const search = document.querySelector('.header-search input');
  search.addEventListener('input', (element) => {
    element.preventDefault();
    const box = document.querySelector('.header-search-items');
    box.innerHTML = '';
    document.addEventListener(
      'mousedown',
      (event) => !box.contains(event.target) && box.classList.add('active-hidden'),
    );
    search.addEventListener('focusin', () => search.value != '' && box.classList.remove('active-hidden'));
    search.value === '' ? box.classList.add('active-hidden') : box.classList.remove('active-hidden');
    getAPI.getSearchMovies(search.value).then((data) => showSearch(data));
  });
})();

const showSearch = (search_movie) => {
  const api_movies = search_movie.results;
  const list_movies = document.querySelector('.header-search-items');
  api_movies.length === 0
    ? (list_movies.innerHTML = `<p class="no_results">Don't have results</p>`)
    : api_movies.forEach((element) => {
        list_movies.innerHTML += `
          <li class="item">
              <a href="detailMovie.html?id=${element.id}">
                  <img src="${IMG_PATH + element.poster_path}"></img>
                  <div class="item-content">
                      <div class="item-title">${element.original_title}</div>
                      <div class="item-id">ID: ${element.id}</div>
                  </div>
              </a>
          </li>
      `;
      });
}

// Modify account
getAPI.getInfoUser(uid).then((data) => {
  const log_account = document.querySelector('.account-log');
  const logged_account = document.querySelector('.account-logged');
  if (uid === '') {
    log_account.classList.remove('active-hidden');
    logged_account.classList.add('active-hidden');
  } else {
    log_account.classList.add('active-hidden');
    logged_account.classList.remove('active-hidden');
    document.querySelectorAll('.account_name').forEach((nameUser) => (nameUser.innerHTML = data.name));
    document.querySelector('.account_avt').src = data.avatar || nonAvatar;
    document.querySelector('.account-logged img').src = data.avatar || nonAvatar;
    document.querySelectorAll('.account_avt').forEach((avtImg) => {
      avtImg.src = data.avatar || nonAvatar;
    });
    if (document.querySelector('.comment-me img'))
      document.querySelector('.comment-me img').src = data.avatar || nonAvatar;
  }
});

// Sign out account
(function () {
  const signOutBtns = document.querySelectorAll('.log-out');
  signOutBtns.forEach(function (signOutBtn) {
    signOutBtn.addEventListener('click', () => localStorage.setItem('signAccount', JSON.stringify({ uid: '' })));
  });
})();

// Header responsive
(function () {
  const header = document.querySelector('header');
  const show_menu = document.querySelector('#menu-icon');
  const searchBtn = document.querySelector('.icon-search');
  const log_account = document.querySelector('.account-log-button');
  const show_log_account = document.querySelector('.account-log-logo');
  const logged_account = document.querySelector('.account-logged-button');
  const show_logged_account = document.querySelector('.account-logged-logo');
  // Menu
  show_menu.addEventListener('click', () => {
    header.classList.toggle('active-header-menu');
    header.classList.remove('active-header-search');
    log_account.classList.remove('active-block');
    logged_account.classList.remove('active-block');
  });
  // Search
  searchBtn.addEventListener('click', () => {
    header.classList.remove('active-header-menu');
    header.classList.toggle('active-header-search');
    log_account.classList.remove('active-block');
    logged_account.classList.remove('active-block');
  });
  // Account
  show_log_account.addEventListener('click', () => {
    log_account.classList.toggle('active-block');
    header.classList.remove('active-header-menu');
    header.classList.remove('active-header-search');
  });
  show_logged_account.addEventListener('click', () => {
    logged_account.classList.toggle('active-block');
    header.classList.remove('active-header-menu');
    header.classList.remove('active-header-search');
  });
})();
