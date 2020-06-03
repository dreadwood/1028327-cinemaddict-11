import AbstractComponent from './abstract-component.js';
import {getRang} from '../utils/film-utils.js';

export default class UserProfile extends AbstractComponent {
  constructor(watchedFilms) {
    super();

    this._watchedFilms = watchedFilms.length;
  }

  getTemplate() {
    return (
      `<section class="header__profile profile">
        <p class="profile__rating">${getRang(this._watchedFilms)}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
    );
  }
}
