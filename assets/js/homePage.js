import { getAPI, IMG_PATH } from "./API.js"; 
import { scrollHeader } from "./base.js";
// Header scroll
scrollHeader();

/**
==============================================================Body function====================================================================
 */

// Get components
getAPI.getMovies('top_rated').then((data) => {
  const movies = data.results;
  const all_movies = document.querySelector(`.top-rated-body`);
  for (let i = 0; i < 8; i++) {
    all_movies.innerHTML += `
            <div class="col-6 col-lg-3 col-md-4 test_rated">
                <div class="top-rated-main">
                    <div class="top-rated_box">
                        <div class="top-rated-num">${i + 1}</div>
                        <div class="top-rated-img">
                            <a href="detailMovie.html?id=${movies[i].id}">
                                <img src="${IMG_PATH + movies[i].poster_path}" alt="">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }
});

getAPI.getMovies('now_playing').then((data) => {
  const movies = data.results;
  const all_movies = document.querySelector(`.box-nowPlaying`);
  for (let i = 0; i < 12; i++) {
    all_movies.innerHTML += `
            <a href="detailMovie.html?id=${movies[i].id}">
                <div class="box" style="background-image: url('${IMG_PATH + movies[i].backdrop_path}')">
                  <div class="type-movie-title">${movies[i].original_title}</div>
                </div>
            </a>
        `;
  }
});

getAPI.getMovies('up_coming').then((data) => {
  const movies = data.results;
  const all_movies = document.querySelector(`.box-upComing`);
  for (let i = 0; i < 12; i++) {
    all_movies.innerHTML += `
            <a href="detailMovie.html?id=${movies[i].id}">
                <div class="box" style="background-image: url('${IMG_PATH + movies[i].backdrop_path}')">
                <div class="type-movie-title">${movies[i].original_title}</div>
                </div>
            </a>
        `;
  }
});

getAPI.getMyGenres().then((genres_info) => {
  const genresContainer = document.querySelector('.genres-type .row');
  genres_info.forEach((genre) => {
    genresContainer.innerHTML += `
            <a href="typeOfMovies.html?type=popularity&genres=${genre.id}"  class="col-6 col-md-4 col-lg-3 col-xl-2">
              <div class="genre-box">
                  <img src="${genre.genre_path}" alt="">
                  <p>${genre.genre_name}</p>
              </div>
            </a>
        `;
  });
});

getAPI.getMovies('popularity').then((data) => {
  show_banner(data.results);
  show_movie_slider(data.results);
});

function show_banner(movies) {
  const owl_carousel = document.querySelector('.movie-slider');
  movies.forEach((movie) => {
    owl_carousel.innerHTML += `
            <div class="slider-item">
                <img class="border-cards image-banner opacity-image" src="${IMG_PATH + movie.poster_path}" alt="">
            </div>
        `;
  });
  $('.owl-carousel.movie-slider').owlCarousel({
    margin: 15,
    responsive: {
      300: {
        items: 2,
      },
      450: {
        items: 3,
      },
      500: {
        items: 4,
      },
      700: {
        items: 5,
      },
      900: {
        items: 6,
      },
      1000: {
        items: 7,
      },
      1100: {
        items: 8,
      },
      1200: {
        items: 9,
      },
    },
  });
}

function show_movie_slider(movies) {
  const needed_movies = document.querySelector('.main-movies');
  movies.forEach((movie, index) => {
    let color =
      movie.vote_average >= 8
        ? 'rgb(76 199 144)'
        : movie.vote_average >= 6
        ? 'rgb(253 255 0)'
        : movie.vote_average >= 4
        ? 'orange'
        : 'red';
    needed_movies.innerHTML += `
        <div class="movie movie-${index}">
            <div class="movie-main">
                <h2 class="movie-title">${movie.original_title}</h2>
                <div class="movie-year-vote">
                    <div class="vote-box">
                      <svg viewBox="0 0 36 36" class="circular-chart" >
                        <path class="circle" style="stroke: ${color}"
                        stroke-dasharray="${Math.round(movie.vote_average * 10)}, 100"
                        d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <p>${movie.vote_average}</p>
                    </div>
                    <span class="movie-year">${movie.release_date}</span>
                </div>
                <div class="movie-detail">
                    <a href="detailMovie.html?id=${movie.id}">
                        <button class="btn">
                            <i class="fa-solid fa-caret-right"></i>
                            <span>WATCH NOW</span>
                        </button>
                    </a>
                </div>
            </div>
        </div>
        `;
  });
  const background_movies = document.querySelector(`.main-movies img`);
  background_movies.src = `${IMG_PATH + movies[0].backdrop_path}`;
  const all_image_banner = document.querySelectorAll('.image-banner');
  all_image_banner[0].classList.remove('opacity-image');
  const nth_movies = document.querySelectorAll(`.movie`);
  nth_movies[0].classList.add('active');
  all_image_banner.forEach((img, index) => {
    img.addEventListener('click', () => {
      background_movies.src = `${IMG_PATH + movies[index].backdrop_path}`;
      all_image_banner.forEach((banner_element) => {
        banner_element.classList.add('opacity-image');
      });
      img.classList.remove('opacity-image');
      nth_movies.forEach((movie_element) => {
        movie_element.classList.remove('active');
      });
      document.querySelector(`.movie-${index}`).classList.add('active');
    });
  });
}
