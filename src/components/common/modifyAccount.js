import getAPI from '../../api/api.js';
import { nonAvatar, uid } from '../../constants/constants.js';

export default () => {
  getAPI.getInfoUser(uid).then((userInfo) => {
    const accountName = document.querySelectorAll('.account_name');
    const loggedAccount = document.querySelector('.account-logged img');
    const accountAvt = document.querySelectorAll('.account_avt');
    const meAvt = document.querySelector('.comment-me img');
    if (uid) {
      accountName.forEach((nameUser) => (nameUser.innerHTML = userInfo.name));
      loggedAccount.src = userInfo.avatar || nonAvatar;
      accountAvt.forEach((avtImg) => (avtImg.src = userInfo.avatar || nonAvatar));
      if (meAvt) meAvt.src = userInfo.avatar || nonAvatar;
    }
  });
};
