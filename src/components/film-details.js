import {MONTH_NAMES} from '../const.js';
import {getRatingForInsertion, getdurationInHours} from '../utils/film-utils.js';
import {generationComments} from '../mock/comment.js';
import Comments from './comments.js';
import AbstractComponent from './abstract-component.js';

const COMMENT_COUNT = 4;
const comments = generationComments(COMMENT_COUNT);

export default class FilmDetails extends AbstractComponent {
  constructor(movie) {
    super();

    this._movie = movie;
    this._commentsComponent = new Comments(comments);
  }

  _createGenreTemplate(genres) {
    return genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(`\n`);
  }

  _createFilmTableRowlMarkup(row) {
    const [term, value] = row;
    return (
      `<tr class="film-details__row">
        <td class="film-details__term">${term}</td>
        <td class="film-details__cell">${value}</td>
      </tr>`
    );
  }

  _createDetailsControlsMarkup(control) {
    const [type, name] = control;
    return (
      `<input type="checkbox" class="film-details__control-input visually-hidden" id="${name}" name="${name}" ${type ? `checked` : ``}>
      <label for="${name}" class="film-details__control-label film-details__control-label--${name}">Add to ${name}</label>`
    );
  }

  getTemplate() {
    const {poster, contentRating, title, originTitle, rating, director, writers, actors, date, duration, country, genres, description, onWatchlist, isWatched, onFavorite} = this._movie;

    const durationInHours = getdurationInHours(duration);
    const releaseDate = `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
    const genreTerm = genres.length === 1 ? `Genre` : `Genres`;
    const genreValue = this._createGenreTemplate(genres);
    const filmTable = [
      [`Director`, director],
      [`Writers`, writers],
      [`Actors`, actors],
      [`Release Date`, releaseDate],
      [`Runtime`, durationInHours],
      [`Country`, country],
      [genreTerm, genreValue],
    ];
    const filmControls = [
      [onWatchlist, `watchlist`],
      [isWatched, `watched`],
      [onFavorite, `favorite`],
    ];

    return (
      `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="./images/posters/${poster}" alt="film poster ${title}">

                <p class="film-details__age">${contentRating}+</p>
              </div>

              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${title}</h3>
                    <p class="film-details__title-original">Original: ${originTitle}</p>
                  </div>

                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${getRatingForInsertion(rating)}</p>
                  </div>
                </div>

                <table class="film-details__table">
                  ${filmTable.map((row) => this._createFilmTableRowlMarkup(row)).join(`\n`)}
                </table>

                <p class="film-details__film-description">${description}</p>
              </div>
            </div>

            <section class="film-details__controls">
              ${filmControls.map((control) => this._createDetailsControlsMarkup(control)).join(`\n`)}
            </section>
          </div>

          <div class="form-details__bottom-container">
            ${this._commentsComponent.getTemplate()}
          </div>
        </form>
      </section>`
    );
  }
}
