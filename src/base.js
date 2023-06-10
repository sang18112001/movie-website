import header from './components/common/header.js';
import footer from './components/common/footer.js';
// Header
header();

// Loaders
window.addEventListener('load', () => {
  document.getElementById('preloader').style.display = 'none';
});

// Log out account
document.querySelectorAll('.log-out').forEach((signOutBtn) => {
  signOutBtn.addEventListener('click', () => localStorage.setItem('signAccount', JSON.stringify({ uid: '' })));
});

// Footer
footer();
