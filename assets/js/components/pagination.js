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
const checkButton = (afterBtn, beforeBtn, total) => {
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

function nextPageLink(required_page) {
  const newURL = new URL(window.location.href);
  newURL.searchParams.set('page', required_page);
  window.location.assign(newURL);
}

// Create button
function numOfPages(total) {
  const num_buttons = document.querySelector('.number-pages');
  const pageList = pageNumbers(total, 5, currentPage);
  pageList.forEach((page) => {
    button_number = `<button id = "${page}" class="show_button num-page ${
      page == currentPage ? 'active_button' : ''
    }">${page}</button>`;
    num_buttons.innerHTML += button_number;
  });
  const all_buttons = document.querySelectorAll('.num-page');
  all_buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      required_page = Number(button.id);
      nextPageLink(required_page);
    });
  });
}

// Change page: Next page and Prev page
function changePage(total) {
  checkButton(prep_page_btn, next_page_btn, total);
  prep_page_btn.addEventListener('click', () => {
    nextPageLink(currentPage - 1);
  });
  next_page_btn.addEventListener('click', () => {
    nextPageLink(currentPage + 1);
  });
}

// Change page: first page and last page
function firstLastPage(total) {
  checkButton(first_page_btn, last_page_btn, total);
  first_page_btn.addEventListener('click', () => {
    nextPageLink(1);
  });
  last_page_btn.addEventListener('click', () => {
    nextPageLink(total);
  });
}

const pagination = async () => {
  const res = await fetch(currentAPI);
  const moviesInfo = await res.json();
  const totalPages = moviesInfo.total_pages;
  numOfPages(totalPages);
  changePage(totalPages);
  firstLastPage(totalPages);
};

pagination();
