const urlParams = new URLSearchParams(window.location.search);
const needed_id = urlParams.get('id');
const API_URL = `https://api.themoviedb.org/3/movie/${needed_id}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`;
const VIDEOS_API = `https://api.themoviedb.org/3/movie/${needed_id}/videos?api_key=3fd2be6f0c70a2a598f084ddfb75487c`;
const COMMENTS = `https://api.themoviedb.org/3/movie/${needed_id}/reviews?api_key=3fd2be6f0c70a2a598f084ddfb75487c`;
const personalAPI = `https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app`;
// Get videos from Youtube following the key of each video
(async function getVideos() {
    const response = await fetch(VIDEOS_API);
    const data = await response.json();
    const videos_list = data.results;
    const videoContainer = document.querySelector('.watching-video');
    videoContainer.innerHTML = `<iframe width="100%" height="500px" src="https://www.youtube.com/embed/${videos_list[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
})();

// -------------------------------------------------------------Main content------------------------------------------------
(async function mainContent() {
    const movieContainer = document.querySelector('.watching-content');
    const movieAPI = await fetch(API_URL);
    const movie_info = await movieAPI.json();
    console.log(movie_info);
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
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <p class="add-text">${movie_info.vote_count} votes</p>
                </div>
            </div>
            <div class="content-genres">ff</div>
        </div>
    `;
    const genresList = document.querySelector('.content-genres');
    genresList.innerHTML = movie_info.genres.map((genre) => `<div class="genre">${genre.name}</div>`);
    genresList.innerHTML = genresList.innerHTML.split(',').join('');
    const starList = document.querySelector('.add-star');
    const stars = document.querySelectorAll('.add-star i');
    const numStars = Math.round(movie_info.vote_average);
    starList.innerHTML = Array.from(stars).map((star, index) => {
        if (index < numStars) {
            return `<i class="fa-regular fa-star star-checked"></i>`;
        } else {
            return `<i class="fa-regular fa-star"></i>`;
        }
    });
    starList.innerHTML = starList.innerHTML.split(',').join('');
})();

// -------------------------------------------------------------Overview------------------------------------------------
(async function overviewShow() {
    const overview = document.querySelector('.overview-text');
    const movieAPI = await fetch(API_URL);
    const movie_info = await movieAPI.json();
    overview.innerHTML = `${movie_info.overview}`;
})();

// -------------------------------------------------------------Comments------------------------------------------------
APIMovieUpload(needed_id, personalAPI, COMMENTS);

// -------------------------------------------------------------Toprated------------------------------------------------
(async function toprated() {
    const movieAPI = await fetch(TOP_RATED_API);
    const movie_info = await movieAPI.json();
    const movies = movie_info.results;
    const topratedContainer = document.querySelector('.topRated');
    for (i = 0; i < 5; i += 1) {
        const detailLink = `detailMovie.html?uid=${uid}&id=${movies[i].id}`;
        topratedContainer.innerHTML += `
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
})();
(async function upcoming() {
    const movieAPI = await fetch(UP_COMING_API);
    const movie_info = await movieAPI.json();
    const movies = movie_info.results;
    const topratedContainer = document.querySelector('.upComing');
    for (i = 0; i < 5; i += 1) {
        const detailLink = `detailMovie.html?uid=${uid}&id=${movies[i].id}`;
        topratedContainer.innerHTML += `
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
})();
