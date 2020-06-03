import AbstractComponent from './abstract-component.js';

export default class FooterStatistics extends AbstractComponent {
  constructor(quantityFilms) {
    super();

    this._quantityFilms = quantityFilms;
  }

  getTemplate() {
    return (
      `<section class="footer__statistics">
        <p>${this._quantityFilms} movies inside</p>
      </section>`
    );
  }

  updateCounter(quantityFilms) {
    this.getElement().querySelector(`.counter`).textContent = quantityFilms;
  }
}
