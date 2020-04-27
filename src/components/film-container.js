import {createElement} from '../utils/utils.js';

const FILM_SECTIONS = new Map([
  [`films-list`, `All movies. Upcoming`],
  [`films-list--extra films-list--top`, `Top rated`],
  [`films-list--extra films-list--commented`, `Most commented`],
]);

export default class FilmContainer {
  constructor() {
    this._element = null;
  }

  _createFilmSectionMarkup(section, index) {
    const [classList, titleName] = section;
    return (
      `<section class="${classList}">
        <h2 class="films-list__title ${index === 0 ? `visually-hidden` : ``}">${titleName}</h2>
        <div class="films-list__container"></div>
      </section>`
    );
  }

  getTemplate() {
    const filmSectionMarkup = [...FILM_SECTIONS].map((section, index) => this._createFilmSectionMarkup(section, index)).join(`\n`);

    return (
      `<section class="films">
        ${filmSectionMarkup}
      </section>`
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
