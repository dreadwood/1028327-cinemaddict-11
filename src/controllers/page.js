import Navigation from '../components/navigation.js';
import NoData from '../components/no-data.js';
import Sorting, {SortTypes} from '../components/sorting.js';
import FilmContainer from '../components/film-container.js';
import FilmCard from '../components/film-card.js';
import ShowMoreButton from '../components/show-more-button.js';
import FilmDetails from '../components/film-details.js';
import {render, remove} from '../utils/render.js';
import {getSortedFilms, countFilms} from '../utils/film-utils.js';

const TOP_FILM_COUNT = 2;
const COMMENTED_FILM_COUNT = 2;
const FILM_COUNT_ON_START = 5;
const FILM_COUNT_BY_BUTTON = 5;

const FilmListType = {
  RATING: `rating`,
  COMMENTS: `comments`,
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._sortingComponent = new Sorting();
    this._noDataComponent = new NoData();
    this._filmContainerComponent = new FilmContainer();
    this._showMoreButtonComponent = new ShowMoreButton();
    this._sortingComponent = new Sorting();

    this._bodyElement = document.querySelector(`body`);
    this._openedFilmDetails = false;
  }

  render(movies) {
    const quantity = countFilms(movies);
    const navigationComponent = new Navigation(quantity);
    render(this._container, navigationComponent);
    render(this._container, this._sortingComponent);

    const isDataBaseEmpty = movies.length === 0 ? true : false;
    if (isDataBaseEmpty) {
      render(this._container, this._noDataComponent);
      return;
    }

    const renderShowMoreButton = () => {
      if (showingFilmCount >= movies.length) {
        return;
      }

      render(filmListElement, this._showMoreButtonComponent);

      this._showMoreButtonComponent.setClickHandler((evt) => {
        evt.preventDefault();
        const prevFilmCount = showingFilmCount;
        showingFilmCount += FILM_COUNT_BY_BUTTON;

        const sortedMovies = this._getSortedMovies(movies, this._sortingComponent.getSortType(), prevFilmCount, showingFilmCount);
        this._renderFilms(filmListContainerElement, sortedMovies);

        if (showingFilmCount >= movies.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    render(this._container, this._filmContainerComponent);

    const filmListElement = this._filmContainerComponent.getElement().querySelector(`.films-list`);
    const filmListContainerElement = filmListElement.querySelector(`.films-list__container`);

    let showingFilmCount = FILM_COUNT_ON_START;

    this._renderFilms(filmListContainerElement, movies.slice(0, showingFilmCount));
    renderShowMoreButton();

    this._sortingComponent.setSortTypeChangeHandler((sortType) => {
      showingFilmCount = FILM_COUNT_ON_START;

      const sortedMovies = this._getSortedMovies(movies, sortType, 0, showingFilmCount);

      filmListContainerElement.innerHTML = ``;

      this._renderFilms(filmListContainerElement, sortedMovies);
      renderShowMoreButton();
    });

    const topFilms = getSortedFilms(movies, FilmListType.RATING);
    const commentedFilms = getSortedFilms(movies, FilmListType.COMMENTS);
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

  _renderFilms(container, films) {
    films.forEach((film) => this._renderFilm(container, film));
  }

  _getSortedMovies(films, sortType, from, to) {
    let sortedMovies = [];
    const swowingMovies = films.slice();

    switch (sortType) {
      case SortTypes.get(`Sort by date`):
        sortedMovies = swowingMovies.sort((a, b) => b[sortType] - a[sortType]);
        break;
      case SortTypes.get(`Sort by rating`):
        sortedMovies = swowingMovies.sort((a, b) => b[sortType] - a[sortType]);
        break;
      case SortTypes.get(`Sort by default`):
        sortedMovies = swowingMovies;
        break;
    }

    return sortedMovies.slice(from, to);
  }
}
