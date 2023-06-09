import getAPI from '../api/api.js';
import { IMG_PATH, nonImage, uid } from '../constants/constants.js';
import filterFunction from '../components/typeMovies/filter.js';
import paginationFunction from '../components/typeMovies/pagination.js';
import addWishListHandler from '../components/typeMovies/wishListType.js';
import { changeTitleMovie, navBarUnderline } from '../utils/utils.js';
const urlParams = new URLSearchParams(window.location.search);
const getQuery = Object.fromEntries(urlParams.entries());

const type = getQuery.type;
const filterObj = {
  genres: getQuery.genres || '',
  languages: getQuery.languages || '',
  years: getQuery.years || '',
};
const currentPage = Number(getQuery.page) || 1;

const loaderDiv = document.querySelector('.loadingAPI');

// Change title
changeTitleMovie(type)
// Header navbar underline
navBarUnderline(type)

// Show movies
function show_movies(movies_info, userInfo) {
  const movies = movies_info.results;
  const all_cards = document.querySelector('.body-cards');
  document.querySelector('.movies-total').innerHTML = `Total: ${movies_info.total_results} movies`;
  movies.forEach((movie) => {
    let checkWishtList = userInfo.wishList && userInfo.wishList.includes(String(movie.id));
    let color =
      movie.vote_average >= 8
        ? 'rgb(76 199 144)'
        : movie.vote_average >= 6
        ? 'rgb(253 255 0)'
        : movie.vote_average >= 4
        ? 'orange'
        : 'red';
    all_cards.innerHTML += `
      <div class="each-col col-6 col-md-4 col-xl-3">
          <div class="body-card" style="background-image: url(${IMG_PATH + movie.poster_path || nonImage})">
            <a href="detailMovie.html?id=${movie.id}">
              <button class="card-play">
                <i class="fa-solid fa-play"></i>
              </button>
            </a>
            <i id="${movie.id}" class="addWishList fa-regular fa-bookmark ${
      checkWishtList ? 'active-wishList' : ''
    }"></i>
            <div class="card-shadow"></div>
            <div class="card-content">
              <div class="vote-box">
                <svg viewBox="0 0 36 36" class="circular-chart">
                  <path class="circle" style="stroke: ${color}"
                  stroke-dasharray="${Math.round(movie.vote_average * 10)}, 100"
                  d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <p>${movie.vote_average}</p>
              </div>
              <div class="content-year">${movie.release_date.slice(0, 4)}</div>
              <div class="content-name">${movie.title}</div>
            </div>
          </div>
      </div>
    `;
  });
  movies_info.results.length === 0
    ? document.body.classList.add('resultsNotExist')
    : document.body.classList.remove('resultsNotExist');
  const wishListBtns = document.querySelectorAll('.addWishList');
  addWishListHandler(wishListBtns, userInfo);
}
getAPI.getMovies(type, currentPage, filterObj.genres, filterObj.languages, filterObj.years).then((movies) => {
  loaderDiv.classList.remove('active-hidden');
  getAPI.getInfoUser(uid).then((userInfo) => {
    show_movies(movies, userInfo);
    loaderDiv.classList.add('active-hidden');
  });
});

filterFunction(filterObj, getQuery, type);
paginationFunction(filterObj, type, currentPage);
