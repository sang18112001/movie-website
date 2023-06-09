import { API_KEY, API_URL, moviesType, personalAPI, uid } from '../constants/constants.js';

const getAPI = {
  getMovies: async (type = 'popularity', page = '1', genres = '', lang = '', year = '') => {
    const response = await axios.get(
      `${API_URL}/${moviesType[type]}?api_key=${API_KEY}&with_genres=${genres}&with_original_language=${lang}&primary_release_year=${year}&page=${page}`,
    );
    return response.data;
  },
  getInfoDetail: async (id, typeDetail = '') => {
    const response = await axios.get(`${API_URL}/movie/${id}${typeDetail}?api_key=${API_KEY}`);
    return response.data;
  },
  getSearchMovies: async (querySearch) => {
    const response = await axios.get(`${API_URL}/search/movie?api_key=${API_KEY}&query=${querySearch}`);
    return response.data;
  },
  getMyGenres: async () => {
    const response = await axios.get(`https://new-api-three.vercel.app/genres`);
    return response.data;
  },
  getInfoUser: async (idUser) => {
    const response = await axios.get(`${personalAPI}/user/${idUser}.json`);
    return response.data;
  },
  getInfoComments: async (movie_id = '') => {
    const response = await axios.get(`${personalAPI}/comments/${movie_id}.json`);
    return response.data;
  },
  changeUserInfo: async (updateParams) => {
    const response = await axios.patch(`${personalAPI}/user/${uid}.json`, updateParams);
    return response.data;
  },
  updateListComments: async (updateParams) => {
    const response = await axios.patch(`${personalAPI}/comments.json`, updateParams);
    return response.data;
  },
  addNewComment: async (comments, movie_id) => {
    const response = await axios.post(`${personalAPI}/comments/${movie_id}.json`, comments);
    return response.data;
  },
  deleteComment: async (idMovie, idComment) => {
    const response = await axios.delete(`${personalAPI}/comments/${idMovie}/${idComment}.json`);
    return response.data;
  },
  editComment: async (idMovie, idComment, editValue) => {
    const response = await axios.patch(`${personalAPI}/comments/${idMovie}/${idComment}.json`, editValue);
    return response.data;
  },
};

export default getAPI;
