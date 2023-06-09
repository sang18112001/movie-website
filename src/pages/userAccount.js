// Get current page
import signInAccount from '../components/userAccount/signIn.js';
import signUpAccount from '../components/userAccount/signUp.js';
const currentPage = localStorage.getItem('currentPage');
// Transission sign in and sign up
const signInBox = document.querySelector('.sign-in-body');
const signUpBox = document.querySelector('.sign-up-body');
const signInTitle = document.querySelector('.sign-in-title');
const signUpTitle = document.querySelector('.sign-up-title');
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


signInAccount(signInBox, currentPage);
signUpAccount(signUpBox, upToIn)