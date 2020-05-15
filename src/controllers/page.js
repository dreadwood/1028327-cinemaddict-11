import Navigation from '../components/navigation.js';
import NoData from '../components/no-data.js';
import Sorting, {SortTypes} from '../components/sorting.js';
import FilmContainer from '../components/film-container.js';
import ShowMoreButton from '../components/show-more-button.js';
import MovieController from './movie.js';
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

    this._movies = [];
    this._showedMovieControllers = [];
    this._showingFilmCount = FILM_COUNT_ON_START;

    this._sortingComponent = new Sorting();
    this._noDataComponent = new NoData();
    this._filmContainerComponent = new FilmContainer();
    this._showMoreButtonComponent = new ShowMoreButton();
    this._sortingComponent = new Sorting();

    this._filmListElement = this._filmContainerComponent.getElement().querySelector(`.films-list`);
    this._filmListContainerElement = this._filmListElement.querySelector(`.films-list__container`);
    this._topFilmListElement = this._filmContainerComponent.getElement().querySelector(`.films-list--top .films-list__container`); // simplify
    this._commentedFilmListElement = this._filmContainerComponent.getElement().querySelector(`.films-list--commented .films-list__container`); // simplify

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(movies) {
    this._movies = movies;

    const quantity = countFilms(movies);
    const navigationComponent = new Navigation(quantity);
    render(this._container, navigationComponent);
    render(this._container, this._sortingComponent);

    const isDataBaseEmpty = movies.length === 0 ? true : false;
    if (isDataBaseEmpty) {
      render(this._container, this._noDataComponent);
      return;
    }

    render(this._container, this._filmContainerComponent);

    const newMovies = this._renderFilms(this._filmListContainerElement, movies.slice(0, this._showingFilmCount), this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);

    this._renderShowMoreButton();

    const topFilms = getSortedFilms(movies, FilmListType.RATING);
    const commentedFilms = getSortedFilms(movies, FilmListType.COMMENTS);

    this._renderFilms(this._topFilmListElement, topFilms.slice(0, TOP_FILM_COUNT, this._onDataChange, this._onViewChange));
    this._renderFilms(this._commentedFilmListElement, commentedFilms.slice(0, COMMENTED_FILM_COUNT, this._onDataChange, this._onViewChange));
  }

  _renderFilms(container, movies, onDataChange, onViewChange) {
    return movies.map((movie) => {
      const movieController = new MovieController(container, onDataChange, onViewChange);
      movieController.render(movie);

      return movieController;
    });
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

  _renderShowMoreButton() {
    if (this._showingFilmCount >= this._movies.length) {
      return;
    }

    render(this._filmListElement, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler((evt) => {
      evt.preventDefault();
      const prevFilmCount = this._showingFilmCount;
      this._showingFilmCount += FILM_COUNT_BY_BUTTON;

      const sortedMovies = this._getSortedMovies(this._movies, this._sortingComponent.getSortType(), prevFilmCount, this._showingFilmCount);
      const newMovies = this._renderFilms(this._filmListContainerElement, sortedMovies, this._onDataChange, this._onViewChange);
      this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);

      if (this._showingFilmCount >= this._movies.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    this._showingFilmCount = FILM_COUNT_ON_START;

    const sortedMovies = this._getSortedMovies(this._movies, sortType, 0, this._showingFilmCount);

    this._filmListContainerElement.innerHTML = ``;

    const newMovies = this._renderFilms(this._filmListContainerElement, sortedMovies, this._onDataChange, this._showingFilmCount);
    this._showedMovieControllers = newMovies;

    this._renderShowMoreButton();
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._movies.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._movies = [].concat(this._movies.slice(0, index), newData, this._movies.slice(index + 1));

    movieController.render(this._movies[index]);
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }
}
