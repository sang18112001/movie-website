import accountDashboardPerform from './components/account.js';
import wishListDashboardPerform from './components/wishList.js';

const paramsDashboard = new URLSearchParams(window.location.search);
console.log(paramsDashboard);
const queryDashboard = paramsDashboard.get('queryDashboard');
const dashboardHeader = document.querySelector(`.dashboard-${queryDashboard}`);
dashboardHeader.classList.add('active-dashboard');

const dashboardPerform = () => {
  queryDashboard === 'account' ? accountDashboardPerform() : wishListDashboardPerform();
  document.title = queryDashboard === 'account' ? 'My account' : 'My wishlist';
};
dashboardPerform();
