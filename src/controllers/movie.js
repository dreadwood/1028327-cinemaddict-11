import FilmCard from '../components/film-card.js';
import FilmDetails from '../components/film-details.js';
import {render, replace, remove} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._filmComponent = null;
    this._filmDetailsComponent = null;
    this._film = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._closeFilmDetails = this._closeFilmDetails.bind(this);
    this._onSubmitAddComment = this._onSubmitAddComment.bind(this);

    this._bodyElement = document.querySelector(`body`);
  }

  render(movie) {
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;
    this._film = movie;

    this._filmComponent = new FilmCard(movie);
    this._filmDetailsComponent = new FilmDetails(movie);

    const onFilmPosterClick = () => this._openFilmDetails();
    const onFilmTitleClick = () => this._openFilmDetails();
    const onFilmCommentsClick = () => this._openFilmDetails();

    this._filmComponent.setPosterClickHandler(onFilmPosterClick);
    this._filmComponent.setTitleClickHandler(onFilmTitleClick);
    this._filmComponent.setCommentsClickHandler(onFilmCommentsClick);

    this._filmComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {// move to method
        onWatchlist: !movie.onWatchlist,
      }));
    });

    this._filmComponent.setWatchedtButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isWatched: !movie.isWatched,
      }));
    });

    this._filmComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        onFavorite: !movie.onFavorite,
      }));
    });

    // TODO: change handler for closeButton on onCloseButtonClick
    this._filmDetailsComponent.setCloseButtonClickHandler(this._closeFilmDetails);

    this._filmDetailsComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        onWatchlist: !movie.onWatchlist,
      }));
    });

    this._filmDetailsComponent.setWatchedtButtonClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isWatched: !movie.isWatched,
      }));
    });

    this._filmDetailsComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        onFavorite: !movie.onFavorite,
      }));
    });

    this._filmDetailsComponent.setSmileButtonClickHandler();

    this._filmDetailsComponent.setDeleteButtonClickHandler((index) => {
      const updateComments = [].concat(movie.comments.slice(0, index), movie.comments.slice(index + 1));

      this._onDataChange(this, movie, Object.assign({}, movie, {
        comments: updateComments,
      }));
    });

    if (oldFilmDetailsComponent && oldFilmComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._filmComponent);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeFilmDetails();
    }
  }

  destroy() {
    remove(this._filmDetailsComponent);
    remove(this._filmComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    document.removeEventListener(`keydown`, this._onSubmitAddComment);
  }

  _openFilmDetails() {
    this._onViewChange();
    this._bodyElement.appendChild(this._filmDetailsComponent.getElement());
    document.addEventListener(`keydown`, this._onEscKeyDown);
    document.addEventListener(`keydown`, this._onSubmitAddComment);
    this._mode = Mode.DETAILS;
  }

  _closeFilmDetails() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    document.removeEventListener(`keydown`, this._onSubmitAddComment);
    this._filmDetailsComponent.reset();
    this._bodyElement.removeChild(this._filmDetailsComponent.getElement());
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      evt.preventDefault();

      this._closeFilmDetails(evt);
    }
  }

  _onSubmitAddComment(evt) {
    if (evt.key === `Enter` && (evt.ctrlKey || evt.metaKey)) {
      if (!this._filmDetailsComponent.checkComment()) {
        return;
      }

      const newComment = this._film.comments.concat(this._filmDetailsComponent.getComment());

      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        comments: newComment
      }));
    }
  }
}
