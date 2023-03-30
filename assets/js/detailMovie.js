// Body function
const urlParams = new URLSearchParams(window.location.search);
const needed_id = urlParams.get('id');
const API_URL = `https://api.themoviedb.org/3/movie/${needed_id}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`
const ALL_IMAGES = `https://api.themoviedb.org/3/movie/${needed_id}/images?api_key=3fd2be6f0c70a2a598f084ddfb75487c`
const ALL_CAST = `https://api.themoviedb.org/3/movie/${needed_id}/credits?api_key=3fd2be6f0c70a2a598f084ddfb75487c`
const RECOMMENDATION = `https://api.themoviedb.org/3/movie/${needed_id}/recommendations?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US&page=1`
const COMMENTS = `https://api.themoviedb.org/3/movie/${needed_id}/reviews?api_key=3fd2be6f0c70a2a598f084ddfb75487c`
const personalAPI = `https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app`
scrollHeader()
// Embed information-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Main information
async function mainEmbeding() {
    const movieContainer = document.querySelector('.movie-container')
    const movieAPI = await fetch(API_URL)
    const movie_info = await movieAPI.json()
    const castsAPI = await fetch(ALL_CAST)
    const casts_info = await castsAPI.json()
    const genres = movie_info.genres.map(genre => genre.name).join(', ')
    const casts = casts_info.cast.slice(0, 5).map(cast => cast.original_name).join(', ')
    const detailLink = !uid ? `watchingMovie.html` : `watchingMovie.html?uid=${uid}&id=${needed_id}`
    movieContainer.innerHTML = `
        <img src="${IMG_PATH + movie_info.backdrop_path}">
        <div class="movie-content">
          <img src="${IMG_PATH + movie_info.poster_path}" alt="">
          <div class="detail">
            <div class="sub-title">
              <span class="free-icon">
                <i class="fa-solid fa-chess-queen"></i>
              </span>
              <span class="free">Free .</span>
              <span>Feature film .</span>
              <span>${movie_info.release_date.slice(0, 4)} .</span>
            </div>
            <h2>${movie_info.original_title}</h2>
            <p class="overview">
              ${movie_info.overview}
            </p>
            <div class="attributes">
              <div class="movie-info">
                <p><span class="title-info">IMDB:</span> ${movie_info.vote_average}</p>
                <p><span class="title-info">Time:</span> ${movie_info.runtime} minutes</p>
                <p><span class="title-info">Genres:</span> ${genres}</p>
              </div>
              <div class="movie-cast">
                <p><span class="title-info">Date:</span> ${movie_info.release_date}</p>
                <span class="title-info">Diễn viên: </span> ${casts},...
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
    `
}
mainEmbeding()
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
                </div>
                <div class="cast-name">
                    <p class="original-name">${casts[i].original_name.split(' ').slice(0, 2).join(' ')}</p>
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
const addCmt = (user, cmt, imgPath, time) => {
    if (imgPath === null) {
        avatar = 'https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg'
    }
    else if (imgPath.includes('https')) {
        avatar = imgPath.slice(1,)
    }
    else {
        avatar = IMG_PATH + imgPath
    }
    const new_time = time === null ? 'none' : time.slice(0, 10)
    commentBox.innerHTML += `
        <div class="comment-personal">
            <div class="comment">
                <img src="${avatar}">
                <div class="comment-content">
                    <div class="comment-author">
                        ${user}
                    </div>
                    <div class="comment-info">
                        Updated at: ${new_time}
                    </div>
                </div>
            </div>
             <div class="comment-text">
                ${cmt.split('.')[0] + '.'}
            </div>
        </div>
    `
}

// Movie API on website
const APIMovieUpload = async () => {
    const res = await fetch(`${COMMENTS}`)
    const data = await res.json()
    data.results.forEach((element) => {
        addCmt(element.author, element.content, element.author_details.avatar_path, element.updated_at)
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
                addCmt(comment.user, comment.cmt, null, null)
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
    addCmt(user, cmt, null, null)
}
// Recommendations
async function recommendations() {
    const owl_carousel = $(`.owl-carousel.recommend-main`);
    const recommend = await fetch(RECOMMENDATION)
    const recommend_info = await recommend.json()
    const recommender = recommend_info.results
    for (i = 0; i < recommender.length; i += 1) {
        if (recommender[i].backdrop_path === null) {
            continue
        }
        const newName = recommender[i].original_title.length > 20
            ? recommender[i].original_title.slice(0, 20) + '...'
            : recommender[i].original_title
        const recommendOwl = `
            <div class="recommend-item">
                <img src="${IMG_PATH + recommender[i].backdrop_path}" alt="">
                <div class="item-vote">
                  <span class=" icon fa fa-star checked"></span>
                  <span>${recommender[i].vote_average}</span>
                </div>
                <div class="item-name">
                  ${newName}
                </div>
              </div>
        `
        owl_carousel.owlCarousel("add", recommendOwl);
    }
    owl_carousel.owlCarousel("update");
}
recommendations()