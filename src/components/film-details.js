import AbstractSmartComponent from './abstract-smart-component.js';
import {EMOJIS} from '../utils/const.js';
import {getRatingForInsertion, getDurationFilm, getReleaseDate} from '../utils/film-utils.js';
import Comments from './comments.js';
import {encode} from "he";

const StyleBoxShadow = {
  ERROR: `0 0 14px 2px red`,
  NONE: `none`,
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;

    this._closeButtonClickHandler = null;
    this._watchlistButtonClickHandler = null;
    this._watchedtButtonClickHandler = null;
    this._favoriteButtonClickHandler = null;
    this._deleteButtonClickHandler = null;

    this._selectedEmoji = null;
  }

  getTemplate() {
    const {poster, contentRating, title, originTitle, rating, director, writers, actors, date, duration, country, genres, description, onWatchlist, isWatched, onFavorite, comments} = this._film;

    const releaseDate = getReleaseDate(date);
    const durationFilm = getDurationFilm(duration);
    const genreTerm = genres.length === 1 ? `Genre` : `Genres`;
    const genreValue = this._createGenreMarkup(genres);
    const filmTable = [
      [`Director`, director],
      [`Writers`, writers],
      [`Actors`, actors],
      [`Release Date`, releaseDate],
      [`Runtime`, durationFilm],
      [`Country`, country],
      [genreTerm, genreValue],
    ];
    const filmControls = [
      [onWatchlist, `watchlist`],
      [isWatched, `watched`],
      [onFavorite, `favorite`],
    ];
    const emojiListMarkup = EMOJIS.map((it) => this._createEmojiListMarkup(it, it === this._selectedEmoji)).join(`\n`);
    const commentstMarkup = new Comments(comments).getTemplate();

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
              ${commentstMarkup}
              <div class="film-details__new-comment">
                <div for="add-emoji" class="film-details__add-emoji-label"></div>
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

  getComment() {
    const comment = this.getElement().querySelector(`.film-details__comment-input`).value;

    return {
      emoji: this._selectedEmoji,
      text: encode(comment),
      author: `author`,
      date: new Date(),
    };
  }

  checkComment() {
    const emojiElement = this.getElement().querySelector(`.film-details__add-emoji-label`);
    const inputElement = this.getElement().querySelector(`.film-details__comment-input`);

    let isSuccess = false;

    if (!this._selectedEmoji) {
      emojiElement.style.boxShadow = StyleBoxShadow.ERROR;
    } else if (inputElement.value === ``) {
      inputElement.style.boxShadow = StyleBoxShadow.ERROR;
      inputElement.focus();
    } else {
      emojiElement.style.boxShadow = StyleBoxShadow.NONE;
      inputElement.style.boxShadow = StyleBoxShadow.NONE;
      isSuccess = true;
    }

    return isSuccess;
  }

  recoveryListeners() {
    this.setCloseButtonClickHandler(this._closeButtonClickHandler);
    this.setWatchlistButtonClickHandler(this._watchlistButtonClickHandler);
    this.setWatchedtButtonClickHandler(this._watchedtButtonClickHandler);
    this.setFavoriteButtonClickHandler(this._favoriteButtonClickHandler);
    this.setSmileButtonClickHandler();
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
  }

  rerender() {
    super.rerender();
  }

  reset() {
    this._selectedEmoji = null;

    this.rerender();
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

  _createEmojiListMarkup(emoji, isActive) { // TODO maybe remove isActive because checkbox?
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

  _createEmojiElementMarkup(emoji) {
    return (
      `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`
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

  setSmileButtonClickHandler() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `INPUT` && this._selectedEmoji !== evt.target.value) {
        this._selectedEmoji = evt.target.value;

        const emojiElement = this.getElement().querySelector(`.film-details__add-emoji-label`);
        emojiElement.innerHTML = this._createEmojiElementMarkup(this._selectedEmoji);
      }
    });
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((deleteButton, i) => {
      deleteButton.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler(i);
      });
    });

    this._deleteButtonClickHandler = handler;
  }
}
