const urlParams = new URLSearchParams(window.location.search);
const getQuery = Object.fromEntries(urlParams.entries());

const type = getQuery.type;
const filterObj = {
  genres: getQuery.genres || '',
  languages: getQuery.languages || '',
  years: getQuery.years || '',
};
const currentPage = Number(getQuery.page) || 1;

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
  const newNavbar = item.innerHTML.split(' ').join('_').toLowerCase();
  type === newNavbar && item.classList.add('active-menu');
});

// Add wishlist and remove
const addWishListHandler = (wishListBtns, userInfo) => {
  wishListBtns.forEach((wishListBtn) => {
    wishListBtn.addEventListener('click', () => {
      if (uid) {
        wishListBtn.classList.toggle('active-wishList');
        wishListBtn.classList.contains('active-wishList')
          ? (userInfo.wishList = userInfo.wishList ? [...userInfo.wishList, wishListBtn.id] : [wishListBtn.id])
          : (userInfo.wishList = userInfo.wishList.filter((item) => item !== wishListBtn.id));

        fetch(`https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app/user/${uid}.json`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInfo),
        });
      } else {
        alert('You have to sign in');
      }
    });
  });
};

// Show movies
function show_movies(movies_info, userInfo) {
  const movies = movies_info.results;
  const all_cards = document.querySelector('.body-cards');
  document.querySelector('.movies-total').innerHTML = `Total: ${movies_info.total_results} movies`;
  movies.forEach((movie) => {
    checkWishtList = userInfo.wishList && userInfo.wishList.includes(String(movie.id));
    all_cards.innerHTML += `
      <div class="each-col col-6 col-md-4 col-xl-3">
          <div class="body-card" style="background-image: url(${
            IMG_PATH + movie.poster_path ||
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png?20200912122019'
          })">
            <a href="detailMovie.html?id=${movie.id}">
              <button class="card-play">
                <i class="fa-solid fa-play"></i>
              </button>
            </a>
            <i id="${movie.id}" class="addWishList fa-solid fa-heart ${checkWishtList ? 'active-wishList' : ''}"></i>
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
      </div>
    `;
  });
  movies_info.results.length === 0
    ? document.body.classList.add('resultsNotExist')
    : document.body.classList.remove('resultsNotExist');
  const wishListBtns = document.querySelectorAll('.addWishList');
  addWishListHandler(wishListBtns, userInfo);
}

document.addEventListener('DOMContentLoaded', () => {
  window.onload = () => {
    loaderDiv.classList.remove('hidden');
    getAPI.getMovies(type, currentPage, filterObj.genres, filterObj.languages, filterObj.years).then((movies) => {
      getAPI.getInfoUser(uid).then((userInfo) => {
        show_movies(movies, userInfo);
      });
    });
    loaderDiv.classList.add('hidden');
  };
});
