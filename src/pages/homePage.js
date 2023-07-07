import homeGenres from '../components/home/homeGenres.js';
import homeGrid from '../components/home/homeGrid.js';
import homePopularity from '../components/home/homePopularity.js';
import homeToprated from '../components/home/homeToprated.js';
import { scrollHeader } from '../utils/utils.js';
// Header scroll
scrollHeader();

// Get components
homePopularity();
homeToprated()
homeGrid('now_playing')
homeGrid('up_coming')
// homeGenres();

