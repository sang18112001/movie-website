const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;
const NOW_PLAYING = 'https://api.themoviedb.org/3/movie/now_playing?api_key=3fd2be6f0c70a2a598f084ddfb75487c';
const POPULAR_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=`;
const TOP_RATED_API = `https://api.themoviedb.org/3/movie/top_rated?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US&page=`;
const UP_COMING_API = `https://api.themoviedb.org/3/movie/upcoming?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US&page=`;

const GENRES_API = `https://api.themoviedb.org/3/genre/movie/list?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`;
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';
const typeMovies = [`now_playing`, `popularity`, `top_rated`, `up_coming`];
const uid = JSON.parse(localStorage.getItem('signAccount')).uid;
// Header scroll
function scrollHeader() {
    let header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('shadow', window.scrollY > 0);
    });
}

// Creating logo button
(function changeLogoLink() {
    const web_logo = document.querySelector('.web-logo');
    web_logo.addEventListener('click', () => {
        window.location.assign(`index.html`);
    });
})();

// Menu header create
(function menuHeaderCreate() {
    const header_menu = document.querySelector('.header-menu');
    header_menu.innerHTML = `<li><a class="active-menu" href="index.html">Home</a></li>`;
    typeMovies.forEach((eachType) => {
        const menuLink = `typeOfMovies.html?type=${eachType}`;
        const menuTitle = eachType.split('_').join(' ');
        header_menu.innerHTML += `<li><a href="${menuLink}">${menuTitle}</a></li>`;
    });
})();

// Search function for header
(function search_box() {
    const search = document.querySelector('.header-search input');
    search.addEventListener('input', (element) => {
        element.preventDefault();
        const box = document.querySelector('.header-search-items');
        box.innerHTML = '';
        // Add event listener to the document object for mousedown event
        document.addEventListener('mousedown', function (event) {
            // Check if the target of the event is outside of the box
            if (!box.contains(event.target)) {
                // If it is, hide the box
                box.style.display = 'none';
            }
        });
        // Add event listener to the input element for focusin event
        search.addEventListener('focusin', function (event) {
            if (search.value != '') {
                box.style.display = 'block';
            }
        });
        box.style.display = search.value === '' ? 'none' : 'block';
        const new_api = SEARCH_API + search.value;
        searchMovie(new_api);
    });
})();

async function searchMovie(API) {
    const res = await fetch(API);
    const search_movie = await res.json();
    // Show search movie
    function showSearch(search_movie) {
        const api_movies = search_movie.results;
        const list_movies = document.querySelector('.header-search-items');
        if (api_movies.length === 0) {
            list_movies.innerHTML += `
                  <p class="no_results">Don't have results</p>
              `;
        } else {
            api_movies.forEach((element) => {
                const nameOfMovie =
                    element.original_title.length > 30
                        ? element.original_title.slice(0, 30) + '...'
                        : element.original_title;
                const detailLink = !uid ? `sign-in.html` : `detailMovie.html?id=${element.id}`;
                list_movies.innerHTML += `
                    <li class="item">
                        <a href=${detailLink}>
                            <img src="${IMG_PATH + element.poster_path}"></img>
                            <div class="item-content">
                                <div class="item-title">${nameOfMovie}</div>
                                <div class="item-id">ID: ${element.id}</div>
                            </div>
                        </a>
                    </li>
                `;
            });
        }
    }
    showSearch(search_movie);
}

// Modify account
(async function your_account_modify() {
    const res = await fetch(
        `https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app/user/${uid}.json`,
    );
    const data = await res.json();
    const log_account = document.querySelector('.account-log');
    const logged_account = document.querySelector('.account-logged');
    if (uid === '') {
        log_account.classList.remove('active-hidden');
        logged_account.classList.add('active-hidden');
    } else {
        log_account.classList.add('active-hidden');
        logged_account.classList.remove('active-hidden');
        document.querySelector('.account_name').innerHTML = data.name;
    }
})();

// Sign out account
(function () {
    const signOutBtn = document.querySelector('.log-out');
    signOutBtn.addEventListener('click', () => {
        localStorage.setItem('signAccount', JSON.stringify({ uid: '' }));
    });
})();

