import getAPI from '../../api/api.js';
import toast from '../common/toastMessage.js';

const submitHandle = (submitBtn, emailsList, signUpBox, upToIn) => {
  const licenceInput = document.querySelector('.licence input');
  const licenceWrong = document.querySelector('.checkAllow');
  submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (licenceInput.checked) {
      licenceWrong.classList.add('active-hidden');
      upLoadUser(emailsList, signUpBox, upToIn);
    } else {
      licenceWrong.classList.remove('active-hidden');
    }
  });
};

const upLoadUser = (emailsList, signUpBox, upToIn) => {
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

const signUpAccount = (signUpBox, upToIn) => {
  getAPI.getInfoUser('').then((userInfo) => {
    const infosList = Object.values(userInfo);
    const emailsList = infosList.map((info) => info.email);
    const submitBtn = document.querySelector('.sign-up-body button');
    emailHandle(submitBtn, emailsList);
    passwordHandle(submitBtn);
    avatarHandle();
    submitHandle(submitBtn, emailsList, signUpBox, upToIn);
  });
};

export default signUpAccount;
