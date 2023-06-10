import { COLOR_VOTE, IMG_PATH, nonImage } from '../../constants/constants.js';
import addWishListHandler from './wishListType.js';

export default function movieDisplay(movies_info, userInfo) {
  const movies = movies_info.results;
  const all_cards = document.querySelector('.body-cards');
  document.querySelector('.movies-total').innerHTML = `Total: ${movies_info.total_results} movies`;
  movies.forEach((movie) => {
    let checkWishtList = userInfo.wishList && userInfo.wishList.includes(String(movie.id));
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
                   <path class="circle" style="stroke: ${COLOR_VOTE(movie.vote_average)}"
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
