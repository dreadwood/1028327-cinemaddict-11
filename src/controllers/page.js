import NoData from '../components/no-data.js';
import Sorting, {SortTypes} from '../components/sorting.js';
import FilmContainer from '../components/film-container.js';
import ShowMoreButton from '../components/show-more-button.js';
import MovieController from './movie.js';
import {render, remove} from '../utils/render.js';
import {getSortedFilms} from '../utils/film-utils.js';

const TOP_FILM_COUNT = 2;
const COMMENTED_FILM_COUNT = 2;
const FILM_COUNT_ON_START = 5;
const FILM_COUNT_BY_BUTTON = 5;

const FilmListType = {
  RATING: `rating`,
  COMMENTS: `comments`,
};

const renderFilms = (container, movies, onDataChange, onViewChange) => {
  return movies.map((movie) => {
    const movieController = new MovieController(container, onDataChange, onViewChange);
    movieController.render(movie);

    return movieController;
  });
};

export default class PageController {
  constructor(container, moviesModel, commentsModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;

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
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const movies = this._moviesModel.getMovies();

    render(this._container, this._sortingComponent);

    const isDataBaseEmpty = movies.length === 0 ? true : false;
    if (isDataBaseEmpty) {
      render(this._container, this._noDataComponent);
      return;
    }

    render(this._container, this._filmContainerComponent);
    this._renderFilms(movies.slice(0, this._showingFilmCount));

    this._renderShowMoreButton();

    const topFilms = getSortedFilms(movies, FilmListType.RATING);
    const commentedFilms = getSortedFilms(movies, FilmListType.COMMENTS);

    renderFilms(this._topFilmListElement, topFilms.slice(0, TOP_FILM_COUNT), this._onDataChange, this._onViewChange); // change on _getSortedMovies or let it go?
    renderFilms(this._commentedFilmListElement, commentedFilms.slice(0, COMMENTED_FILM_COUNT), this._onDataChange, this._onViewChange);
  }

  _removeFilms() {
    this._showedMovieControllers.forEach((movieController) => movieController.destroy());
    this._showedMovieControllers = [];
  }

  _renderFilms(movies) {
    const newMovies = renderFilms(this._filmListContainerElement, movies, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);
    this._showingFilmCount = this._showedMovieControllers.length;
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
    remove(this._showMoreButtonComponent);

    if (this._showingFilmCount >= this._moviesModel.getMovies().length) {
      return;
    }

    render(this._filmListElement, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(() => this._onShowMoreButtonClick());
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._moviesModel.getMovies().slice(0, count));
    this._renderShowMoreButton();
  }

  _onDataChange(movieController, oldData, newData) {
    const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);

    if (isSuccess) {
      movieController.render(newData);
    }
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const movies = this._moviesModel.getMovies();
    this._showingFilmCount = FILM_COUNT_ON_START;

    const sortedMovies = this._getSortedMovies(movies, sortType, 0, this._showingFilmCount);

    this._removeFilms();
    this._renderFilms(sortedMovies);

    this._renderShowMoreButton();
  }

  _onShowMoreButtonClick() {
    const prevFilmCount = this._showingFilmCount;
    const movies = this._moviesModel.getMovies();

    this._showingFilmCount += FILM_COUNT_BY_BUTTON;

    const sortedMovies = this._getSortedMovies(movies, this._sortingComponent.getSortType(), prevFilmCount, this._showingFilmCount);
    this._renderFilms(sortedMovies);

    if (this._showingFilmCount >= movies.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onFilterChange() {
    this._updateFilms(FILM_COUNT_ON_START);
  }
}
