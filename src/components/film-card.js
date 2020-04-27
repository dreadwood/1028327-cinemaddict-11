import {createElement} from '../utils/utils.js';
import {getRatingForInsertion, getdurationInHours} from '../utils/film-utils.js';

export default class FilmCard {
  constructor(movie) {
    this._movie = movie;
    this._element = null;
  }

  _createFilmButtonMarkup(filmButton, isActive) {
    const [type, name] = filmButton;
    return (
      `<button class="film-card__controls-item button film-card__controls-item--${type} ${isActive ? `film-card__controls-item--active` : ``}">${name}</button>`
    );
  }

  getTemplate() {
    const {title, rating, date, duration, genres, poster, description, onWatchlist, isWatched, onFavorite, comments} = this._movie;

    const year = date.getFullYear();
    const descriptionForInsertion = description.length > 140 ? (description.substring(0, 139) + `...`) : description;

    return (
      `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${getRatingForInsertion(rating)}</p>
        <p class="film-card__info">
          <span class="film-card__year">${year}</span>
          <span class="film-card__duration">${getdurationInHours(duration)}</span>
          <span class="film-card__genre">${genres[0]}</span>
        </p>
        <img src="./images/posters/${poster}" alt="film poster ${title}" class="film-card__poster">
        <p class="film-card__description">${descriptionForInsertion}</p>
        <a class="film-card__comments">${comments} comments</a>
        <form class="film-card__controls">
          ${this._createFilmButtonMarkup([`add-to-watchlist`, `Add to watchlist`], onWatchlist)}
          ${this._createFilmButtonMarkup([`mark-as-watched`, `Mark as watched`], isWatched)}
          ${this._createFilmButtonMarkup([`favorite`, `Mark as favorite`], onFavorite)}
        </form>
      </article>`
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
