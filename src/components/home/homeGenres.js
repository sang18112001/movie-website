import getAPI from "../../api/api.js";

export default () => {
   getAPI.getMyGenres().then((genres_info) => {
      const genresContainer = document.querySelector('.genres-type .row');
      genres_info.forEach((genre) => {
        genresContainer.innerHTML += `
                <a href="typeOfMovies.html?type=popularity&genres=${genre.id}" class="col-6 col-md-4 col-lg-3 col-xl-2">
                  <div class="genre-box">
                      <img src="${genre.genre_path}" alt="">
                      <p>${genre.genre_name}</p>
                  </div>
                </a>
            `;
      });
    });
    
}