const getQueryDashboard = new URLSearchParams(window.location.search);
const queryDashboard = Object.fromEntries(getQueryDashboard.entries()).queryDashboard;
const dashboardHeader = document.querySelector(`.dashboard-${queryDashboard}`);
dashboardHeader.classList.add('active-dashboard');

const dashboardPerform = () => {
  queryDashboard === 'account' ? accountDashboardPerform() : wishListDashboardPerform();
};
dashboardPerform();
