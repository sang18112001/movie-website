import getAPI from "../../api/api.js";
import { IMG_PATH } from "../../constants/constants.js";

export default (typeMovie) => {
   getAPI.getMovies(typeMovie).then((movie_info) => {
      const movies = movie_info.results;
      const movieContainer = document.querySelector(`.${typeMovie}`);
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
    });
}