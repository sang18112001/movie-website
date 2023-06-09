import getAPI from "../../api/api.js";
import { IMG_PATH } from "../../constants/constants.js";

export default (type) => {
   getAPI.getMovies(type).then((data) => {
      const movies = data.results;
      const all_movies = document.querySelector(`.${type}`);
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
}