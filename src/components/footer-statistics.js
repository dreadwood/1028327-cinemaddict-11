import AbstractComponent from './abstract-component.js';

export default class FooterStatistics extends AbstractComponent {
  constructor(amount) {
    super();

    this._amount = amount;
  }

  getTemplate() {
    return (
      `<section class="footer__statistics">
        <p>${this._amount} movies inside</p>
      </section>`
    );
  }

  updateCounter(amount) {
    this.getElement().querySelector(`.counter`).textContent = amount;
  }
}
