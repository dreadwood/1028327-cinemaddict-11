import AbstractComponent from './abstract-component.js';

const SortTypes = new Map([
  [`Sort by default`, `default`],
  [`Sort by date`, `date`],
  [`Sort by rating`, `rating`],
]);

export default class Sorting extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = SortTypes.get(`Sort by default`);
    this._sortButtons = this.getElement().querySelectorAll(`.sort__button`);
  }

  getTemplate() {
    const sortingMarkup = [...SortTypes].map((type) => this._createSortingMarkup(type)).join(`\n`);

    return (
      `<ul class="sort">
        ${sortingMarkup}
      </ul>`
    );
  }

  getSortType() {
    return this._currenSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;
      this._sortButtons.forEach((button) => button.classList.remove(`sort__button--active`));
      evt.target.classList.add(`sort__button--active`);

      handler(this._currenSortType);
    });
  }

  _createSortingMarkup(type) {
    const [name, dataset] = type;
    return (
      `<li><a href="#" class="sort__button ${dataset === this._currenSortType ? `sort__button--active` : ``}" data-sort-type="${dataset}">${name}</a></li>`
    );
  }
}

export {SortTypes};
