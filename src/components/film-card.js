import AbstractComponent from './abstract-component.js';
import {getRatingForInsertion, getdurationInHours} from '../utils/film-utils.js';

export default class FilmCard extends AbstractComponent {
  constructor(movie) {
    super();

    this._movie = movie;
  }

  _createFilmButtonMarkup(filmButton) {
    const [type, classItem, name] = filmButton;
    return (
      `<button class="film-card__controls-item button film-card__controls-item--${classItem} ${type ? `film-card__controls-item--active` : ``}">${name}</button>`
    );
  }

  getTemplate() {
    const {title, rating, date, duration, genres, poster, description, onWatchlist, isWatched, onFavorite, comments} = this._movie;

    const year = date.getFullYear();
    const descriptionForInsertion = description.length > 140 ? (description.substring(0, 139) + `...`) : description;
    const filmButtons = [
      [onWatchlist, `add-to-watchlist`, `Add to watchlist`],
      [isWatched, `mark-as-watched`, `Mark as watched`],
      [onFavorite, `favorite`, `Mark as favorite`],
    ];

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
          ${filmButtons.map((button) => this._createFilmButtonMarkup(button)).join(`\n`)}
        </form>
      </article>`
    );
  }
}
