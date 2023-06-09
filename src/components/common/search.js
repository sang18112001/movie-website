import getAPI from '../../api/api.js';
import { IMG_PATH } from '../../constants/constants.js';
const searchExists = (movieInfo) => {
  return `
    <li class="item">
      <a href="detailMovie.html?id=${movieInfo.id}">
        <img src="${IMG_PATH + movieInfo.poster_path}"></img>
        <div class="item-content">
            <div class="item-title">${movieInfo.original_title}</div>
            <div class="item-id">ID: ${movieInfo.id}</div>
        </div>
      </a>
    </li>
  `;
};

const searchNotExists = () => {
  return `
    <div class="existBox">
      <img src="./assets/image/noResults.png"></img>
      <p class="no_results">Don't have results</p>
    </div>
  `;
};

const searchBox = () => {
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
};

const showSearch = (search_movie) => {
  const api_movies = search_movie.results;
  const list_movies = document.querySelector('.header-search-items');
  list_movies.innerHTML =
    api_movies.length === 0 ? searchNotExists() : api_movies.map((movieInfo) => searchExists(movieInfo)).join('');
};

export default searchBox;
