const createSortingMarkup = (type, isActive) => {
  return (
    `<li><a href="#" class="sort__button ${isActive ? `sort__button--active` : ``}">${type}</a></li>`
  );
};

export const createSortingTemplate = () => {
  const sortTypes = [`Sort by default`, `Sort by date`, `Sort by rating`];
  const sortingMarkup = sortTypes.map((it, i) => createSortingMarkup(it, i === 0)).join(`\n`);

  return (
    `<ul class="sort">
      ${sortingMarkup}
    </ul>`
  );
};
