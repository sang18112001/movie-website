import getAPI from "../../api/api.js";
import { IMG_PATH } from "../../constants/constants.js";

export default () => {
   getAPI.getMovies('top_rated').then((data) => {
      const movies = data.results;
      const all_movies = document.querySelector('.top-rated-body');
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
}