import {createElement} from '../utils/utils.js';

const navItems = new Map([
  [`all`, `All movies`],
  [`watchlist`, `Watchlist`],
  [`history`, `History`],
  [`favorites`, `Favorites`],
]);

const createNavigationMarkup = (id, name, count, isAll) => {
  return (
    `<a href="#${id}" class="main-navigation__item ${isAll ? `main-navigation__item--active` : ``}">
      ${name} ${isAll ? `` : `<span class="main-navigation__item-count">${count}</span>`}
    </a>\n`
  );
};

const createNavigationTemplate = (quantity) => {
  let navigationMarkup = ``;
  navItems.forEach((name, id) => {
    const count = quantity[id] ? quantity[id] : ``;
    navigationMarkup += createNavigationMarkup(id, name, count, id === `all`);
  });

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${navigationMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Navigation {
  constructor(quantity) {
    this._quantity = quantity;
    this._element = null;
  }

  getTemplate() {
    return createNavigationTemplate(this._quantity);
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
