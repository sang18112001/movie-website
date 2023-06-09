import getAPI from "../../api/api.js";
import { IMG_PATH } from "../../constants/constants.js";

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
   const all_image_banner = document.querySelectorAll('.image-banner');
   const nth_movies = document.querySelectorAll(`.movie`);
   background_movies.src = `${IMG_PATH + movies[0].backdrop_path}`;
   all_image_banner[0].classList.remove('opacity-image');
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
 

 export default () => {
   getAPI.getMovies('popularity').then((data) => {
      show_banner(data.results);
      show_movie_slider(data.results);
    });
    
 }