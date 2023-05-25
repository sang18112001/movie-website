// Body function
const urlParams = new URLSearchParams(window.location.search);
const needed_id = urlParams.get('id');

scrollHeader();
// Embed information-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
getAPI.getInfoDetail(needed_id, '').then((movie_info) => {
  getAPI.getInfoDetail(needed_id, '/credits').then((casts_info) => {
    const movieContainer = document.querySelector('.movie-container');
    const detailLink = !uid ? `sign-in.html` : `watchingMovie.html?id=${needed_id}`;
    let castInner = '';
    let genreInner = movie_info.genres.map((genre) => `<p>${genre.name}</p>`).join('');
    casts_info.cast.slice(0, 10).forEach((cast) => {
      castInner += `
            <div class="cast">
                <div class="cast-avt" style="background-image: url(${IMG_PATH + cast.profile_path})"></div>
                <div class="cast-name">
                    <p class="original-name">${cast.original_name}</p>
                </div>
            </div>
        `;
    });
    const votepercent = Math.round(movie_info.vote_average * 10);
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
                            <path class="circle"
                            stroke-dasharray="${votepercent}, 100"
                            d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            </svg>
                        <p>${movie_info.vote_average.toFixed(1)}</p>
                    </div>
                    <div class="genre-names">${genreInner}</div>
                </div>
                <div class="main-item movie-casts">
                    <p class="title-cast">CASTS</p>
                    <div class="casts-content">
                        ${castInner}
                    </div>
                </div>
                <a href="${detailLink}">
                    <button class="play-btn">
                        <i class="fa-solid fa-play"></i>
                        PLAY
                    </button>
                </a>
            </div>
        </div>
    `;
  });
});
// Main information

// Media
getAPI.getInfoDetail(needed_id, '/images').then((media_info) => {
  embedPerform(media_info.posters, '.posters', 2, 3, 5);
  embedPerform(media_info.backdrops, '.backdrops', 1, 2, 2);
});

function embedPerform(medias, media_class, items_0, items_1, items_2) {
  const numMedias = medias.length < 20 ? medias.length : 20;
  const mediasOwl = document.querySelector(media_class);
  for (i = 0; i < numMedias; i++) {
    mediasOwl.innerHTML += `<img src="${IMG_PATH + medias[i].file_path}">`;
  }
  $(mediasOwl).owlCarousel({
    margin: 15,
    responsive: {
      0: {
        items: items_0,
      },
      600: {
        items: items_1,
      },
      1000: {
        items: items_2,
      },
    },
  });
}

// Comments
APIMovieUpload(needed_id);

// Recommendations
getAPI.getInfoDetail(needed_id, '/recommendations').then((recommend_info) => {
  getAPI.getMovies().then((recommendRandom_info) => {
    const mainRecommend = recommend_info.results;
    const secondRecommend = recommendRandom_info.results;
    const recommendations = document.querySelector('.recommend-main');
    let numRecommends, recommender;
    if (mainRecommend.length != 0) {
      numRecommends = mainRecommend.length < 20 ? mainRecommend.length : 20;
      recommender = mainRecommend;
    } else {
      numRecommends = secondRecommend.length;
      recommender = secondRecommend;
    }
    for (i = 0; i < numRecommends; i += 1) {
      if (recommender[i].backdrop_path === null) {
        continue;
      }
      recommendations.innerHTML += `
              <div class="recommend-item">
                  <a href="detailMovie.html?id=${recommender[i].id}">
                      <img src="${IMG_PATH + recommender[i].backdrop_path}" alt="">
                  </a>
                  <div class="item-vote">
                    <span class=" icon fa fa-star checked"></span>
                    <span>${recommender[i].vote_average.toFixed(1)}</span>
                  </div>
                  <div class="item-name">
                     ${recommender[i].original_title}
                  </div>
              </div>
          `;
    }
    $('.recommend-main').owlCarousel({
      margin: 30,
      autoplay: true,
      autoplayTimeout: 2000,
      responsive: {
        0: {
          items: 2,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 4,
        },
      },
    });
  });
});
