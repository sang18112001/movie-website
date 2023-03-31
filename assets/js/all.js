/**
==============================================================Body function====================================================================
 */
// Header scroll
scrollHeader()

const dictMovies = {
    popularity: Array(),
    top_rated: Array(),
    up_coming: Array(),
}

for (let page = 1; page <= 5; page++) {
    getMovies(POPULAR_API + String(page), `popularity`, page)
    getMovies(TOP_RATED_API + String(page), `top_rated`, page)
    getMovies(UP_COMING_API + String(page), `up_coming`, page)
}

async function getMovies(API_URL, typeOfMovies, page) {
    const res = await fetch(API_URL)
    const movies_info = await res.json()
    const movies = movies_info.results
    movies.forEach((movie) => {
        dictMovies[typeOfMovies].push(movie)
    })
    if (page === 1) {
        show_movies(dictMovies[typeOfMovies].slice(0, 6), typeOfMovies)
    }
}
var t = 6

for (i = 1; i < typeMovies.length; i++) {
    const loadMoreBtn = document.querySelector(`.load-more.btn-${typeMovies[i]}`)
    loadMoreBtn.addEventListener('click', () => {
        console.log(loadMoreBtn.id)
        show_movies(dictMovies[loadMoreBtn.id].slice(t, t + 6), loadMoreBtn.id)
        t = t + 6
    })
}

function show_movies(movies, typeOfMovie) {
    const all_movies = document.querySelector(`.movie-body.${typeOfMovie}`)
    movies.forEach((movie) => {
        const detailLink = !uid ? `sign-in.html` : `detailMovie.html?uid=${uid}&id=${movie.id}`
        const movieElement = `
            <div class="movie-item movie-item-${typeOfMovie} col-6 col-sm-4 col-md-2">
                <div class="box-image">
                    <a href="${detailLink}">
                        <img class="border-cards" src="${IMG_PATH + movie.poster_path}" alt="${movie.poster_path}">
                    </a>
                </div>
            </div>
        `
        all_movies.innerHTML += movieElement
    });
}

async function moviesBanner(NOW_PLAYING) {
    const res = await fetch(NOW_PLAYING)
    const movies_info = await res.json()
    const movies = movies_info.results
    show_banner(movies)
    show_movie_slider(movies)
}



function show_banner(movies) {
    const owl_carousel = $(`.owl-carousel.movie-slider`);
    movies.forEach((movie) => {
        const img_path = movie.poster_path
        const movieOwl = `
            <div class="slider-item">
                <img class="border-cards image-banner opacity-image" src="${IMG_PATH + img_path}" alt="">
            </div>
        `
        owl_carousel.owlCarousel("add", movieOwl);
    });
    owl_carousel.owlCarousel("update");
}
moviesBanner(NOW_PLAYING)

function show_movie_slider(movies) {
    const needed_movies = document.querySelector('.main-movies')
    movies.forEach((movie, index) => {
        const detailLink = !uid ? `sign-in.html` : `detailMovie.html?uid=${uid}&id=${movie.id}`
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
        `
        needed_movies.innerHTML += movieElement
    });
    const background_movies = document.querySelector(`.main-movies img`)
    background_movies.src = `${IMG_PATH + movies[0].backdrop_path}`
    const all_image_banner = document.querySelectorAll('.image-banner')
    all_image_banner[0].classList.remove('opacity-image')
    const nth_movies = document.querySelectorAll(`.movie`)
    nth_movies[0].classList.add('active')

    all_image_banner.forEach((img, index) => {
        img.addEventListener('click', () => {
            background_movies.src = `${IMG_PATH + movies[index].backdrop_path}`
            all_image_banner.forEach(banner_element => {
                banner_element.classList.add('opacity-image')
            })
            img.classList.remove('opacity-image')
            nth_movies.forEach(movie_element => {
                movie_element.classList.remove('active')
            })
            document.querySelector(`.movie-${index}`).classList.add('active')
        })
    })
}

// Search function

function showBoxMovie() {
    const collections = document.querySelectorAll('.marvel-item')
    collections.forEach(collection => {
        collection.addEventListener('click', (event) => {
            event.preventDefault();
            const collection_id = collection.getAttribute('value')
            const collectionOwl = document.querySelector('.movie-box')
            collectionOwl.innerHTML = ``
            fetch(`https://api.themoviedb.org/3/collection/${collection_id}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`)
                .then(res => res.json())
                .then(data => embedCollection(data.parts))
            function embedCollection(collectionItems) {
                collectionItems.forEach(item => {
                    collectionOwl.innerHTML += `
                        <div class="box-item">
                            <img src="${IMG_PATH + item.backdrop_path}" alt="">
                        </div>
                    `
                })
                $('.movie-box').owlCarousel({
                    margin: 20,
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
            }
        })
    })
}
// showBoxMovie()