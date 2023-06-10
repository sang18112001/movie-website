if (!localStorage.getItem('signAccount')) {
  localStorage.setItem('signAccount', JSON.stringify({ uid: '' }));
}
const uid = JSON.parse(localStorage.getItem('signAccount')).uid;

const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;
const API_URL = `https://api.themoviedb.org/3`;
const API_KEY = `3fd2be6f0c70a2a598f084ddfb75487c`;
const personalAPI = `https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app`;
const moviesType = {
  popularity: 'discover/movie',
  top_rated: 'movie/top_rated',
  up_coming: 'movie/upcoming',
  now_playing: 'movie/now_playing',
};
const nonAvatar = `https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg`;
const nonImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png?20200912122019';

const COLOR_VOTE = (voteScore) =>
  voteScore >= 8 ? 'rgb(76 199 144)' : voteScore >= 6 ? 'rgb(253 255 0)' : voteScore >= 4 ? 'orange' : 'red';
export { API_URL, API_KEY, moviesType, IMG_PATH, uid, personalAPI, nonAvatar, nonImage, COLOR_VOTE };
