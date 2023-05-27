// Get current page
import {getAPI} from './API.js';
import toast from './components/toastMessage.js';
const currentPage = localStorage.getItem('currentPage');
// Transission sign in and sign up
const signInBox = document.querySelector('.sign-in-body');
const signUpBox = document.querySelector('.sign-up-body');
const signInTitle = document.querySelector('.sign-in-title');
const signUpTitle = document.querySelector('.sign-up-title');
const signInBtn = document.querySelector('.sign-in-body button');
const signUpBtn = document.querySelector('.sign-up-body button');
const signIntoUp = document.querySelectorAll('.sign-in-to-up');
const signUptoIn = document.querySelectorAll('.sign-up-to-in');

function inToUp() {
  signInBox.classList.add('active-hidden');
  signUpBox.classList.remove('active-hidden');
  signInTitle.classList.add('active-sign');
  signUpTitle.classList.remove('active-sign');
  document.querySelector('.sign-in-wrong-container').classList.add('active-hidden');
}

function upToIn() {
  signInBox.classList.remove('active-hidden');
  signUpBox.classList.add('active-hidden');
  signInTitle.classList.remove('active-sign');
  signUpTitle.classList.add('active-sign');
}

Array.from(signIntoUp).map((btn) => btn.addEventListener('click', inToUp));
Array.from(signUptoIn).map((btn) => btn.addEventListener('click', upToIn));

// Sign in and sign up account
// sign in
function signInAccount() {
  signInBox.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(signInBox);
    const your_account = Object.fromEntries(formData);
    getAPI.getInfoUser('').then((userInfo) => {
      const listUid = Object.keys(userInfo);
      const listUserInfo = Object.values(userInfo);
      const index = listUserInfo.findIndex(
        (value) => value.email == your_account.email && value.password == your_account.password,
      );
      if (index !== -1) {
        document.querySelector('.sign-in-wrong-container').classList.add('active-hidden');
        localStorage.setItem('signAccount', JSON.stringify({ uid: listUid[index] }));
        window.location.assign(currentPage);
        localStorage.setItem('currentPage', '');
      } else {
        document.querySelector('.sign-in-wrong-container').classList.remove('active-hidden');
      }
    });
  });
}

signInAccount();

getAPI.getInfoUser('').then((userInfo)=> {
  const infosList = Object.values(userInfo);
  const emailsList = infosList.map((info) => info.email);
  const submitBtn = document.querySelector('.sign-up-body button');
  emailHandle(submitBtn, emailsList);
  passwordHandle(submitBtn);
  avatarHandle();
  submitHandle(submitBtn, emailsList);
})

const submitHandle = (submitBtn, emailsList) => {
  const licenceInput = document.querySelector('.licence input');
  const licenceWrong = document.querySelector('.checkAllow');
  submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (licenceInput.checked) {
      licenceWrong.classList.add('active-hidden');
      upLoadUser(emailsList);
    } else {
      licenceWrong.classList.remove('active-hidden');
    }
  });
};

const upLoadUser = (emailsList) => {
  const formData = new FormData(signUpBox);
  const newUser = Object.fromEntries(formData);
  if (newUser.myName && newUser.email && newUser.password) {
    if (!emailsList.includes(newUser.email)) {
      const avatar = localStorage.getItem('thumbnail');
      const addNewAccount = {
        email: newUser.email,
        name: newUser.myName,
        password: newUser.password,
        avatar,
      };
      fetch('https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app/user.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addNewAccount),
      }).then((response) => response.json());
      upToIn();
      toast();
    }
  }
};

const emailHandle = (submitBtn, emailsList) => {
  const emailInput = document.querySelector('.sign-up-body .email');
  const emailWrong = document.querySelector('.sign-up-body .checkEmail');
  emailInput.addEventListener('input', () => {
    if (emailsList.includes(emailInput.value)) {
      emailWrong.classList.remove('active-hidden');
      emailInput.classList.add('wrong-account');
      submitBtn.disabled = true;
    } else {
      emailWrong.classList.add('active-hidden');
      emailInput.classList.remove('wrong-account');
      submitBtn.disabled = false;
    }
  });
};

const passwordHandle = (submitBtn) => {
  const passwordInput = document.querySelector('.sign-up-body .password');
  const re_passwordInput = document.querySelector('.sign-up-body .retype');
  const re_passwordWrong = document.querySelector('.sign-up-body .checkPassword');
  re_passwordInput.addEventListener('input', () => {
    if (re_passwordInput.value === passwordInput.value) {
      re_passwordWrong.classList.add('active-hidden');
      re_passwordInput.classList.remove('wrong-account');
      submitBtn.disabled = false;
    } else {
      re_passwordWrong.classList.remove('active-hidden');
      re_passwordInput.classList.add('wrong-account');
      submitBtn.disabled = false;
    }
  });
};

const avatarHandle = () => {
  const avatarInput = document.querySelector('#avatar');
  localStorage.setItem('thumbnail', '');
  avatarInput.addEventListener('change', (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
      localStorage.setItem('thumbnail', reader.result);
    });
  });
};
