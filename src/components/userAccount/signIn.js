import getAPI from '../../api/api.js';
function signInAccount(signInBox, currentPage) {
  signInBox.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(signInBox);
    const your_account = Object.fromEntries(formData);
    getAPI.getInfoUser('').then((userInfo) => {
      if (userInfo) {
        const listUid = Object.keys(userInfo);
        const listUserInfo = Object.values(userInfo);
        const index = listUserInfo.findIndex(
          (value) => value.email == your_account.email && value.password == your_account.password,
        );
        if (index !== -1) {
          document.querySelector('.sign-in-wrong-container').classList.add('active-hidden');
          localStorage.setItem('signAccount', JSON.stringify({ uid: listUid[index] }));
          const nextPage = currentPage || 'index.html';
          window.location.assign(nextPage);
          localStorage.setItem('currentPage', '');
        } else {
          document.querySelector('.sign-in-wrong-container').classList.remove('active-hidden');
        }
      }
    });
  });
}
export default signInAccount;
