// Body function
const urlParams = new URLSearchParams(window.location.search);
const needed_id = urlParams.get('id');
const API_URL = `https://api.themoviedb.org/3/movie/${needed_id}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`;
const ALL_IMAGES = `https://api.themoviedb.org/3/movie/${needed_id}/images?api_key=3fd2be6f0c70a2a598f084ddfb75487c`;
const ALL_CAST = `https://api.themoviedb.org/3/movie/${needed_id}/credits?api_key=3fd2be6f0c70a2a598f084ddfb75487c`;
const RECOMMENDATION = `https://api.themoviedb.org/3/movie/${needed_id}/recommendations?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US&page=1`;
const COMMENTS = `https://api.themoviedb.org/3/movie/${needed_id}/reviews?api_key=3fd2be6f0c70a2a598f084ddfb75487c`;
const personalAPI = `https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app`;
scrollHeader();
// Embed information-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Main information
async function mainEmbeding() {
    const movieContainer = document.querySelector('.movie-container');
    const movieAPI = await fetch(API_URL);
    const movie_info = await movieAPI.json();
    const castsAPI = await fetch(ALL_CAST);
    const casts_info = await castsAPI.json();
    const detailLink = !uid ? `watchingMovie.html` : `watchingMovie.html?uid=${uid}&id=${needed_id}`;
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
                <div class="genre-names">${genreInner}</div>
                <div class="main-item movie-casts">
                    <p class="title-cast">CASTS</p>
                    <div class="casts-content">
                        ${castInner}
                    </div>
                </div>
                <a href="${detailLink}">
                    <button>
                        <i class="fa-solid fa-play"></i>
                        PLAY
                    </button>
                </a>
            </div>
        </div>
    `;
}
mainEmbeding();

// Media
const changeMediaType = () => {
    const mediaBtn = document.querySelectorAll('.button-media');
    const subMediaBox = document.querySelectorAll('.sub-media');
    mediaBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            mediaBtn.forEach((element, index) => {
                element.classList.remove('active-media');
                subMediaBox[index].classList.remove('active-block');
            });
            btn.classList.add('active-media');
            subMediaBox[i].classList.add('active-block');
        });
    });
};
changeMediaType();

async function mediaEmbeding() {
    const mediaAPI = await fetch(ALL_IMAGES);
    const media_info = await mediaAPI.json();
    owlMediaEmbedingPosters(media_info.posters);
    owlMediaEmbedingBackdrops(media_info.backdrops);
}
mediaEmbeding();

function owlMediaEmbedingPosters(medias) {
    const numPosters = medias.length < 20 ? medias.length : 20;
    const postersOwl = document.querySelector('.posters');
    for (i = 0; i < numPosters; i++) {
        const posterOwl = `
            <img src="${IMG_PATH + medias[i].file_path}">
        `;
        postersOwl.innerHTML += posterOwl;
    }
    $('.posters').owlCarousel({
        margin: 30,
        responsive: {
            0: {
                items: 2,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 5,
            },
        },
    });
}

function owlMediaEmbedingBackdrops(medias) {
    const numBackdrops = medias.length < 20 ? medias.length : 20;
    const backdropsOwl = document.querySelector('.backdrops');
    for (i = 0; i < numBackdrops; i++) {
        const backdropOwl = `
            <img src="${IMG_PATH + medias[i].file_path}">
        `;
        backdropsOwl.innerHTML += backdropOwl;
    }
    $('.backdrops').owlCarousel({
        margin: 10,
        responsive: {
            300: {
                items: 1,
            },
            800: {
                items: 1,
            },
            1000: {
                items: 3,
            },
        },
    });
}
// Comments
APIMovieUpload(needed_id, personalAPI, COMMENTS);

// Recommendations
async function recommendations() {
    const recommnedsOwl = document.querySelector('.recommend-main');
    const recommend = await fetch(RECOMMENDATION);
    const recommend_info = await recommend.json();
    const mainRecommend = recommend_info.results;
    const recommendRandom = await fetch(POPULAR_API);
    const recommendRandom_info = await recommendRandom.json();
    const secondRecommend = recommendRandom_info.results;
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
        const newName =
            recommender[i].original_title.length > 20
                ? recommender[i].original_title.slice(0, 20) + '...'
                : recommender[i].original_title;
        const newLink = !uid ? `sign-in.html` : `detailMovie.html?uid=${uid}&id=${recommender[i].id}`;
        const recommendOwl = `
            <div class="recommend-item">
                <a href="${newLink}">
                    <img src="${IMG_PATH + recommender[i].backdrop_path}" alt="">
                </a>
                <div class="item-vote">
                  <span class=" icon fa fa-star checked"></span>
                  <span>${recommender[i].vote_average}</span>
                </div>
                <div class="item-name">
                   ${newName}
                </div>
            </div>
        `;
        recommnedsOwl.innerHTML += recommendOwl;
    }
    $(document).ready(function () {
        $('.recommend-main').owlCarousel({
            margin: 20,
            responsive: {
                0: {
                    items: 2,
                },
                600: {
                    items: 3,
                },
                800: {
                    items: 4,
                },
            },
        });
    });
}
recommendations();
