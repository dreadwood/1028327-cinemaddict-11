import {createElement} from '../utils/utils.js';

const sortTypes = [`Sort by default`, `Sort by date`, `Sort by rating`];

const createSortingMarkup = (type, isActive) => {
  return (
    `<li><a href="#" class="sort__button ${isActive ? `sort__button--active` : ``}">${type}</a></li>`
  );
};

const createSortingTemplate = () => {
  const sortingMarkup = sortTypes.map((it, i) => createSortingMarkup(it, i === 0)).join(`\n`);

  return (
    `<ul class="sort">
      ${sortingMarkup}
    </ul>`
  );
};

export default class Sorting {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortingTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
