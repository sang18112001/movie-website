const urlParams = new URLSearchParams(window.location.search);
const getQuery = Object.fromEntries(urlParams.entries());

const type = getQuery.type;
const filterObj = {
    genres: getQuery.genres || '',
    languages: getQuery.languages || '',
    years: getQuery.years || '',
};
const index_type = typeMovies.indexOf(type);
const arr_typeOfmovies = ['movie/now_playing', 'discover/movie', 'movie/top_rated', 'movie/upcoming'];
const baseAPI = `https://api.themoviedb.org/3/${arr_typeOfmovies[index_type]}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&vote_average.gte=1&vote_average.lte=8.5`;
const currentAPI =
    baseAPI +
    `&with_genres=${filterObj.genres}` +
    `&with_original_language=${filterObj.languages}` +
    `&primary_release_year=${filterObj.years}&page=1`;
const next_page_btn = document.querySelector('.next-page');
const prep_page_btn = document.querySelector('.prep-page');

// Change title
const moviesTitle = document.querySelector('.movies-title span');
const newTitle = type.split('_').join(' ').toUpperCase();
moviesTitle.innerHTML = newTitle;
document.title = newTitle;

// Header navbar underline
const navbar_list = document.querySelectorAll('.header-menu a');
navbar_list.forEach((item) => {
    item.classList.remove('active-menu');
});
navbar_list[Number(index_type) + 1].classList.add('active-menu');

// Get all movies
async function getMovies(API_URL) {
    // When clicking each page number button or filter button, all movies will be removed
    document.querySelector('.body-cards').innerHTML = ``;
    lastAPI = API_URL;
    const res = await fetch(API_URL);
    const data = await res.json();
    const movies_info = data;
    currentPage = data.page;
    totalPages = data.total_pages;
    // if currentPage <= 1 or currentPage >= lastPage => Disable prev and next page respectively.
    if (currentPage === 1) {
        prep_page_btn.classList.add('disabled');
        prep_page_btn.disabled = true;
        next_page_btn.classList.remove('disabled');
        next_page_btn.disabled = false;
    } else if (currentPage >= totalPages) {
        prep_page_btn.classList.remove('disabled');
        prep_page_btn.disabled = false;
        next_page_btn.classList.add('disabled');
        next_page_btn.disabled = true;
    } else {
        prep_page_btn.classList.remove('disabled');
        prep_page_btn.disabled = false;
        next_page_btn.classList.remove('disabled');
        next_page_btn.disabled = false;

    }
    show_movies(movies_info);
}

// Show button and change color
function modify_buttons(all_buttons, required_page) {
    let show_button_arr = [];
    // Then I will hidden all buttons through removing active_botton and adding hidden_buttons to all buttons
    all_buttons.forEach((btn) => {
        btn.classList.remove('active_button');
        btn.classList.add('hidden_button');
    });
    // Buttons will be just showed when required_page > 1 and then pushing 5 buttons needed to show into show_button_arr
    if (required_page > 1) {
        show_button_arr =
            required_page >= 3
                ? all_buttons.slice(required_page - 3, required_page + 2)
                : all_buttons.slice(required_page - 2, required_page + 3);
    } else show_button_arr = all_buttons.slice(0, 5);
    // Show all buttons in the show_buton_arr
    show_button_arr.forEach((show_button) => {
        show_button.classList.remove('hidden_button');
    });
    // Modifying color for the button that I require by adding active_button
    all_buttons[required_page - 1].classList.add('active_button');
}

// Create button
function numOfPages() {
    const num_buttons = document.querySelector('.number-pages');
    // Generating 30 page number buttons.
    for (num = 1; num <= 30; num++) {
        // Just showing the first 5 pages.
        if (num <= 5) {
            button_number = `<button id = "${num}" class="show_button num-page">${num}</button>`;
            num_buttons.innerHTML += button_number;
            continue;
        }
        // Hidden the rest of page buttons
        button_number = `<button id = "${num}" class="hidden_button num-page">${num}</button>`;
        num_buttons.innerHTML += button_number;
    }
    const buttons = document.querySelectorAll('.num-page');
    const all_buttons = [...buttons];
    // Modify color for the first page button.
    all_buttons[0].classList.add('active_button');
    all_buttons.forEach((button, index) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            required_page = index + 1;
            modify_buttons(all_buttons, required_page);
            // Get index of current page in lastAPI url
            const index_page = lastAPI.indexOf('page') + 5;
            // Change current page in lastAPI to required page
            lastAPI = lastAPI.slice(0, index_page) + required_page;
            // Show all movies
            getMovies(lastAPI);
        });
    });
}

