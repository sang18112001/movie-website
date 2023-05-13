const urlParams = new URLSearchParams(window.location.search);
const getQuery = Object.fromEntries(urlParams.entries());

const type = getQuery.type;
const filterObj = {
  genres: getQuery.genres || '',
  languages: getQuery.languages || '',
  years: getQuery.years || '',
};
const currentPage = Number(getQuery.page) || 1;
const index_type = typeMovies.indexOf(type);
const arr_typeOfmovies = ['movie/now_playing', 'discover/movie', 'movie/top_rated', 'movie/upcoming'];
const baseAPI = `https://api.themoviedb.org/3/${arr_typeOfmovies[index_type]}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&vote_average.gte=1&vote_average.lte=8.5`;
const currentAPI =
  baseAPI +
  `&with_genres=${filterObj.genres}` +
  `&with_original_language=${filterObj.languages}` +
  `&primary_release_year=${filterObj.years}&page=${currentPage}`;
const loaderDiv = document.getElementById('loader');

// Change title
const moviesTitle = document.querySelector('.movies-title span');
const newTitle = type.split('_').join(' ').toUpperCase();
moviesTitle.innerHTML = newTitle;
document.title = newTitle;

// Header navbar underline
const navbar_list = document.querySelectorAll('.header-menu a');
navbar_list.forEach((item) => {
  item.classList.remove('active-menu');
});
navbar_list[Number(index_type) + 1].classList.add('active-menu');

// Get all movies
async function getMovies(API_URL) {
  loaderDiv.classList.remove('hidden');
  const res = await fetch(API_URL);
  const data = await res.json();
  loaderDiv.classList.add('hidden');
  const movies_info = data;
  show_movies(movies_info);
}

// Show movies
function show_movies(movies_info) {
  const movies = movies_info.results;
  const all_cards = document.querySelector('.body-cards');
  document.querySelector('.movies-total').innerHTML = `Total: ${movies_info.total_results} movies`;
  movies.forEach((movie) => {
    all_cards.innerHTML += `
      <div class="each-col col-6 col-md-4 col-xl-3">
        <a href="${!uid ? `sign-in.html` : `detailMovie.html?id=${movie.id}`}">
          <div class="body-card" style="background-image: url(${
            IMG_PATH + movie.poster_path ||
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png?20200912122019'
          })">
            <button class="card-play">
              <i class="fa-solid fa-play"></i>
            </button>
            <div class="card-shadow"></div>
            <div class="card-content">
              <div class="vote-box">
                <svg viewBox="0 0 36 36" class="circular-chart" >
                  <path class="circle"
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
        </a>
      </div>
    `;
  });
  movies_info.results.length === 0
    ? document.body.classList.add('resultsNotExist')
    : document.body.classList.remove('resultsNotExist');
}

document.addEventListener('DOMContentLoaded', () => {
  window.onload = () => {
    getMovies(currentAPI);
  };
});
