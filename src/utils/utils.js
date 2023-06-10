// Header scroll
export const scrollHeader = () => {
  let header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
  });
};
// getTime
export const getTime = () => {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const time = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  return time;
};

// Underline header
export const navBarUnderline = (type) => {
  const navbar_list = document.querySelectorAll('.header-menu a');
  navbar_list.forEach((item) => {
    item.classList.remove('active-menu');
    const newNavbar = item.innerHTML.split(' ').join('_').toLowerCase();
    type === newNavbar && item.classList.add('active-menu');
  });
};

// Change title
export const changeTitleMovie = (type) => {
  const moviesTitle = document.querySelector('.movies-title span');
  const newTitle = type.split('_').join(' ').toUpperCase();
  moviesTitle.innerHTML = newTitle;
  document.title = newTitle;
};