// Change page: Next page and Prev page
function changePage() {
    const buttons = document.querySelectorAll('.num-page');
    const all_buttons = [...buttons];
    next_page_btn.addEventListener('click', function () {
        const current_page = Number(document.querySelector('.active_button').id);
        const required_page = current_page + 1;
        modify_buttons(all_buttons, required_page);
        const index_page = lastAPI.indexOf('page') + 5;
        // Change current page in lastAPI to required page
        lastAPI = lastAPI.slice(0, index_page) + required_page;
        // Show all movies
        getMovies(lastAPI);
    });
    prep_page_btn.addEventListener('click', () => {
        const current_page = Number(document.querySelector('.active_button').id);
        const required_page = current_page > 1 ? current_page - 1 : current_page;
        modify_buttons(all_buttons, required_page);
        const index_page = lastAPI.indexOf('page') + 5;
        // Change current page in lastAPI to required page
        lastAPI = lastAPI.slice(0, index_page) + required_page;
        // Show all movies
        getMovies(lastAPI);
    });
}

// Show movies
function show_movies(movies_info) {
    const movies = movies_info.results;
    const numOfPages = movies_info.total_pages;
    const all_cards = document.querySelector('.body-cards');
    all_cards.id = numOfPages;
    movies.forEach((movie) => {
        const title = movie.title,
            path = movie.poster_path,
            vote = movie.vote_average;
        // if the image don't have its link, I will replace it with another photo.
        const img_path =
            path === null
                ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png?20200912122019'
                : IMG_PATH + path;
        // If uid exists, I will assign to detailMovie as an logged user. Else assigning to sign-in website
        const detailLink = !uid ? `sign-in.html` : `detailMovie.html?id=${movie.id}`;
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=3fd2be6f0c70a2a598f084ddfb75487c`)
            .then((res) => res.json())
            .then((specificMovie) => {
                runtime = specificMovie.runtime === 0 ? NaN : specificMovie.runtime;
                all_cards.innerHTML += `
                    <div class="each-col col-6 col-md-4 col-xl-3" data-vote="${vote}">
                        <a href="${detailLink}">
                        <div class="body-card">
                            <div class="image-box">
                                <img src=${img_path} alt="" class="card-img">
                            </div>
                        <div class="card-content">
                            <div class="content-main">
                                <div class="content-name">${title}</div>
                            </div>
                            <div class="content-info">
                                <span class="content-year">${movie.release_date.slice(0, 4)}</span>
                            <div class="info-year-runtime">
                                <span class="content-runtime">
                                    <span class="icon fa-regular fa-clock"></span>
                                <span class="content-time">${specificMovie.runtime}m</span>
                                </span>
                                <span class="content-vote">
                                    <span class=" icon fa fa-star checked"></span>
                                    <span>${vote}</span>
                                </span>
                            </div>
                            </div>
                        </div>
                        </div>
                        </a>
                    </div>
    `;
            });
    });
}

function filterFunction() {
    filterChangeSelection();
    filterPerforming();
}

function filterChangeSelection() {
    const filterOptions = document.querySelectorAll('option');
    Array.from(filterOptions).forEach((option) => {
        if (option.value != 'default') {
            const typeFilter = option.value.split('-')[0];
            const idFilter = option.value.split('-')[1];
            if (filterObj[typeFilter] === idFilter) {
                option.setAttribute('selected', true);
            }
        }
    });
}

function filterPerforming() {
    const filterOptions = document.querySelectorAll('select');
    const filterPerform = document.querySelector('.filter-perform');
    const filterRemove = document.querySelector('.filter-remove');
    filterOptions.forEach((filterOption) => {
        filterOption.addEventListener('change', () => {
            const typeFilter = filterOption.value.split('-')[0];
            const idFilter = filterOption.value.split('-')[1];
            filterObj[typeFilter] = idFilter != 'default' ? idFilter : '';
        });
    });
    const filterLink = `typeOfMovies.html?type=${type}`
    filterPerform.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.assign(
            `${filterLink}&genres=${filterObj.genres}&languages=${filterObj.languages}&years=${filterObj.years}`,
        );
    });
    filterRemove.addEventListener('click', () => {
        window.location.assign(filterLink);
    });
}

getMovies(currentAPI);
numOfPages();
changePage();
filterFunction();
