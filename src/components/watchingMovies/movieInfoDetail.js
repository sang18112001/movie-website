import getAPI from "../../api/api.js";
import { IMG_PATH } from "../../constants/constants.js";

export default (idMovie) => {
   getAPI.getInfoDetail(idMovie).then((movie_info) => {
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
    
}