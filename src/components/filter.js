import AbstractComponent from './abstract-component.js';

export default class Filter extends AbstractComponent {
  constructor(filter) {
    super();

    this._filter = filter;
  }

  getTemplate() {
    const filterMarkup = this._filter.map((it) => this._createNavigationMarkup(it, it.checked)).join(`\n`);

    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
          ${filterMarkup}
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>`
    );
  }

  _createNavigationMarkup(filter, isChecked) {
    const {name, count} = filter;
    const href = name.split(` `, 1)[0].toLowerCase();

    return (
      `<a href="#${href}" id="${name}" class="main-navigation__item ${isChecked ? `main-navigation__item--active` : ``}">
        ${name} ${href === `all` ? `` : `<span class="main-navigation__item-count">${count}</span>`}
      </a>\n`
    );
  }

  setFilterChangeHandler(handler) {
    const filterList = this.getElement().querySelector(`.main-navigation__items`);
    filterList.addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `A`) {
        evt.preventDefault();
        const filterName = evt.target.id;
        handler(filterName);
      }
    });
  }
}
