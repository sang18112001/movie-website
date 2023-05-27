import { IMG_PATH, getAPI, uid } from "../API.js";

const wishListHandler = (wishList) => {
  const dashboardBox = document.querySelector('.dashboard-box');
  dashboardBox.classList.add('wishListClass');
  if (!wishList || wishList.length === 0) {
    dashboardBox.innerHTML = `
      <div class="wishlistEmpty-box">
        <div class="wishlistEmpty-image">
          <img width="100%" src = "/assets/image/wishlistEmpty_1.png">
        </div>
        <div class="wishlistEmpty-main">
          <h3 class="wishlistEmpty-title">
            Oops! Your list is empty!
          </h3>
          <p class="wishlistEmpty-content">
            Looks like you haven't added anything to your list yet.
          </p>
        </div>
        <a href="typeOfMovies.html?type=now_playing"class="wishlistEmpty-btn">
          <button >Explore now</button>
        </a>
      </div>
    `;
  } else {
    const getMoviePosterPaths = async () => {
      const posterPaths = [];
      for (const movieId of wishList) {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=3fd2be6f0c70a2a598f084ddfb75487c`,
        );
        const data = await response.json();
        // Reverse list
        posterPaths.unshift([data.id, data.poster_path]);
      }
      return posterPaths;
    };
    getMoviePosterPaths().then((posterPaths) => showWishListMovie(posterPaths, wishList, dashboardBox));
  }
};

const showWishListMovie = (posterPaths, wishList, dashboardBox) => {
  let innerWishList = '';
  for (const item of posterPaths) {
    innerWishList += `<div class="wishList-item col-4 col-md-4 col-xl-3">
            <div class="wishList-sub-item">
                <i id= "${item[0]}" class="fa-solid fa-heart-circle-minus active-wishList" style="font-size: 22px"></i>
                <a href="detailMovie.html?id=${item[0]}">
                  <img width="100%"src="${IMG_PATH + item[1]}">
                </a>
              </div>
            </div>`;
  }
  dashboardBox.innerHTML = `
          <h4 class="wishList-header"><span>My favourite</span></h4>
          <div class="wishList-box container">
            <div class="row">${innerWishList}</div>
          </div>
      `;

  const wishListBtns = document.querySelectorAll('.wishList-sub-item i');
  wishListBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const newWishList = wishList.filter((item) => item !== btn.id);
      wishListHandler(newWishList);
      getAPI.getInfoUser(uid).then((userInfo) => {
        userInfo.wishList = newWishList;
        getAPI.changeUserInfo(userInfo);
      });
    });
  });
};

const wishListDashboardPerform = () => {
  getAPI.getInfoUser(uid).then((userInfo) => wishListHandler(userInfo.wishList));
};

export default wishListDashboardPerform