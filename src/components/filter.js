import AbstractComponent from './abstract-component.js';

const ACTIVE_CLASS = `main-navigation__item--active`;

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
        <a href="#stats" id="stats" class="main-navigation__additional">Stats</a>
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

  _setActiveButton(activeButton) {
    const buttons = this.getElement().querySelectorAll(`a`);
    buttons.forEach((button) => {
      button.classList.remove(ACTIVE_CLASS);
    });

    activeButton.classList.add(ACTIVE_CLASS);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `A`) {
        evt.preventDefault();

        const activeButton = evt.target;
        this._setActiveButton(activeButton);
        handler(activeButton.id);
      }
    });
  }
}
