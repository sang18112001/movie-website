import getAPI from '../../api/api.js';
import { uid } from '../../constants/constants.js';

const accountDashboardPerform = () => {
  const dashboardBox = document.querySelector('.dashboard-box');
  dashboardBox.classList.remove('wishListClass');
  dashboardBox.innerHTML = `
     <h1 style="text-align: center">Account Modification</h1>
     <div class="dashboard-box-main">
        <div class="dashboard-avt">
           <p style="font-size: 18px;">Change your avatar:</p>
           <div class="avatar-container">
             <img src="" class="account_avt" width="100%"></img>
             <label for="inputTag">
                <div class="icon-change">
                  <i class="fa-regular fa-pen" ></i>
                </div>
                <input type="file" name="avatar" id="inputTag" title=" " style="display:none"/>
              </label>
          </div>
        </div>
        <div class="form_box">
          <form class="dashboard-content">
            <div class="name-change">
              <label for="username">Username:</label>
              <input name="username" placeholder="Change your name">
            </div>
            <div class="password-old">
              <label for="old_password">Your Password <span style="color: red; font-size: 20px">*</span>:</label>
              <input name="old_password" type="password"placeholder="Your password">
              <p class="checkPassword active-hidden">Passwords don't match</p>
            </div>
          </form>
          <form>
            <div class="password-change">
              <label for="password">New Password:</label>
              <input name="password" type="password"placeholder="New password">
            </div>
            <div class="password-confirm">
              <label for="confirm_password">Confirm Password:</label>
              <input name="confirm_password" type="password"placeholder="Confirm password">
              <p class="checkPassword active-hidden">Passwords don't match</p>
            </div>
          </form>
        </div>
      </div>
      <button class="btn dashboard-submit">Save</button>
     `;
  const accountObj = {
    passBtn: document.querySelector('input[name="password"]'),
    submitBtn: document.querySelector('.dashboard-submit'),
    wrongBox: document.querySelectorAll('.checkPassword'),
    oldPass: document.querySelector('input[name="old_password"]'),
  };

  getAPI.getInfoUser(uid).then((userInfo) => {
    accountObj.submitBtn.disabled = userInfo.password != accountObj.oldPass.value;
    handleOldPassword(accountObj, userInfo);
    handleConfirmPassword(accountObj);
    handleSubmit(accountObj, userInfo);
  });
};

const handleOldPassword = ({ oldPass, wrongBox, submitBtn }, userInfo) => {
  oldPass.addEventListener('input', (e) => {
    if (e.target.value != userInfo.password) {
      wrongBox[0].classList.remove('active-hidden');
      oldPass.classList.add('wrong-account');
      submitBtn.disabled = true;
    } else {
      wrongBox[0].classList.add('active-hidden');
      oldPass.classList.remove('wrong-account');
      submitBtn.disabled = false;
    }
  });
};

const handleConfirmPassword = ({ wrongBox, passBtn, submitBtn }) => {
  const confirmPass = document.querySelector('input[name="confirm_password"]');
  confirmPass.addEventListener('input', (e) => {
    if (e.target.value != passBtn.value) {
      wrongBox[1].classList.remove('active-hidden');
      confirmPass.classList.add('wrong-account');
      submitBtn.disabled = true;
    } else {
      wrongBox[1].classList.add('active-hidden');
      confirmPass.classList.remove('wrong-account');
      submitBtn.disabled = false;
    }
  });
};

const handleSubmit = ({ passBtn, submitBtn }, userInfo) => {
  const avatarBtn = document.querySelector('input[name="avatar"]');
  const nameBtn = document.querySelector('input[name="username"]');
  const avtBox = document.querySelector('.dashboard-box-main .account_avt');
  let newAvatarUrl = '';
  avatarBtn.addEventListener('change', (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    newAvatarUrl = reader;
    reader.addEventListener('load', () => {
      avtBox.src = reader.result;
    });
  });
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newUserInfo = {
      avatar: newAvatarUrl?.result || userInfo.avatar,
      email: userInfo.email,
      name: nameBtn.value || userInfo.name,
      password: passBtn.value || userInfo.password,
    };
    getAPI.changeUserInfo(newUserInfo);
    window.location.reload();
    alert('Success');
  });
};

export default accountDashboardPerform;
