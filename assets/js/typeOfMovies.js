const urlParams = new URLSearchParams(window.location.search);
const type_movie = urlParams.get('type');
const index_type = typeMovies.indexOf(type_movie);

const getGenres = urlParams.get('genres') ? urlParams.get('genres') : '';
const getLanguages = urlParams.get('languages') ? urlParams.get('languages') : '';
const getYears = urlParams.get('years') ? urlParams.get('years') : '';

const arr_typeOfmovies = ['movie/now_playing', 'discover/movie', 'movie/top_rated', 'movie/upcoming'];
const baseAPI = `https://api.themoviedb.org/3/${arr_typeOfmovies[index_type]}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&vote_average.gte=1&vote_average.lte=8.5`;
const currentAPI =
    baseAPI +
    `&with_genres=${getGenres}` +
    `&with_original_language=${getLanguages}` +
    `&primary_release_year=${getYears}&page=1`;
const next_page_btn = document.querySelector('.next-page');
const prep_page_btn = document.querySelector('.prep-page');

// Change title
const moviesTitle = document.querySelector('.movies-title span');
const newTitle = type_movie.split('_').join(' ').toUpperCase();
moviesTitle.innerHTML = newTitle;
document.title = newTitle;

// Header navbar underline
const navbar_list = document.querySelectorAll('.header-menu a');
navbar_list.forEach((item) => {
    item.classList.remove('active-menu');
});
navbar_list[Number(index_type) + 1].classList.add('active-menu');

// Scroll functionality
(function () {
    let filter = document.querySelector('.button-filter');
    let functionality = document.querySelector('.web-function');
    functionality.addEventListener('scroll', () => {
        filter.classList.toggle('active-white', functionality.scrollY > 0);
    });
})();

// Filter scroll
const filterScroll = () => {
    const scrollElement = document.querySelector('.web-function');
    scrollElement.addEventListener('scroll', (e) => {
        preventDefault(false);
    });
};
filterScroll();
// Get all movies
async function getMovies(API_URL) {
    // When clicking each page number button or filter button, all movies will be removed
    document.querySelector('.body-cards').innerHTML = ``;
    lastAPI = API_URL;
    console.log(API_URL);
    const res = await fetch(API_URL);
    const data = await res.json();
    const movies_info = data;
    currentPage = data.page;
    totalPages = data.total_pages;
    // if currentPage <= 1 or currentPage >= lastPage => Disable prev and next page respectively.
    if (currentPage === 1) {
        prep_page_btn.classList.add('disabled');
        next_page_btn.classList.remove('disabled');
    } else if (currentPage >= totalPages) {
        prep_page_btn.classList.remove('disabled');
        next_page_btn.classList.add('disabled');
    } else {
        prep_page_btn.classList.remove('disabled');
        next_page_btn.classList.remove('disabled');
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
        button.addEventListener('click', function () {
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
        // if the length of each movie title is more than 30, I will only show the first 30 characters.
        const new_name = title.length > 20 ? `${title.slice(0, 20)}...` : title;
        // If uid exists, I will assign to detailMovie as an logged user. Else assigning to sign-in website
        const detailLink = !uid ? `sign-in.html` : `detailMovie.html?uid=${uid}&id=${movie.id}`;
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
                  <div class="content-name">${new_name}</div>
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

// Function
// Show filter responsive
function filterResponsive() {
    const webFunction = document.querySelector('.web-function');
    const btnFilter = document.querySelector('.filter-responsive');
    btnFilter.addEventListener('click', (event) => {
        event.preventDefault();
        webFunction.classList.toggle('active-filter');
        btnFilter.classList.toggle('active-filter-button');
    });
}
filterResponsive();

function filterFunction() {
    filterChangeCheckbox();
    filterPerforming();
}

function filterChangeCheckbox() {
    const filterCheckBoxes = document.querySelectorAll('.select-form input');
    Array.from(filterCheckBoxes).forEach((checkbox) => {
        const item = checkbox.name.split('-')[1];
        if (getGenres.includes(item) || getLanguages.includes(item) || getYears.includes(item)) {
            checkbox.checked = true;
        }
    });
}

function filterPerforming() {
    const checkboxes = document.querySelectorAll('.select-form input');
    const filterPerform = document.querySelector('.filter-perform');
    const filterRemove = document.querySelector('.filter-remove');
    const genresSet = getGenres ? getGenres.split(',').map((genre) => `genres-${genre}`) : [];
    const languages = getLanguages ? getLanguages.split(',').map((language) => `languages-${language}`) : [];
    const yearsSet = getYears ? getYears.split(',').map((year) => `years-${year}`) : [];
    const filterSet = new Set([...genresSet], [...languages], [...yearsSet]);
    const filterLink = !uid
        ? `typeOfMovies.html?type=${type_movie}`
        : `typeOfMovies.html?uid=${uid}&type=${type_movie}`;
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            checkbox.checked ? filterSet.add(checkbox.name) : filterSet.delete(checkbox.name);
        });
    });
    filterPerform.addEventListener('click', (event) => {
        event.preventDefault();
        const filterObj = {
            genres: '',
            languages: '',
            years: '',
        };
        for (const elem of filterSet) {
            const [prop, val] = elem.split('-');
            filterObj[prop] = filterObj[prop] ? `${filterObj[prop]},${val}` : val;
        }
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
