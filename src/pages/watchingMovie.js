import movieVideo from '../components/watchingMovies/movieVideo.js';
import movieInfoDetail from '../components/watchingMovies/movieInfoDetail.js';
import movieType from '../components/watchingMovies/movieType.js';

const urlParams = new URLSearchParams(window.location.search);
const idMovie = urlParams.get('id');

movieVideo(idMovie)
movieInfoDetail(idMovie)
// -------------------------------------------------------------Toprated------------------------------------------------
movieType('top_rated')
movieType('up_coming')
