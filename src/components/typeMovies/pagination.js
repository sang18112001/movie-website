import getAPI from "../../api/api.js";

const next_page_btn = document.querySelector('.next-page');
const prep_page_btn = document.querySelector('.prep-page');
const first_page_btn = document.querySelector('.first-page');
const last_page_btn = document.querySelector('.last-page');
// Handle enable and disable buttons
const handleBtns = {
  disabled: (btn) => {
    btn.disabled = true;
  },
  enabled: (btn) => {
    btn.disabled = false;
  },
};
// Check endable and disabled state
const checkButton = (afterBtn, beforeBtn, total, currentPage) => {
  if (currentPage == 1) {
    handleBtns.disabled(afterBtn);
    handleBtns.enabled(beforeBtn);
  }
  if (currentPage >= total) {
    handleBtns.disabled(beforeBtn);
    handleBtns.enabled(afterBtn);
  }
  if (total == 1) {
    handleBtns.disabled(beforeBtn);
    handleBtns.disabled(afterBtn);
  }
  if (currentPage > 1 && currentPage < total) {
    handleBtns.enabled(beforeBtn);
    handleBtns.enabled(afterBtn);
  }
};

// Get list buttons needed to show
const pageNumbers = (total, max, current) => {
  const half = Math.floor(max / 2);
  let to = max;
  if (current + half >= total) {
    to = total;
  } else if (current > half) {
    to = current + half;
  }
  let from = Math.max(to - max, 0);
  return Array.from({ length: Math.min(total, max) }, (_, i) => i + 1 + from);
};

function moveToRequiredPage(required_page) {
  const newURL = new URL(window.location.href);
  newURL.searchParams.set('page', required_page);
  window.location.assign(newURL);
}

// Create button
function pageButtonsHandler(total, currentPage) {
  const num_buttons = document.querySelector('.number-pages');
  const pageList = pageNumbers(total, 5, currentPage);
  pageList.forEach((page) => {
    let button_number = `<button id = "${page}" class="show_button num-page ${
      page == currentPage ? 'active_button' : ''
    }">${page}</button>`;
    num_buttons.innerHTML += button_number;
  });
  const all_buttons = document.querySelectorAll('.num-page');
  all_buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      let required_page = Number(button.id);
      moveToRequiredPage(required_page);
    });
  });
}

// Change page: Next page and Prev page
function preNextPage(total, currentPage) {
  checkButton(prep_page_btn, next_page_btn, total, currentPage);
  prep_page_btn.addEventListener('click', () => moveToRequiredPage(currentPage - 1));
  next_page_btn.addEventListener('click', () => moveToRequiredPage(currentPage + 1));
}

// Change page: first page and last page
function firstLastPage(total, currentPage) {
  checkButton(first_page_btn, last_page_btn, total, currentPage);
  first_page_btn.addEventListener('click', () => moveToRequiredPage(1));
  last_page_btn.addEventListener('click', () => moveToRequiredPage(total));
}

const paginationFunction = (filterObj, type, currentPage) => {
  getAPI.getMovies(type, currentPage, filterObj.genres, filterObj.languages, filterObj.years).then((data) => {
    const totalPages = data.total_pages;
    pageButtonsHandler(totalPages, currentPage);
    preNextPage(totalPages, currentPage);
    firstLastPage(totalPages, currentPage);
  });
};

export default paginationFunction;
