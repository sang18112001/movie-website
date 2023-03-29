// Body function
const urlParams = new URLSearchParams(window.location.search);
const needed_id = urlParams.get('id');
const API_URL = `https://api.themoviedb.org/3/movie/${needed_id}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`
const ALL_IMAGES = `https://api.themoviedb.org/3/movie/${needed_id}/images?api_key=3fd2be6f0c70a2a598f084ddfb75487c`
const ALL_CAST = `https://api.themoviedb.org/3/movie/${needed_id}/credits?api_key=3fd2be6f0c70a2a598f084ddfb75487c`
const RECOMMENDATION = `https://api.themoviedb.org/3/movie/${needed_id}/recommendations?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US&page=1`
const COMMENTS = `https://api.themoviedb.org/3/movie/${needed_id}/reviews?api_key=3fd2be6f0c70a2a598f084ddfb75487c`
const personalAPI = `https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app`
$(document).ready(function () {
    $('.owl-carousel.casts-content',).owlCarousel({
        margin: 30,
        responsive: {
            0: {
                items: 2,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 6,
            },
        },
    });
});
function movie_detail(movie_info) {
    const test_container = document.querySelector(".product-background")
    const allValues = movie_info.genres.reduce((acc, obj) => [...acc, obj.name], []);
    add_html = `
        <div class="product-content">
            <div class="content-box">
                <img src="${IMG_PATH + movie_info.poster_path}" alt=""> 
            </div>
            <div class="content-main">
                <h2 class="title">${movie_info.original_title}</h2>
                <span>${movie_info.release_date}</span>
                <div class="genres">
                    <h5>Genre: ${allValues.join(', ')}</h5>
                </div>
                <div class="personal">
                    <span><i class="icon fa-regular fa-list"></i></span>
                    <span><i class="icon fa-regular fa-heart"></i></span>
                    <span><i class="icon fa-solid fa-folder-plus"></i></span>
                    <span><i class="icon fa-solid fa-star"></i></span>
                </div>
                <div class="overview">
                    <div class="title">
                        Overview
                    </div>
                    <div class="text">
                        ${movie_info.overview}
                    </div>
                </div>
            </div>
        </div>
    `
    test_container.innerHTML += add_html
    const product = document.querySelector(".product-background")
    product.style.backgroundImage = `linear-gradient(to right, rgba(0, 0, 0, 0.738), rgba(242, 110, 66, 0.5)), url('${IMG_PATH + movie_info.backdrop_path}')`;
}

// Embed information-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Main information

// Casts
async function castsEmbeding() {
    const castAPI = await fetch(ALL_CAST)
    const casts_info = await castAPI.json()
    const casts = casts_info.cast
    const castsOwl = $(`.owl-carousel.casts-content`);
    for (i = 0; i <= 20; i++) {
        const castOwl = `
            <div class="cast">
                <div class="cast-avt">
                    <img src="${IMG_PATH + casts[i].profile_path}" alt="">
                <div class="cast-name">
                    <p class="original-name">${casts[i].original_name}</p>
                    <p class="character-name">${casts[i].character}</p>
                </div>
            </div>
        `
        castsOwl.owlCarousel("add", castOwl);
    }

    castsOwl.owlCarousel("update");
}
castsEmbeding()
// Media
const changeMediaType = () => {
    const mediaBtn = document.querySelectorAll('.button-media')
    const subMediaBox = document.querySelectorAll('.sub-media')
    mediaBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            mediaBtn.forEach((element, index) => {
                element.classList.remove('active-media')
                subMediaBox[index].classList.remove('active-block')
            })
            btn.classList.add('active-media')
            subMediaBox[i].classList.add('active-block')
        })
    })
}
changeMediaType()

async function mediaEmbeding() {
    const mediaAPI = await fetch(ALL_IMAGES)
    const media_info = await mediaAPI.json()
    owlMediaEmbeding('posters', media_info.posters)
    owlMediaEmbeding('backdrops', media_info.backdrops)
    owlMediaEmbeding('logos', media_info.logos)
}
mediaEmbeding()
function owlMediaEmbeding(typeMedia, medias) {
    const mediasOwl = $(`.owl-carousel.${typeMedia}`);
    for (i = 0; i <= 20; i++) {
        const Owl = `
            <img src="${IMG_PATH + medias[i].file_path}">
        `
        mediasOwl.owlCarousel("add", Owl);
    }
    mediasOwl.owlCarousel("update");
}
// Comments 

const commentType = document.querySelector('.movie-comments input')
const commentSubmitBtn = document.querySelector('.movie-comments button')
const commentBox = document.querySelector('.comment-box')

// Add comment to html
const addCmt = (user, cmt, imgPath) => {
    const comment = cmt.length > 300
        ? `${cmt.slice(0, 300)}... <div class="read_more active-inline">read the rest</div>`
        : `${cmt}`
    if (imgPath === null) {
        avatar = 'https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg'
    }
    else if (imgPath.includes('https')) {
        avatar = imgPath.slice(1,)
    }
    else {
        avatar = IMG_PATH + imgPath
    }
    commentBox.innerHTML += `
         <div class="comment-personal">
            <div class="comment">
                <img src="${avatar}">
                <div class="comment-content">
                    <div class="comment-author">
                        A comment by ${user}
                    </div>
                    <div class="comment-info">
                        Written by <span>${user}</span> on February 1, 2023
                    </div>
                </div>
            </div>
             <div class="comment-text">
                ${comment}
            </div>
        </div>
    `
}

// Movie API on website
const APIMovieUpload = async () => {
    const res = await fetch(`${COMMENTS}`)
    const data = await res.json()
    data.results.forEach((element) => {
        addCmt(element.author, element.content, element.author_details.avatar_path)
    })
    uploadCmtToAPI()
}
APIMovieUpload()
// Up load cmt from API to html
const uploadCmtToAPI = () => {
    const APILoading = async () => {
        const res_comment = await fetch(`${personalAPI}/comments.json`)
        const data_comments = await res_comment.json()
        const res_account = await fetch(`${personalAPI}/user/${uid}.json`)
        const data_accounts = await res_account.json()
        updateCmt(data_comments, data_accounts)
    }
    const updateCmt = (data_comments, data_accounts) => {
        // If data_comments and data_comments[needed_id] are not null, I will get array of all comments from API and show them
        if (data_comments != null && data_comments[needed_id] != null) {
            allComments = data_comments[needed_id].comment
            allComments.forEach((comment) => {
                addCmt(comment.user, comment.cmt, null)
            })
        } else {
            allComments = []
        }
        // Get value from input then update value to API and show them
        commentSubmitBtn.addEventListener('click', (element) => {
            element.preventDefault()
            const new_comment = commentType.value
            if (new_comment != "") {
                upCmtWithExistedID(new_comment, data_accounts.name)
            }
            commentType.value = ''
        })
    }
    APILoading()
}

function upCmtWithExistedID(cmt, user) {
    newItem = {
        "user": user,
        "cmt": cmt
    }
    allComments.push(newItem)
    newListComments = {
        "comment": allComments
    }
    const stringNewComment = JSON.stringify(newListComments)
    fetch(`${personalAPI}/comments/${needed_id}.json`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: stringNewComment
    })
    addCmt(user, cmt, null)
}
// Extra information