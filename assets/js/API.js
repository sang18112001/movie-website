if (!localStorage.getItem('signAccount')) {
  localStorage.setItem('signAccount', JSON.stringify({ uid: '' }));
}
const uid = JSON.parse(localStorage.getItem('signAccount')).uid;

const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;
const API_URL = `https://api.themoviedb.org/3`;
const API_KEY = `3fd2be6f0c70a2a598f084ddfb75487c`;
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';
const personalAPI = `https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app`;
const moviesType = {
  popularity: 'discover/movie',
  top_rated: 'movie/top_rated',
  up_coming: 'movie/upcoming',
  now_playing: 'movie/now_playing',
};
const nonAvatar = `https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg`;

const getAPI = {
  getMovies: async (type = 'popularity', page = '1', genres = '', lang = '', year = '') =>
    (
      await fetch(
        `${API_URL}/${moviesType[type]}?api_key=${API_KEY}&with_genres=${genres}&with_original_language=${lang}&primary_release_year=${year}&page=${page}`,
      )
    ).json(),
  getInfoDetail: async (id, typeDetail = '') =>
    (await fetch(`${API_URL}/movie/${id}${typeDetail}?api_key=${API_KEY}`)).json(),
  getSearchMovies: async (querySearch) =>
    (await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${querySearch}`)).json(),
  getMyGenres: async () => (await fetch(`https://new-api-three.vercel.app/genres`)).json(),
  getInfoUser: async (idUser) => (await fetch(`${personalAPI}/user/${idUser}.json`)).json(),
  getInfoComments: async () => (await fetch(`${personalAPI}/comments.json`)).json(),
  changeUserInfo: async (userInfo) =>
    await fetch(`${personalAPI}/user/${uid}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    }),
};

export {getAPI, IMG_PATH, uid, personalAPI}
