import {MONTH_NAMES, EMOJIS} from '../const.js';
import {getRatingForInsertion, getdurationInHours, getRandomDate} from '../utils/film-utils.js';
import {createElement} from '../utils/utils.js';

const createGenreTemplate = (genres) => {
  return genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(`\n`);
};

const Comments = [
  {
    emoji: `smile`,
    text: `Interesting setting and a good cast`,
    author: `Tim Macoveev`,
    date: getRandomDate(2010, 2019),
  },
  {
    emoji: `sleeping`,
    text: `Booooooooooring`,
    author: `John Doe`,
    date: getRandomDate(2010, 2019),
  },
  {
    emoji: `puke`,
    text: `Very very old. Meh`,
    author: `John Doe`,
    date: getRandomDate(2010, 2019),
  },
  {
    emoji: `angry`,
    text: `Almost two hours? Seriously?`,
    author: `John Doe`,
    date: getRandomDate(2010, 2019),
  }
];

const createCommentMarkup = (comment) => {
  const {emoji, text, author, date} = comment;
  const dateComment = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : `0` + date.getMinutes()}`;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${dateComment}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createEmojiMarkup = (emoji) => {
  return (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>`
  );
};

const createCommentTemplate = (comment) => {
  const commentCount = comment.length;
  const commentMarkup = comment.map((it) => createCommentMarkup(it)).join(`\n`);
  const emojiListMarkup = EMOJIS.map((it) => createEmojiMarkup(it)).join(`\n`);

  return (
    `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentCount}</span></h3>

      <ul class="film-details__comments-list">
        ${commentMarkup}
      </ul>

      <div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label"></div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          ${emojiListMarkup}
        </div>
      </div>
    </section>`
  );
};

const createFilmTableRowlMarkup = (row) => {
  const [term, value] = row;
  return (
    `<tr class="film-details__row">
      <td class="film-details__term">${term}</td>
      <td class="film-details__cell">${value}</td>
    </tr>`
  );
};

const createFilmDetailsTemplate = (movie) => {
  const {poster, contentRating, title, originTitle, rating, director, writers, actors, date, duration, country, genres, description, onWatchlist, isWatched, onFavorite} = movie;

  const durationInHours = getdurationInHours(duration);
  const releaseDate = `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
  const commentTemplate = createCommentTemplate(Comments);

  const genreTerm = genres.length === 1 ? `Genre` : `Genres`;
  const genreValue = createGenreTemplate(genres);
  const filmTable = [
    [`Director`, director],
    [`Writers`, writers],
    [`Actors`, actors],
    [`Release Date`, releaseDate],
    [`Runtime`, durationInHours],
    [`Country`, country],
    [genreTerm, genreValue],
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
                ${filmTable.map((row) => createFilmTableRowlMarkup(row)).join(`\n`)}
              </table>

              <p class="film-details__film-description">${description}</p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${onWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${onFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          ${commentTemplate}
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails {
  constructor(movie) {
    this._movie = movie;
    this._element = null;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._movie);
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
