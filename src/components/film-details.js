import {MONTH_NAMES, EMOJIS} from '../utils/const.js';
import {getRatingForInsertion, getdurationInHours} from '../utils/film-utils.js';
import {generationComments} from '../mock/comment.js';
import Comments from './comments.js';
import AbstractSmartComponent from './abstract-smart-component.js';

const COMMENT_COUNT = 4;
const comments = generationComments(COMMENT_COUNT);

export default class FilmDetails extends AbstractSmartComponent {
  constructor(movie) {
    super();

    this._commentsComponent = new Comments(comments);

    this._movie = movie;
    this._closeButtonClickHandler = null;
    this._watchlistButtonClickHandler = null; // maybe not needed
    this._watchedtButtonClickHandler = null; // maybe not needed
    this._favoriteButtonClickHandler = null; // maybe not needed

    this._subscribeOnEvents();
    this._selectedEmoji = null;
  }

  getTemplate() {
    const {poster, contentRating, title, originTitle, rating, director, writers, actors, date, duration, country, genres, description, onWatchlist, isWatched, onFavorite} = this._movie;

    const durationInHours = getdurationInHours(duration);
    const releaseDate = `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
    const genreTerm = genres.length === 1 ? `Genre` : `Genres`;
    const genreValue = this._createGenreMarkup(genres);
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
    const emojiListMarkup = EMOJIS.map((it) => this._createEmojiListMarkup(it, it === this._selectedEmoji)).join(`\n`);

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
            <section class="film-details__comments-wrap">
              ${new Comments(comments).getTemplate()}
              <div class="film-details__new-comment">
                <div for="add-emoji" class="film-details__add-emoji-label">

                </div>
                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                </label>
                <div class="film-details__emoji-list">
                  ${emojiListMarkup}
                </div>
              </div>
            </section>
          </div>
        </form>
      </section>`
    );
  }

  recoveryListeners() {
    this.setCloseButtonClickHandler(this._closeButtonClickHandler);
    this.setWatchlistButtonClickHandler(this._watchlistButtonClickHandler);
    this.setWatchedtButtonClickHandler(this._watchedtButtonClickHandler);
    this.setFavoriteButtonClickHandler(this._favoriteButtonClickHandler);
    this._subscribeOnEvents(); // CHANGE NAME
  }

  rerender() {
    super.rerender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();


    element.querySelector(`.film-details__emoji-list`).addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `INPUT`) {
        this._selectedEmoji = evt.target.value;
        const emojiContainer = element.querySelector(`.film-details__add-emoji-label`);

        emojiContainer.innerHTML = `<img src="./images/emoji/${this._selectedEmoji}.png" width="55" height="55" alt="emoji-${this._selectedEmoji}">`;

        this.rerender();
      }
    });
  }

  _createGenreMarkup(genres) {
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

  _createEmojiListMarkup(emoji, isActive) {
    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${isActive ? `checked` : ``}>
      <label class="film-details__emoji-label" for="emoji-${emoji}">
        <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
      </label>`
    );
  }

  _createDetailsControlsMarkup(control) {
    const [type, name] = control;
    return (
      `<input type="checkbox" class="film-details__control-input visually-hidden" id="${name}" name="${name}" ${type ? `checked` : ``}>
      <label for="${name}" class="film-details__control-label film-details__control-label--${name}">Add to ${name}</label>`
    );
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);

    this._closeButtonClickHandler = handler;
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`#watchlist`).addEventListener(`click`, handler);

    this._watchlistButtonClickHandler = handler;
  }

  setWatchedtButtonClickHandler(handler) {
    this.getElement().querySelector(`#watched`).addEventListener(`click`, handler);

    this._watchedtButtonClickHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`#favorite`).addEventListener(`click`, handler);

    this._favoriteButtonClickHandler = handler;
  }
}
