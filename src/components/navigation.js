import AbstractComponent from './abstract-component.js';

const NAV_ITEMS = new Map([
  [`all`, `All movies`],
  [`watchlist`, `Watchlist`],
  [`history`, `History`],
  [`favorites`, `Favorites`],
]);

export default class Navigation extends AbstractComponent {
  constructor(quantity) {
    super();

    this._quantity = quantity;
  }

  _createNavigationMarkup(navItem) {
    const [id, name] = navItem;
    const count = this._quantity[id] ? this._quantity[id] : 0;
    return (
      `<a href="#${id}" class="main-navigation__item ${id === `all` ? `main-navigation__item--active` : ``}">
        ${name} ${id === `all` ? `` : `<span class="main-navigation__item-count">${count}</span>`}
      </a>\n`
    );
  }

  getTemplate() {
    const navigationMarkup = [...NAV_ITEMS].map((name) => this._createNavigationMarkup(name)).join(`\n`);

    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
          ${navigationMarkup}
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>`
    );
  }
}
