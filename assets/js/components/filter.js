function filterChangeSelection() {
  const filterOptions = document.querySelectorAll('option');
  Array.from(filterOptions).forEach((option) => {
    if (option.value != 'default') {
      const typeFilter = option.value.split('-')[0];
      const idFilter = option.value.split('-')[1];
      if (filterObj[typeFilter] === idFilter) {
        option.setAttribute('selected', true);
      }
    }
  });
}

function filterPerforming() {
  const filterOptions = document.querySelectorAll('select');
  const filterPerform = document.querySelector('.filter-perform');
  const filterRemove = document.querySelector('.filter-remove');
  filterOptions.forEach((filterOption) => {
    filterOption.addEventListener('change', () => {
      const typeFilter = filterOption.value.split('-')[0];
      const idFilter = filterOption.value.split('-')[1];
      filterObj[typeFilter] = idFilter != 'default' ? idFilter : '';
    });
  });
  const filterLink = `typeOfMovies.html?type=${type}`;
  filterPerform.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.assign(
      `${filterLink}&genres=${filterObj.genres}&languages=${filterObj.languages}&years=${filterObj.years}&page=1`,
    );
  });
  filterRemove.addEventListener('click', () => {
    window.location.assign(filterLink);
  });
}

function filterFunction() {
  filterChangeSelection();
  filterPerforming();
}

filterFunction();
