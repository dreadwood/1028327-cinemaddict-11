import {EMOJIS} from '../const.js';

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

const createEmojiListMarkup = (emoji) => {
  return (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>`
  );
};

export const createCommentsTemplate = (comments) => {
  const commentCount = comments.length;
  const commentMarkup = comments.map((it) => createCommentMarkup(it)).join(`\n`);
  const emojiListMarkup = EMOJIS.map((it) => createEmojiListMarkup(it)).join(`\n`);

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
