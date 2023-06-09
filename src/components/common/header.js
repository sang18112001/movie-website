
import { nonAvatar, uid } from '../../constants/constants.js';
import searchBox from '../common/search.js';
import headerResponsive from './headerResponsive.js';
import modifyAccount from './modifyAccount.js';

export default () => {
  const headerContainer = document.querySelector('header');
  headerContainer.innerHTML = `
      <div id="menu-icon">
         <div class="bar1 bar"></div>
         <div class="bar2 bar"></div>
         <div class="bar3 bar"></div>
      </div>
      <a class="web-logo" href="index.html">
         <img width="100%" src="./assets/image/logo.png" alt="">
      </a>
      <ul class="header-navbar">
         <div class="header-search">
            <input type="text" placeholder="Search">
         <ul class="header-search-items active-hidden"></ul>
         </div>
         <ul class="header-menu">
            <li><a class="active-menu" href="index.html">Home</a></li>
            <li><a href="typeOfMovies.html?type=now_playing">Now Playing</a></li>
            <li><a href="typeOfMovies.html?type=popularity">Popularity</a></li>
            <li><a href="typeOfMovies.html?type=top_rated">Top Rated</a></li>
            <li><a href="typeOfMovies.html?type=up_coming">Up Coming</a></li>
         </ul>
      </ul>
      <div class="icon-search "><span class="fa-sharp fa-solid fa-magnifying-glass"></span>
      </div>
      <div class="header-account account-log ${uid && 'active-hidden'} ">
         <div class="account-log-logo">
         <i class="account-icon fa-solid fa-user"></i>
         </div>
         <div class="account-log-button">
         <div class="log-box">
            <a href="sign-in.html" class="btn"><i class="fa-solid fa-user-plus"></i>Sign In</a>
         </div>
         </div>
      </div>
      <div class="header-account account-logged ${!uid && 'active-hidden'}">
         <div class="account-logged-logo">
            <img src="${nonAvatar}" alt="" class="logged-icon">
         </div>
         <div class="account-logged-button">
         <div class="logged-box">
            <div class="logged_account">
               <div><img class="account_avt" width="50px" height="50px"></img></div>
               <h3 class="account_name"></h3>
            </div>
            <div class="logged_dashboard">
               <a href="dashboard.html?queryDashboard=account" class="account"><span
                  class=" fa-regular fa-circle-user"></span> My
               account</a>
               <a href="dashboard.html?queryDashboard=wishList" class="wish-list"><span
                  class="fa-solid fa-heart"></span>Wishlist</a>
               <a href="index.html" class="btn log-out">
               <svg class="svg-icon"
                  style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M768 106V184c97.2 76 160 194.8 160 328 0 229.6-186.4 416-416 416S96 741.6 96 512c0-133.2 62.8-251.6 160-328V106C121.6 190.8 32 341.2 32 512c0 265.2 214.8 480 480 480s480-214.8 480-480c0-170.8-89.6-321.2-224-406z"
                     fill="" />
                  <path
                     d="M512 32c-17.6 0-32 14.4-32 32v448c0 17.6 14.4 32 32 32s32-14.4 32-32V64c0-17.6-14.4-32-32-32z"
                     fill="" />
               </svg>
               <p>Log out</p>
               </a>
            </div>
         </div>
         </div>
      </div> 
   `;
  searchBox();
  headerResponsive();
  modifyAccount();
};
