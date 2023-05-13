const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;
const NOW_PLAYING = 'https://api.themoviedb.org/3/movie/now_playing?api_key=3fd2be6f0c70a2a598f084ddfb75487c';
const POPULAR_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=`;
const TOP_RATED_API = `https://api.themoviedb.org/3/movie/top_rated?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US&page=`;
const UP_COMING_API = `https://api.themoviedb.org/3/movie/upcoming?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US&page=`;

const GENRES_API = `https://api.themoviedb.org/3/genre/movie/list?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`;
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';
const typeMovies = [`now_playing`, `popularity`, `top_rated`, `up_coming`];
const nonAvatar = `https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg`;

if (!localStorage.getItem('signAccount')) {
  localStorage.setItem('signAccount', JSON.stringify({ uid: '' }));
}
const uid = JSON.parse(localStorage.getItem('signAccount')).uid;
// Header scroll
function scrollHeader() {
  let header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
  });
}

// Creating logo button
(function changeLogoLink() {
  const web_logo = document.querySelector('.web-logo');
  web_logo.addEventListener('click', () => {
    window.location.assign(`index.html`);
  });
})();

// Menu header create
(function menuHeaderCreate() {
  const header_menu = document.querySelector('.header-menu');
  header_menu.innerHTML = `<li><a class="active-menu" href="index.html">Home</a></li>`;
  typeMovies.forEach((eachType) => {
    const menuLink = `typeOfMovies.html?type=${eachType}`;
    const menuTitle = eachType.split('_').join(' ');
    header_menu.innerHTML += `<li><a href="${menuLink}">${menuTitle}</a></li>`;
  });
})();

// Search function for header
(function search_box() {
  const search = document.querySelector('.header-search input');
  search.addEventListener('input', (element) => {
    element.preventDefault();
    const box = document.querySelector('.header-search-items');
    box.innerHTML = '';
    // Add event listener to the document object for mousedown event
    document.addEventListener('mousedown', function (event) {
      // Check if the target of the event is outside of the box
      if (!box.contains(event.target)) {
        // If it is, hide the box
        box.style.display = 'none';
      }
    });
    // Add event listener to the input element for focusin event
    search.addEventListener('focusin', function (event) {
      if (search.value != '') {
        box.style.display = 'block';
      }
    });
    box.style.display = search.value === '' ? 'none' : 'block';
    const new_api = SEARCH_API + search.value;
    searchMovie(new_api);
  });
})();

async function searchMovie(API) {
  const res = await fetch(API);
  const search_movie = await res.json();
  // Show search movie
  function showSearch(search_movie) {
    const api_movies = search_movie.results;
    const list_movies = document.querySelector('.header-search-items');
    if (api_movies.length === 0) {
      list_movies.innerHTML += `
                  <p class="no_results">Don't have results</p>
              `;
    } else {
      api_movies.forEach((element) => {
        const nameOfMovie =
          element.original_title.length > 30 ? element.original_title.slice(0, 30) + '...' : element.original_title;
        const detailLink = !uid ? `sign-in.html` : `detailMovie.html?id=${element.id}`;
        list_movies.innerHTML += `
                    <li class="item">
                        <a href=${detailLink}>
                            <img src="${IMG_PATH + element.poster_path}"></img>
                            <div class="item-content">
                                <div class="item-title">${nameOfMovie}</div>
                                <div class="item-id">ID: ${element.id}</div>
                            </div>
                        </a>
                    </li>
                `;
      });
    }
  }
  showSearch(search_movie);
}

// Modify account
(async function your_account_modify() {
  const res = await fetch(
    `https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app/user/${uid}.json`,
  );
  const data = await res.json();
  const log_account = document.querySelector('.account-log');
  const logged_account = document.querySelector('.account-logged');
  if (uid === '') {
    log_account.classList.remove('active-hidden');
    logged_account.classList.add('active-hidden');
  } else {
    log_account.classList.add('active-hidden');
    logged_account.classList.remove('active-hidden');
    document.querySelector('.account_name').innerHTML = data.name;
    document.querySelector('.account-logged img').src = data.avatar || nonAvatar;
    document.querySelector('.comment-me img').src = data.avatar || nonAvatar
  }
})();

// Sign out account
(function () {
  const signOutBtn = document.querySelector('.log-out');
  signOutBtn.addEventListener('click', () => {
    localStorage.setItem('signAccount', JSON.stringify({ uid: '' }));
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
