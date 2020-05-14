import FilmCard from '../components/film-card.js';
import FilmDetails from '../components/film-details.js';
import {render} from '../utils/render.js';


export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);

    this._bodyElement = document.querySelector(`body`);

    this._openedFilmDetails = false;
  }

  render(movie) {
    this._filmComponent = new FilmCard(movie);
    this._filmDetailsComponent = new FilmDetails(movie);

    const onFilmPosterClick = (evt) => this._openFilmDetails(evt);
    const onFilmTitleClick = (evt) => this._openFilmDetails(evt);
    const onFilmCommentsClick = (evt) => this._openFilmDetails(evt);

    this._filmComponent.setPosterClickHandler(onFilmPosterClick);
    this._filmComponent.setTitleClickHandler(onFilmTitleClick);
    this._filmComponent.setCommentsClickHandler(onFilmCommentsClick);

    this._filmDetailsComponent.setCloseButtonClickHandler(this._onCloseButtonClick);


    this._filmComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, { // move to method
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


    render(this._container, this._filmComponent);
  }

  _openFilmDetails(evt) {
    evt.preventDefault();

    if (!this._openedFilmDetails) {
      this._bodyElement.appendChild(this._filmDetailsComponent.getElement());
      this._openedFilmDetails = true;
      document.addEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _onCloseButtonClick(evt) {
    evt.preventDefault();

    this._bodyElement.removeChild(this._filmDetailsComponent.getElement());
    this._openedFilmDetails = false;
    document.removeEventListener(`keydown`, this._onEscKeyDown);

  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      evt.preventDefault();

      this._bodyElement.removeChild(this._filmDetailsComponent.getElement());
      this._openedFilmDetails = false;
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
