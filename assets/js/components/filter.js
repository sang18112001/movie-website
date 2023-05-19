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
  const newFilterObj = {
    genres: getQuery.genres || '',
    languages: getQuery.languages || '',
    years: getQuery.years || '',
  };
  let checkFilter = true;
  const filterLink = `typeOfMovies.html?type=${type}`;
  filterPerform.addEventListener('click', (event) => {
    event.preventDefault();
    filterOptions.forEach((filterOption) => {
      const typeFilter = filterOption.value.split('-')[0];
      const idFilter = filterOption.value.split('-')[1];
      newFilterObj[typeFilter] = idFilter != 'default' ? idFilter : '';
      const keys = Object.keys(newFilterObj);
      checkFilter = keys.every((key) => filterObj[key] === newFilterObj[key]);
    });
    !checkFilter &&
      window.location.assign(
        `${filterLink}&genres=${newFilterObj.genres}&languages=${newFilterObj.languages}&years=${newFilterObj.years}&page=1`,
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
