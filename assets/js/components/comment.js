const commentType = document.querySelector('.movie-comments input');
const commentSubmitBtn = document.querySelector('.movie-comments button');
const commentBox = document.querySelector('.comment-box');
// Add comment to html
const addCmt = (user, cmt, imgPath, time) => {
  if (imgPath === '' || imgPath === null) {
    avatar = 'https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg';
  } else if (imgPath.includes('https')) {
    avatar = imgPath.slice(1);
  } else if (imgPath[0] === '/') {
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

// Movie API on website
const APIMovieUpload = async (needed_id) => {
  getAPI.getInfoDetail(needed_id, '/reviews').then((tmdbComments) => {
    tmdbComments.results.forEach((element) => {
      addCmt(element.author, element.content, element.author_details.avatar_path, element.updated_at);
    });
  });
  getAPI.getInfoComments().then((data_comments) => {
    getAPI.getInfoUser(uid).then((data_accounts) => {
      updateCmt(data_comments, data_accounts);
    });
  });
};

const updateCmt = (data_comments, data_accounts) => {
  // If data_comments and data_comments[needed_id] are not null, I will get array of all comments from API and show them
  const submitForm = document.querySelector('.comment-me form');
  if (data_comments != null && data_comments[needed_id] != null) {
    allComments = data_comments[needed_id].comment;
    allComments.forEach((comment) => {
      addCmt(comment.author, comment.content, comment.avatar, comment.updated_at);
    });
  } else {
    allComments = [];
  }
  submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    !uid && alert('Sign in before comment');
    const date = new Date();
    const time = `${date.getFullYear()} - ${
      date.getMonth() + 1
    } - ${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const new_comment = commentType.value;
    new_comment != '' && upCmtWithExistedID(new_comment, data_accounts.name, data_accounts.avatar, time);
    commentType.value = '';
  });
};

function upCmtWithExistedID(cmt, user, avatar, time) {
  newItem = {
    author: user,
    avatar: avatar,
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
  addCmt(newItem.author, newItem.content, newItem.avatar, newItem.updated_at);
}
