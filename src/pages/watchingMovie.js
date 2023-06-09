import getAPI from '../api/api.js';
import APIMovieUpload from '../components/common/comment.js';
import { IMG_PATH } from '../constants/constants.js';

const urlParams = new URLSearchParams(window.location.search);
const needed_id = urlParams.get('id');

// Get videos from Youtube following the key of each video
getAPI.getInfoDetail(needed_id, '/videos').then((data) => {
  const videos_list = data.results;
  const videoContainer = document.querySelector('.watching-video');
  videoContainer.innerHTML = `<iframe width="100%" height="500px" src="https://www.youtube.com/embed/${videos_list[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
});

// -------------------------------------------------------------Main content------------------------------------------------
getAPI.getInfoDetail(needed_id).then((movie_info) => {
  const movieContainer = document.querySelector('.watching-content');
  const arrayNumStars = [...Array(10)].map((_, index) => index);
  let innerStars = '',
    innerGenres = '';
  arrayNumStars.forEach((numStar) => {
    const innerStar =
      numStar < Math.round(movie_info.vote_average)
        ? `<i class="fa-regular fa-star star-checked"></i>`
        : `<i class="fa-regular fa-star"></i>`;
    innerStars += innerStar;
  });
  let genresList = movie_info.genres.map((genre) => `<div class="genre">${genre.name}</div>`);
  innerGenres = genresList.join('');
  movieContainer.innerHTML = `
        <div class="content-image">
            <img src="${IMG_PATH + movie_info.poster_path}" alt="">
        </div>
        <div class="content-main">
            <h4 class="content-name">${movie_info.original_title}</h4>
            <div class="content-more">
                <p class="more-date">${movie_info.release_date}</p>
                <p class="more-time">${movie_info.runtime} minutes</p>
            </div>
            <div class="content-vote">
                <div class="vote-number">${movie_info.vote_average}</div>
                <div class="vote-add">
                    <div class="add-star">
                        ${innerStars}
                    </div>
                    <p class="add-text">${movie_info.vote_count} votes</p>
                </div>
            </div>
            <div class="content-genres">${innerGenres}</div>
        </div>
    `;
  // Overview
  const overview = document.querySelector('.overview-text');
  overview.innerHTML = `${movie_info.overview}`;
});

// -------------------------------------------------------------Toprated------------------------------------------------
getAPI.getMovies('top_rated').then((movie_info) => {
  const movies = movie_info.results;
  const topratedContainer = document.querySelector('.topRated');
  subMoviesShow(movies, topratedContainer);
});
getAPI.getMovies('up_coming').then((movie_info) => {
  const movies = movie_info.results;
  const upcomingContainer = document.querySelector('.upComing');
  subMoviesShow(movies, upcomingContainer);
});

const subMoviesShow = (movies, movieContainer) => {
  for (let i = 0; i < 5; i += 1) {
    const detailLink = `detailMovie.html?id=${movies[i].id}`;
    movieContainer.innerHTML += `
        <div class="box-content">
            <a href="${detailLink}" class="content-img">
                <img src="${IMG_PATH + movies[i].poster_path}" alt="">
            </a>
            <div class="content-primary">
                <a href="${detailLink}"><h5 class="main-title">${movies[i].original_title}</h5></a>
                <div class="main-info">
                    <div class="info-vote">
                        <span class="fa-regular fa-star"></span>
                        <span>${movies[i].vote_average}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
};

// -------------------------------------------------------------Comments------------------------------------------------
APIMovieUpload(needed_id);
