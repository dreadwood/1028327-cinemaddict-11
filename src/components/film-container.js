import AbstractComponent from './abstract-component.js';

const FilmSections = new Map([
  [`films-list`, `All movies. Upcoming`],
  [`films-list--extra films-list--top`, `Top rated`],
  [`films-list--extra films-list--commented`, `Most commented`],
]);

export default class FilmContainer extends AbstractComponent {
  getTemplate() {
    const filmSectionMarkup = [...FilmSections].map((section, index) => this._createFilmSectionMarkup(section, index)).join(`\n`);

    return (
      `<section class="films">
        ${filmSectionMarkup}
      </section>`
    );
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
}
