import getAPI from '../../api/api.js';
import { IMG_PATH, uid } from '../../constants/constants.js';

export default (movie_id) => {
  getAPI.getInfoDetail(movie_id, '').then((movie_info) => {
    getAPI.getInfoDetail(movie_id, '/credits').then((casts_info) => {
      const movieContainer = document.querySelector('.movie-container');
      let color =
        movie_info.vote_average >= 8
          ? 'rgb(76 199 144)'
          : movie_info.vote_average >= 6
          ? 'rgb(253 255 0)'
          : movie_info.vote_average >= 4
          ? 'orange'
          : 'red';
      movieContainer.innerHTML = `
            <div class="movie-image" style="background-image: url(${IMG_PATH + movie_info.backdrop_path})"></div>
            <div class="movie-content">
                <div class="image">
                    <div class="content-img" style="background-image: url(${IMG_PATH + movie_info.poster_path})"></div>
                </div>
                <div class="detail">
                    <div class="sub-title">
                        <span class="free-icon">
                            <i class="fa-solid fa-chess-queen"></i>
                        </span>
                        <span class="free">Free .</span>
                        <span>Feature film .</span>
                        <span>${movie_info.release_date.slice(0, 4)} .</span>
                    </div>
                    <h1>${movie_info.original_title}</h1>
                    <div class="vote-genres">
                        <div class="vote-box">
                            <svg viewBox="0 0 36 36" class="circular-chart">
                                <path class="circle" style="stroke: ${color}"
                                stroke-dasharray="${Math.round(movie_info.vote_average * 10)}, 100"
                                d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                </svg>
                            <p>${movie_info.vote_average.toFixed(1)}</p>
                        </div>
                        <div class="genre-names">${movie_info.genres
                          .map(
                            (genre) =>
                              `<a href="typeOfMovies.html?type=popularity&genres=${genre.id}"><p>${genre.name}</p></a>`,
                          )
                          .join('')}</div>
                    </div>
                    <div class="main-item movie-casts">
                        <p class="title-cast">CASTS</p>
                        <div class="casts-content">
                            ${casts_info.cast
                              .slice(0, 10)
                              .map(
                                (cast) => `
                                  <div class="cast">
                                      <div class="cast-avt" style="background-image: url(${
                                        IMG_PATH + cast.profile_path
                                      })"></div>
                                      <div class="cast-name">
                                          <p class="original-name">${cast.original_name}</p>
                                      </div>
                                  </div>
                            `,
                              )
                              .join('')}
                        </div>
                    </div>
                    <a class="moveToWatching"href="${!uid ? `sign-in.html` : `watchingMovie.html?id=${movie_id}`}">
                        <button class="play-btn">
                            <i class="fa-solid fa-play"></i>
                            PLAY
                        </button>
                    </a>
                </div>
            </div>
        `;
    });
    $('.casts-content').slick({
      dots: false,
      infinite: true,
      slidesToShow: items_2,
      slidesToScroll: items_2,
      arrows: false,
      cssEase: 'linear',
    });
  });
};
