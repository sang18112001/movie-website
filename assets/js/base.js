const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
const NOW_PLAYING = 'https://api.themoviedb.org/3/movie/now_playing?api_key=3fd2be6f0c70a2a598f084ddfb75487c'
const POPULAR_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=`
const TOP_RATED_API = `https://api.themoviedb.org/3/movie/top_rated?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US&page=`
const UP_COMING_API = `https://api.themoviedb.org/3/movie/upcoming?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US&page=`

const GENRES_API = `https://api.themoviedb.org/3/genre/movie/list?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`;
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=";
const typeMovies = [`now_playing`, `popularity`, `top_rated`, `up_coming`]
const uid = new URLSearchParams(window.location.search).get("uid");
console.log(uid)

// Creating logo button
function changeLogoLink() {
    const web_logo = document.querySelector('.web-logo');
    web_logo.addEventListener('click', () => {
        !uid ? window.location.assign(`index.html`) : window.location.assign(`index.html?uid=${uid}`)
    })
}
changeLogoLink()

// Menu header create 
function menuHeaderCreate() {
    const header_menu = document.querySelector('.header-menu')
    const homeLink = !uid ? `index.html` : `index.html?uid=${uid}`;
    header_menu.innerHTML = `<li><a class="active-menu" href="${homeLink}">Home</a></li>`
    typeMovies.forEach((eachType) => {
        const menuLink = !uid ? `typeOfMovies.html?type=${eachType}` : `typeOfMovies.html?uid=${uid}&type=${eachType}`;
        const menuTitle = eachType.split('_').join(" ")
        header_menu.innerHTML += `<li><a href="${menuLink}">${menuTitle}</a></li>`
    })
}
menuHeaderCreate()

// Header scroll

function scrollHeader() {
    let header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('shadow', window.scrollY > 0);
    })
}

// Responsive function for header
function responsive_header() {
    const show_menu = document.querySelector("#menu-icon");
    const header_navbar = document.querySelector(".header-menu");
    const log_account = document.querySelector(".account-log-button");
    const show_log_account = document.querySelector(".account-log-logo");
    const logged_account = document.querySelector(".account-logged-button");
    const show_logged_account = document.querySelector(".account-logged-logo");
    show_menu.addEventListener("click", () => {
        header_navbar.classList.toggle("navbar-active");
        show_menu.classList.toggle("change");
    });
    show_log_account.addEventListener("click", () => {
        log_account.classList.toggle("active-block");
    });
    show_logged_account.addEventListener("click", () => {
        logged_account.classList.toggle("active-block");
    });
}
responsive_header();

// Search function for header
function search_box() {
    const search = document.querySelector(".header-search input");
    search.addEventListener("input", (element) => {
        element.preventDefault();
        const box = document.querySelector(".header-search-items");
        box.innerHTML = "";
        // Add event listener to the document object for mousedown event
        document.addEventListener("mousedown", function (event) {
            // Check if the target of the event is outside of the box
            if (!box.contains(event.target)) {
                // If it is, hide the box
                box.style.display = "none";
            }
        });
        // Add event listener to the input element for focusin event
        search.addEventListener("focusin", function (event) {
            if (search.value != "") {
                box.style.display = "block";
            }
        });
        box.style.display = search.value === "" ? "none" : "block";
        const new_api = SEARCH_API + search.value;
        searchMovie(new_api);
    });
}
async function searchMovie(API) {
    const res = await fetch(API);
    const search_movie = await res.json();
    function showSearch(search_movie) {
        const api_movies = search_movie.results;
        const list_movies = document.querySelector(".header-search-items");
        if (api_movies.length === 0) {
            list_movies.innerHTML += `
                <p class="no_results">Don't have results</p>
            `
        } else {
            api_movies.forEach((element) => {
                const nameOfMovie = element.original_title.length > 30 ? element.original_title.slice(0, 30) + '...' : element.original_title
                const detailLink = !uid ? `sign-in.html` : `detailMovie.html?uid=${uid}&id=${element.id}`
                list_movies.innerHTML += `
                    <li class="item">
                        <a href=${detailLink}>
                            <img src="${IMG_PATH + element.poster_path}"></img>
                            <div class="item-content">
                                <div class="item-title">${nameOfMovie}</div>
                                <div class="item-id">ID: ${nameOfMovie.length}</div>
                            </div>
                        </a>
                    </li>
                `;
            });
        }
    }
    showSearch(search_movie);
}
search_box();


async function your_account_modify() {
    const res = await fetch(`https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app/user/${uid}.json`);
    const data = await res.json();
    console.log(data)
    const log_account = document.querySelector(".account-log");
    const logged_account = document.querySelector(".account-logged");
    const all_links = document.querySelectorAll("body a");
    if (uid === null) {
        log_account.classList.remove("active-hidden");
        logged_account.classList.add("active-hidden");
    } else {
        log_account.classList.add("active-hidden");
        logged_account.classList.remove("active-hidden");
        document.querySelector(".account_name").innerHTML = data.name;
    }
}
your_account_modify();
