import NoData from '../components/no-data.js';
import FilmContainer from '../components/film-container.js';
import FilmCard from '../components/film-card.js';
import ShowMoreButton from '../components/show-more-button.js';
import FilmDetails from '../components/film-details.js';
import {render, remove} from '../utils/render.js';
import {getSortedFilms} from '../utils/film-utils.js';

const TOP_FILM_COUNT = 2;
const COMMENTED_FILM_COUNT = 2;
const FILM_COUNT_ON_START = 5;
const FILM_COUNT_BY_BUTTON = 5;

const SortType = {
  RATING: `rating`,
  COMMENTS: `comments`,
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._noDataComponent = new NoData();
    this._filmContainerComponent = new FilmContainer();
    this._showMoreButtonComponent = new ShowMoreButton();

    this._bodyElement = document.querySelector(`body`);
    this._openedFilmDetails = false;
  }

  render(movies) {
    const isDataBaseEmpty = movies.length === 0 ? true : false;
    if (isDataBaseEmpty) {
      render(this._container, this._noDataComponent);
      return;
    }

    render(this._container, this._filmContainerComponent);

    const filmListElement = this._filmContainerComponent.getElement().querySelector(`.films-list`);
    const filmListContainerElement = filmListElement.querySelector(`.films-list__container`);

    let showingFilmCount = FILM_COUNT_ON_START;
    movies.slice(0, showingFilmCount).forEach((movie) => {
      this._renderFilm(filmListContainerElement, movie);
    });

    render(filmListElement, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler((evt) => {
      evt.preventDefault();
      const prevFilmCount = showingFilmCount;
      showingFilmCount += FILM_COUNT_BY_BUTTON;

      movies.slice(prevFilmCount, showingFilmCount).forEach((movie) => {
        this._renderFilm(filmListContainerElement, movie);
      });

      if (showingFilmCount >= movies.length) {
        remove(this._showMoreButtonComponent);
      }
    });

    const topFilms = getSortedFilms(movies, SortType.RATING);
    const commentedFilms = getSortedFilms(movies, SortType.COMMENTS);
    const topFilmListElement = this._filmContainerComponent.getElement().querySelector(`.films-list--top .films-list__container`);
    const commentedFilmListElement = this._filmContainerComponent.getElement().querySelector(`.films-list--commented .films-list__container`);
    this._repeatRender(topFilmListElement, topFilms, TOP_FILM_COUNT);
    this._repeatRender(commentedFilmListElement, commentedFilms, COMMENTED_FILM_COUNT);
  }

  _renderFilm(place, movie) {

    const openFilmDetails = (evt) => {
      evt.preventDefault();

      if (!this._openedFilmDetails) {
        this._bodyElement.appendChild(filmDetailsComponent.getElement());
        this._openedFilmDetails = true;
        document.addEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        evt.preventDefault();
        this._bodyElement.removeChild(filmDetailsComponent.getElement());
        this._openedFilmDetails = false;
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onFilmPosterClick = (evt) => openFilmDetails(evt);
    const onFilmTitleClick = (evt) => openFilmDetails(evt);
    const onFilmCommentsClick = (evt) => openFilmDetails(evt);

    const onCloseButtonClick = (evt) => {
      evt.preventDefault();
      this._bodyElement.removeChild(filmDetailsComponent.getElement());
      this._openedFilmDetails = false;
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const filmComponent = new FilmCard(movie);
    filmComponent.setPosterClickHandler(onFilmPosterClick);
    filmComponent.setTitleClickHandler(onFilmTitleClick);
    filmComponent.setCommentsClickHandler(onFilmCommentsClick);

    const filmDetailsComponent = new FilmDetails(movie);
    filmDetailsComponent.setCloseButtonClickHandler(onCloseButtonClick);

    render(place, filmComponent);
  }

  _repeatRender(container, movies, iterations) {
    for (let i = 0; i < iterations; i++) {
      this._renderFilm(container, movies[i]);
    }
  }
}
