import getAPI from '../../api/api.js';
import { IMG_PATH } from '../../constants/constants.js';

function embedPerform(medias, media_class, items_0, items_1, items_2) {
  const numMedias = medias.length < 20 ? medias.length : 20;
  const mediasOwl = document.querySelector(media_class);
  for (let i = 0; i < numMedias; i++) {
    mediasOwl.innerHTML += `<img src="${IMG_PATH + medias[i].file_path}">`;
  }
  $(mediasOwl).slick({
    dots: false,
    infinite: true,
    slidesToShow: items_2,
    slidesToScroll: items_2,
    arrows: false,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: items_2,
          slidesToScroll: items_2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: items_1,
          slidesToScroll: items_1,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: items_0,
          slidesToScroll: items_0,
        },
      },
    ],
  });
}

export default (movie_id) => {
  getAPI.getInfoDetail(movie_id, '/images').then((media_info) => {
    embedPerform(media_info.posters, '.posters', 2, 3, 5);
    embedPerform(media_info.backdrops, '.backdrops', 1, 2, 2);
  });
};
