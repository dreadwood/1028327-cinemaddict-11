import AbstractComponent from './abstract-component.js';

const SORT_TYPES = [`Sort by default`, `Sort by date`, `Sort by rating`];

export default class Sorting extends AbstractComponent {
  getTemplate() {
    const sortingMarkup = SORT_TYPES.map((it, i) => this._createSortingMarkup(it, i === 0)).join(`\n`);

    return (
      `<ul class="sort">
        ${sortingMarkup}
      </ul>`
    );
  }

  _createSortingMarkup(type, isActive) {
    return (
      `<li><a href="#" class="sort__button ${isActive ? `sort__button--active` : ``}">${type}</a></li>`
    );
  }
}
