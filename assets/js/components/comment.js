import { IMG_PATH, getAPI, personalAPI, uid } from '../API.js';

const commentType = document.querySelector('.movie-comments input');
const commentSubmitBtn = document.querySelector('.movie-comments button');
const commentBox = document.querySelector('.comment-box');
// Add comment to html
const addCmt = (user, cmt, imgPath, time) => {
  let avatar = '';
  if (!imgPath) {
    avatar = 'https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg';
  } else if (imgPath.includes('https')) {
    avatar = imgPath.slice(1);
  } else if (imgPath.startsWith('/')) {
    avatar = IMG_PATH + imgPath;
  } else {
    avatar = imgPath;
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

const updateCmt = (data_comments, data_accounts, movie_id) => {
  // If data_comments and data_comments[movie_id] are not null, I will get array of all comments from API and show them
  const submitForm = document.querySelector('.comment-me form');
  let allComments = [];
  if (data_comments && data_comments[movie_id]) {
    allComments = data_comments[movie_id].comment;
    allComments.forEach((comment) => {
      const userAvatar = Object.keys(data_accounts).includes(comment.userId) && data_accounts[comment.userId].avatar;
      addCmt(comment.author, comment.content, userAvatar, comment.updated_at);
    });
  }

  submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    !uid && alert('Sign in before comment');
    const date = new Date();
    const time = `${date.getFullYear()} - ${
      date.getMonth() + 1
    } - ${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const new_comment = commentType.value;
    new_comment != '' && upCmtWithExistedID(allComments, new_comment, data_accounts, uid, time, movie_id);
    commentType.value = '';
  });
};

function upCmtWithExistedID(allComments, cmt, infoUser, uid, time, movie_id) {
  console.log(infoUser)
  let newItem = {
    author: infoUser[uid].name,
    userId: uid,
    content: cmt,
    updated_at: time,
  };
  allComments.push(newItem);
  let newListComments = {
    comment: allComments,
  };
  const stringNewComment = JSON.stringify(newListComments);
  fetch(`${personalAPI}/comments/${movie_id}.json`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: stringNewComment,
  });
  addCmt(newItem.author, newItem.content, infoUser[uid].avatar, newItem.updated_at);
}

// Movie API on website
const APIMovieUpload = async (movie_id) => {
  // Upload comments from TMDB API
  getAPI.getInfoDetail(movie_id, '/reviews').then((tmdbComments) => {
    tmdbComments.results.forEach((element) => {
      addCmt(element.author, element.content, element.author_details.avatar_path, element.updated_at);
    });
  });
  // Upload comments from personal API
  getAPI.getInfoComments().then((data_comments) => {
    getAPI.getInfoUser('').then((data_accounts) => {
      console.log(data_accounts);
      updateCmt(data_comments, data_accounts, movie_id);
    });
  });
};

export default APIMovieUpload;
