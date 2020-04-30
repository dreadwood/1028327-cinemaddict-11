import {createElement} from '../utils/utils.js';

const SORT_TYPES = [`Sort by default`, `Sort by date`, `Sort by rating`];

export default class Sorting {
  constructor() {
    this._element = null;
  }

  _createSortingMarkup(type, isActive) {
    return (
      `<li><a href="#" class="sort__button ${isActive ? `sort__button--active` : ``}">${type}</a></li>`
    );
  }

  getTemplate() {
    const sortingMarkup = SORT_TYPES.map((it, i) => this._createSortingMarkup(it, i === 0)).join(`\n`);

    return (
      `<ul class="sort">
        ${sortingMarkup}
      </ul>`
    );
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
