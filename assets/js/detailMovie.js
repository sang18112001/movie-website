// Body function
const urlParams = new URLSearchParams(window.location.search);
const needed_id = urlParams.get("id");
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
  const movieContainer = document.querySelector(".movie-container");
  const movieAPI = await fetch(API_URL);
  const movie_info = await movieAPI.json();
  const castsAPI = await fetch(ALL_CAST);
  const casts_info = await castsAPI.json();
  const genres = movie_info.genres.map((genre) => genre.name).join(", ");
  const casts = casts_info.cast
    .slice(0, 5)
    .map((cast) => cast.original_name)
    .join(", ");
  // const detailLink = !uid ? `watchingMovie.html` : `watchingMovie.html?uid=${uid}&id=${needed_id}`
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
                <p><span class="title-info">IMDB:</span> ${
                  movie_info.vote_average
                }</p>
                <p><span class="title-info">Time:</span> ${
                  movie_info.runtime
                } minutes</p>
                <p><span class="title-info">Genres:</span> ${genres}</p>
              </div>
              <div class="movie-cast">
                <p><span class="title-info">Date:</span> ${
                  movie_info.release_date
                }</p>
                <span class="title-info">Diễn viên: </span> ${casts},...
              </div>
            </div>
            <a href="#">
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
// Casts
async function castsEmbeding() {
  const castAPI = await fetch(ALL_CAST);
  const casts_info = await castAPI.json();
  const casts = casts_info.cast;
  const castsOwl = document.querySelector(".casts-content");
  const numCasts = casts.length < 20 ? casts.length : 20;
  for (i = 0; i < numCasts; i++) {
    const castOwl = `
            <div class="cast">
                <div class="cast-avt">
                    <img src="${IMG_PATH + casts[i].profile_path}" alt="">
                </div>
                <div class="cast-name">
                    <p class="original-name">${casts[i].original_name
                      .split(" ")
                      .slice(0, 2)
                      .join(" ")}</p>
                    <p class="character-name">${casts[i].character}</p>
                </div>
            </div>
        `;
    castsOwl.innerHTML += castOwl;
  }
  $(document).ready(function () {
    $(".casts-content").owlCarousel({
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
        1005: {
          items: 5,
        },
        1200: {
          items: 6,
        },
      },
    });
  });
}
castsEmbeding();
// Media
const changeMediaType = () => {
  const mediaBtn = document.querySelectorAll(".button-media");
  const subMediaBox = document.querySelectorAll(".sub-media");
  mediaBtn.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      mediaBtn.forEach((element, index) => {
        element.classList.remove("active-media");
        subMediaBox[index].classList.remove("active-block");
      });
      btn.classList.add("active-media");
      subMediaBox[i].classList.add("active-block");
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
  const postersOwl = document.querySelector(".posters");
  for (i = 0; i < numPosters; i++) {
    const posterOwl = `
            <img src="${IMG_PATH + medias[i].file_path}">
        `;
    postersOwl.innerHTML += posterOwl;
  }
  $(".posters").owlCarousel({
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
  const backdropsOwl = document.querySelector(".backdrops");
  for (i = 0; i < numBackdrops; i++) {
    const backdropOwl = `
            <img src="${IMG_PATH + medias[i].file_path}">
        `;
    backdropsOwl.innerHTML += backdropOwl;
  }
  $(".backdrops").owlCarousel({
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

const commentType = document.querySelector(".movie-comments input");
const commentSubmitBtn = document.querySelector(".movie-comments button");
const commentBox = document.querySelector(".comment-box");

// Add comment to html
const addCmt = (user, cmt, imgPath, time) => {
    console.log(imgPath);
  if (imgPath === null) {
    avatar =
      "https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg";
  } else if (imgPath.includes("https")) {
    avatar = imgPath.slice(1);
  } else {
    avatar = IMG_PATH + imgPath;
  }
  console.log(avatar);
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
                ${cmt.split(".")[0] + "."}
            </div>
        </div>
    `;
};

// Movie API on website
const APIMovieUpload = async () => {
  const res = await fetch(`${COMMENTS}`);
  const data = await res.json();
  console.log(data);
  data.results.forEach((element) => {
    console.log(element.author_details.avatar_path);
    addCmt(
      element.author,
      element.content,
      element.author_details.avatar_path,
      element.updated_at
    );
  });
  uploadCmtToAPI();
};
APIMovieUpload();

// Up load cmt from API to html
const uploadCmtToAPI = () => {
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
        addCmt(comment.user, comment.cmt, null, comment.time);
      });
    } else {
      allComments = [];
    }
    // Get value from input then update value to API and show them
    commentSubmitBtn.addEventListener("click", (element) => {
      element.preventDefault();
      const date = new Date();
      const time = `${date.getFullYear()} - ${
        date.getMonth() + 1
      } - ${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      const new_comment = commentType.value;
      if (new_comment != "") {
        upCmtWithExistedID(new_comment, data_accounts.name, null, time);
      }
      commentType.value = "";
    });
  };
  APILoading();
};

function upCmtWithExistedID(cmt, user, avatar_path, time) {
  newItem = {
    user: user,
    cmt: cmt,
    time: time,
  };
  allComments.push(newItem);
  newListComments = {
    comment: allComments,
  };
  const stringNewComment = JSON.stringify(newListComments);
  fetch(`${personalAPI}/comments/${needed_id}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: stringNewComment,
  });
  addCmt(user, cmt, null, time);
}

// Recommendations
async function recommendations() {
  const recommnedsOwl = document.querySelector(".recommend-main");
  const recommend = await fetch(RECOMMENDATION);
  const recommend_info = await recommend.json();
  const recommender = recommend_info.results;
  const numRecommends = recommender.length < 20 ? recommender.length : 20;
  for (i = 0; i < numRecommends; i += 1) {
    if (recommender[i].backdrop_path === null) {
      continue;
    }
    const newName =
      recommender[i].original_title.length > 20
        ? recommender[i].original_title.slice(0, 20) + "..."
        : recommender[i].original_title;
    const newLink = !uid
      ? `sign-in.html`
      : `detailMovie.html?uid=${uid}&id=${recommender[i].id}`;
    const recommendOwl = `
            <div class="recommend-item">
                <a href="${newLink}">
                    <img src="${
                      IMG_PATH + recommender[i].backdrop_path
                    }" alt="">
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
    $(".recommend-main").owlCarousel({
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
