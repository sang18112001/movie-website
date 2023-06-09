import header from './components/common/header.js';
import footer from './components/common/footer.js';
// Header
header();

// Loaders
var loader = document.getElementById('preloader');
window.addEventListener('load', () => {
  loader.style.display = 'none';
});

// Log out account
const signOutBtns = document.querySelectorAll('.log-out');
signOutBtns.forEach((signOutBtn) => {
  signOutBtn.addEventListener('click', () => localStorage.setItem('signAccount', JSON.stringify({ uid: '' })));
});

// Footer
footer();