// Header responsive
(function () {
    const header = document.querySelector('header');
    const show_menu = document.querySelector('#menu-icon');
    const searchBtn = document.querySelector('.icon-search');
    const log_account = document.querySelector('.account-log-button');
    const show_log_account = document.querySelector('.account-log-logo');
    const logged_account = document.querySelector('.account-logged-button');
    const show_logged_account = document.querySelector('.account-logged-logo');
    // Menu
    show_menu.addEventListener('click', () => {
        header.classList.toggle('active-header-menu');
        header.classList.remove('active-header-search');
        log_account.classList.remove('active-block');
        logged_account.classList.remove('active-block');
    });
    // Search
    searchBtn.addEventListener('click', () => {
        header.classList.remove('active-header-menu');
        header.classList.toggle('active-header-search');
        log_account.classList.remove('active-block');
        logged_account.classList.remove('active-block');
    });
    // Account
    show_log_account.addEventListener('click', () => {
        log_account.classList.toggle('active-block');
        header.classList.remove('active-header-menu');
        header.classList.remove('active-header-search');
    });
    show_logged_account.addEventListener('click', () => {
        logged_account.classList.toggle('active-block');
        header.classList.remove('active-header-menu');
        header.classList.remove('active-header-search');
    });
})();

/*
---------------------------------------------COMMENT---------------------------------------------
*/
const commentType = document.querySelector('.movie-comments input');
const commentSubmitBtn = document.querySelector('.movie-comments button');
const commentBox = document.querySelector('.comment-box');

// Add comment to html
const addCmt = (user, cmt, imgPath, time) => {
    if (imgPath === null) {
        avatar = 'https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg';
    } else if (imgPath.includes('https')) {
        avatar = imgPath.slice(1);
    } else {
        avatar = IMG_PATH + imgPath;
    }
    commentBox.innerHTML += `
        <div class="comment-personal">
            <div class="comment">
                <img src="${avatar}">
                <div class="comment-content">
                    <div class="comment-author">
                        ${user}
                    </div>
                    <div class="comment-info">
                        Updated at: ${time}
                    </div>
                </div>
            </div>
             <div class="comment-text">
                ${cmt}
            </div>
        </div>
    `;
};

// Movie API on website
const APIMovieUpload = async (needed_id, personalAPI, COMMENTS) => {
    const res = await fetch(`${COMMENTS}`);
    const data = await res.json();
    data.results.forEach((element) => {
        addCmt(element.author, element.content, element.author_details.avatar_path, element.updated_at);
    });
    uploadCmtToAPI(needed_id, personalAPI);
};

// Up load cmt from API to html
const uploadCmtToAPI = (needed_id, personalAPI) => {
    const APILoading = async () => {
        const res_comment = await fetch(`${personalAPI}/comments.json`);
        const data_comments = await res_comment.json();
        const res_account = await fetch(`${personalAPI}/user/${uid}.json`);
        const data_accounts = await res_account.json();
        updateCmt(data_comments, data_accounts);
    };
    const updateCmt = (data_comments, data_accounts) => {
        // If data_comments and data_comments[needed_id] are not null, I will get array of all comments from API and show them
        if (data_comments != null && data_comments[needed_id] != null) {
            allComments = data_comments[needed_id].comment;
            allComments.forEach((comment) => {
                addCmt(comment.author, comment.content, null, comment.updated_at);
            });
        } else {
            allComments = [];
        }
        // Get value from input then update value to API and show them
        commentSubmitBtn.addEventListener('click', (element) => {
            element.preventDefault();
            const date = new Date();
            const time = `${date.getFullYear()} - ${
                date.getMonth() + 1
            } - ${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            const new_comment = commentType.value;
            if (new_comment != '') {
                console.log(time);
                upCmtWithExistedID(new_comment, data_accounts.name, null, time);
            }
            commentType.value = '';
        });
    };
    APILoading();
};

function upCmtWithExistedID(cmt, user, _, time) {
    newItem = {
        author: user,
        content: cmt,
        updated_at: time,
    };
    allComments.push(newItem);
    newListComments = {
        comment: allComments,
    };
    const stringNewComment = JSON.stringify(newListComments);
    fetch(`${personalAPI}/comments/${needed_id}.json`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: stringNewComment,
    });
    addCmt(newItem.author, newItem.content, null, newItem.updated_at);
}
