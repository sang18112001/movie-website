/**
==============================================================Body function====================================================================
 */
// Header scroll
scrollHeader();
(async function topRated() {
    const res = await fetch(TOP_RATED_API);
    const movies_info = await res.json();
    const movies = movies_info.results;
    all_movies = document.querySelector(`.top-rated-body`);
    for (i = 0; i < 8; i++) {
        const detailLink = !uid ? `sign-in.html` : `detailMovie.html?uid=${uid}&id=${movies[i].id}`;
        const movieElement = `
            <div class="col-6 col-lg-3 col-md-4 test_rated">
                <div class="top-rated-main">
                    <div class="top-rated_box">
                        <div class="top-rated-num">${i + 1}</div>
                        <div class="top-rated-img">
                            <a href="${detailLink}">
                                <img src="${IMG_PATH + movies[i].poster_path}" alt="">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        all_movies.innerHTML += movieElement;
    }
})();

(async function nowPlaying() {
    const res = await fetch(NOW_PLAYING);
    const movies_info = await res.json();
    const movies = movies_info.results;
    all_movies = document.querySelector(`.box-nowPlaying`);
    for (i = 0; i < 12; i++) {
        const title = movies[i].original_title;
        console.log(title);
        const detailLink = !uid ? `sign-in.html` : `detailMovie.html?uid=${uid}&id=${movies[i].id}`;
        const newTitle = title.length > 15 ? title.slice(0, 15) + '...' : title;
        const movieElement = `
            <a href="${detailLink}">
                <div class="box" style="background-image: url('${IMG_PATH + movies[i].backdrop_path}')">
                  <div class="type-movie-title">${newTitle}</div>
                </div>
            </a>
        `;
        all_movies.innerHTML += movieElement;
    }
})();

(async function upComing() {
    const res = await fetch(UP_COMING_API);
    const movies_info = await res.json();
    const movies = movies_info.results;
    all_movies = document.querySelector(`.box-upComing`);
    for (i = 0; i < 12; i++) {
        const title = movies[i].original_title;
        const detailLink = !uid ? `sign-in.html` : `detailMovie.html?uid=${uid}&id=${movies[i].id}`;
        let newTitle = title;
        if (i > 0) {
            newTitle = title.length > 15 ? title.slice(0, 15) + '...' : title;
        }
        const movieElement = `
            <a href="${detailLink}">
                <div class="box" style="background-image: url('${IMG_PATH + movies[i].backdrop_path}')">
                <div class="type-movie-title">${newTitle}</div>
                </div>
            </a>
        `;
        all_movies.innerHTML += movieElement;
    }
})();
(async function genres() {
    const res = await fetch('https://new-api-three.vercel.app/genres');
    const genres_info = await res.json();
    const genresContainer = document.querySelector('.genres-type .row');
    genres_info.forEach((genre) => {
        const newLink = !uid ? `sign-in.html` : `typeOfMovies.html?uid=${uid}&type=popularity`;
        genresContainer.innerHTML += `
            <a href=${newLink}  class="col-6 col-md-4	col-lg-3 col-xl-2">
              <div class="genre-box">
                  <img src="${genre.genre_path}" alt="">
                  <p>${genre.genre_name}</p>
              </div>
            </a>
        `;
    });
})();

async function moviesBanner(POPULAR_API) {
    const res = await fetch(POPULAR_API);
    const movies_info = await res.json();
    const movies = movies_info.results;
    show_banner(movies);
    show_movie_slider(movies);
}

function show_banner(movies) {
    const owl_carousel = $(`.owl-carousel.movie-slider`);
    movies.forEach((movie) => {
        const img_path = movie.poster_path;
        const movieOwl = `
            <div class="slider-item">
                <img class="border-cards image-banner opacity-image" src="${IMG_PATH + img_path}" alt="">
            </div>
        `;
        owl_carousel.owlCarousel('add', movieOwl);
    });
    owl_carousel.owlCarousel('update');
}

function show_movie_slider(movies) {
    const needed_movies = document.querySelector('.main-movies');
    movies.forEach((movie, index) => {
        const detailLink = !uid ? `sign-in.html` : `detailMovie.html?uid=${uid}&id=${movie.id}`;
        const movieElement = `
        <div class="movie movie-${index}">
            <div class="movie-main">
                <h2 class="movie-title">${movie.original_title}</h2>
                <div class="movie-year-vote">
                    <span class="movie-year">${movie.release_date}</span>
                    <span class="movie-vote">${movie.vote_average}</span>
                </div>
                <div class="movie-detail">
                    <a href="${detailLink}">
                        <button class="btn">
                            <span class="movie-watch"><i class="fa-solid fa-caret-right"></i></span>
                            <span>Watch Now</span>
                        </button>
                    </a>
                </div>
            </div>
        </div>
        `;
        needed_movies.innerHTML += movieElement;
    });
    const background_movies = document.querySelector(`.main-movies img`);
    background_movies.src = `${IMG_PATH + movies[0].backdrop_path}`;
    const all_image_banner = document.querySelectorAll('.image-banner');
    all_image_banner[0].classList.remove('opacity-image');
    const nth_movies = document.querySelectorAll(`.movie`);
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

moviesBanner(POPULAR_API);

// show all buttons
(function () {
    const showAllButtons = document.querySelectorAll('#load-more');
    showAllButtons.forEach((button) => {
        const newLink = !uid
            ? `sign-in.html`
            : `typeOfMovies.html?uid=${uid}&type=${button.querySelector('.load-more').id}`;
        button.href = newLink;
    });
})();
