import getAPI from '../api/api.js';
import { uid } from '../constants/constants.js';
import filterFunction from '../components/typeMovies/filter.js';
import paginationFunction from '../components/typeMovies/pagination.js';
import { changeTitleMovie, navBarUnderline } from '../utils/utils.js';
import movieDisplay from '../components/typeMovies/movieDisplay.js';

const urlParams = new URLSearchParams(window.location.search);
const searchParams = Object.fromEntries(urlParams.entries());

const type = searchParams.type;
const filterObj = {
  genres: searchParams.genres || '',
  languages: searchParams.languages || '',
  years: searchParams.years || '',
};
const currentPage = Number(searchParams.page) || 1;

// Change title
changeTitleMovie(type);

// Header navbar underline
navBarUnderline(type);

// Show movies
getAPI.getMovies(type, currentPage, filterObj.genres, filterObj.languages, filterObj.years).then((movies) => {
  const loaderDiv = document.querySelector('.loadingAPI');
  loaderDiv.classList.remove('active-hidden');
  getAPI.getInfoUser(uid).then((userInfo) => {
    movieDisplay(movies, userInfo);
    loaderDiv.classList.add('active-hidden');
  });
});

// filter
filterFunction(filterObj, searchParams, type);

// Pagination
paginationFunction(filterObj, type, currentPage);
