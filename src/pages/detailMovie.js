import { scrollHeader } from '../utils/utils.js';
import commentsMovies from '../components/common/comment.js';
import recommendations from '../components/detail/recommendations.js';
import medias from '../components/detail/medias.js';
import mainDetail from '../components/detail/mainDetail.js';

// Header scroll
scrollHeader();

// Body function
const urlParams = new URLSearchParams(window.location.search);
const movie_id = urlParams.get('id');

// Main information
mainDetail(movie_id)

// Media
medias(movie_id);

// Comments
commentsMovies(movie_id);

// Recommendations
recommendations(movie_id)