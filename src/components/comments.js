import AbstractComponent from './abstract-component.js';

export default class Comments extends AbstractComponent {
  constructor(comments) {
    super();

    this._comments = comments;
  }

  getTemplate() {
    const commentCount = this._comments.length;
    const commentMarkup = this._comments.map((it) => this._createCommentMarkup(it)).join(`\n`);

    return (
      `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentCount}</span></h3>
      <ul class="film-details__comments-list">
        ${commentMarkup}
      </ul>`
    );
  }

  _createCommentMarkup(comment) {
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
  }
}
