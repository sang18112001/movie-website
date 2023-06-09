export default () => {
  const header = document.querySelector('header');
  const show_menu = document.querySelector('#menu-icon');
  const searchBtn = document.querySelector('.icon-search');
  const log_account = document.querySelector('.account-log-button');
  const show_log_account = document.querySelector('.account-log-logo');
  const logged_account = document.querySelector('.account-logged-button');
  const show_logged_account = document.querySelector('.account-logged-logo');
  // Menu
  show_menu.addEventListener('click', () => {
    header.classList.toggle('active-header-menu');
    header.classList.remove('active-header-search');
    log_account.classList.remove('active-block');
    logged_account.classList.remove('active-block');
  });
  // Search
  searchBtn.addEventListener('click', () => {
    header.classList.remove('active-header-menu');
    header.classList.toggle('active-header-search');
    log_account.classList.remove('active-block');
    logged_account.classList.remove('active-block');
  });
  // Account
  show_log_account.addEventListener('click', () => {
    log_account.classList.toggle('active-block');
    header.classList.remove('active-header-menu');
    header.classList.remove('active-header-search');
  });
  show_logged_account.addEventListener('click', () => {
    logged_account.classList.toggle('active-block');
    header.classList.remove('active-header-menu');
    header.classList.remove('active-header-search');
  });
};
