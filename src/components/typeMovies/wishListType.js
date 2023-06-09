import getAPI from '../../api/api.js';
import { uid } from '../../constants/constants.js';

// Add wishlist and remove
const addWishListHandler = (wishListBtns, userInfo) => {
  wishListBtns.forEach((wishListBtn) => {
    wishListBtn.addEventListener('click', () => {
      if (uid) {
        wishListBtn.classList.toggle('active-wishList');
        wishListBtn.classList.contains('active-wishList')
          ? (userInfo.wishList = userInfo.wishList ? [...userInfo.wishList, wishListBtn.id] : [wishListBtn.id])
          : (userInfo.wishList = userInfo.wishList.filter((item) => item !== wishListBtn.id));
        getAPI.changeUserInfo(userInfo);
      } else {
        alert('You have to sign in');
      }
    });
  });
};
export default addWishListHandler;
