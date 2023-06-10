import getAPI from '../../api/api.js';
import { IMG_PATH } from '../../constants/constants.js';

export default (movie_id) => {
  getAPI.getInfoDetail(movie_id, '/recommendations').then((recommend_info) => {
    getAPI.getMovies().then((recommendRandom_info) => {
      const mainRecommend = recommend_info.results;
      const secondRecommend = recommendRandom_info.results;
      const recommendations = document.querySelector('.recommend-main');
      let numRecommends, recommender;
      if (mainRecommend.length != 0) {
        numRecommends = mainRecommend.length < 20 ? mainRecommend.length : 20;
        recommender = mainRecommend;
      } else {
        numRecommends = secondRecommend.length;
        recommender = secondRecommend;
      }
      for (let i = 0; i < numRecommends; i += 1) {
        if (recommender[i].backdrop_path === null) {
          continue;
        }
        recommendations.innerHTML += `
          <div class="recommend-item">
            <a href="detailMovie.html?id=${recommender[i].id}">
              <img src="${IMG_PATH + recommender[i].backdrop_path}" alt="">
            </a>
            <div class="item-vote">
              <span class=" icon fa fa-star checked"></span>
              <span>${recommender[i].vote_average.toFixed(1)}</span>
            </div>
            <div class="item-name">
              ${recommender[i].original_title}
            </div>
          </div>
        `;
      }
      $('.recommend-main').slick({
        infinite: true,
        dots: false,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        responsive: [
          {
            breakpoint: 0,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1000,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          },
        ],
      });
    });
  });
};
