import getAPI from '../../api/api.js';
import { nonAvatar, uid } from '../../constants/constants.js';
import { getTime } from '../../utils/utils.js';
import commentFeatures from './commentFeatures.js';
const commentType = document.querySelector('.movie-comments input');
const commentBox = document.querySelector('.comment-box');
const newComment = (comment) => {
  return `
    <div class="comment-personal" id="${comment.idCmt}">
      <div class="comment">
        <div class="comment-info">
          <img src="${comment.avatar || nonAvatar}" />
          <div class="comment-content">
            <div class="comment-author">
              <span class="comment-name">${comment.author}</span>
              <span class="comment-identity ${comment.userId !== uid && 'active-hidden'}">you</span>
            </div>
            <div class="comment-time">Updated at: ${comment.time}</div>
          </div>
        </div>
        <div class="comment-features ${comment.userId != uid && 'active-hidden'}">
          <div class="comment-delete">
            <i class="fa-solid fa-trash"></i>
            <span >Delete</span>
          </div>
          <div class="comment-edit">
            <i class="fa-solid fa-pen"></i>
            <span>Edit</span>
          </div>
        </div>
        <div class="comment-text">${comment.content}</div>
      </div>
      <form action="" class="active-hidden commentEditBox">
        <p>Add a new comment:</p>
        <div class="commentContainer">
          <input name="edit" class="comment-input" type="text" value=${comment.content} placeholder="Edit this comment">
          <button class="btn">Update</button>
        </div>
      </form>
    </div>
  `;
};

const showCommentBox = (listComments, movie_id) => {
  commentBox.innerHTML = '';
  listComments.forEach((comment) => {
    commentBox.innerHTML += newComment(comment);
  });
  commentFeatures(movie_id);
};

const commentHandler = (data_comments, data_accounts, movie_id) => {
  // If data_comments and data_comments[movie_id] are not null, I will get array of all comments from API and show them
  const submitForm = document.querySelector('.comment-me form');
  if (data_comments) {
    const valuesComment = Object.values(data_comments);
    const keysAccount = Object.keys(data_accounts);
    valuesComment.forEach((comment) => {
      if (keysAccount.includes(comment.userId)) {
        const account = data_accounts[comment.userId];
        comment.author = account.name;
        comment.avatar = account.avatar;
      }
    });
    showCommentBox(valuesComment, movie_id);
  }
  submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    !uid && alert('You have to sign in first');
    if (commentType.value) {
      const newCmt = {
        author: data_accounts[uid].name,
        idCmt: Date.now(),
        userId: uid,
        content: commentType.value,
        time: getTime(),
        avatar: data_accounts[uid].avatar,
      };
      getAPI.addNewComment(newCmt, movie_id);
      commentBox.innerHTML += newComment(newCmt);
    }
    commentType.value = '';
    commentFeatures(movie_id);
  });
};

// Movie API on website
const APIMovieUpload = async (movie_id) => {
  getAPI.getInfoComments(movie_id).then((data_comments) => {
    getAPI.getInfoUser('').then((data_accounts) => {
      commentHandler(data_comments, data_accounts, movie_id);
    });
  });
};

export default APIMovieUpload;
