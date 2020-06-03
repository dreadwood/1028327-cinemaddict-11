import NoData from '../components/no-data.js';
import Sorting, {SortTypes} from '../components/sorting.js';
import FilmContainer from '../components/film-container.js';
import ShowMoreButton from '../components/show-more-button.js';
import Statistics from '../components/statistics.js';
import FilmController from './film-controller.js';
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

const renderFilms = (container, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const filmController = new FilmController(container, onDataChange, onViewChange);
    filmController.render(film);

    return filmController;
  });
};

export default class PageController {
  constructor(container, filmsModel, commentsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;

    this._showedFilmControllers = [];
    this._showingFilmCount = FILM_COUNT_ON_START;

    this._sortingComponent = new Sorting();
    this._noDataComponent = new NoData();
    this._filmContainerComponent = new FilmContainer();
    this._showMoreButtonComponent = new ShowMoreButton();
    this._sortingComponent = new Sorting();
    this._statisticComponent = new Statistics(this._filmsModel);

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
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  showStats() {
    this._filmContainerComponent.hide();
    this._sortingComponent.hide();
    this._statisticComponent.show();
  }

  hideStats() {
    this._filmContainerComponent.show();
    this._sortingComponent.show();
    this._statisticComponent.hide();
  }

  _renderStats() { // переместить вниз
    render(this._container, this._statisticComponent);
    this._statisticComponent.hide();
  }

  render() {
    const films = this._filmsModel.getFilms();

    render(this._container, this._sortingComponent);

    if (films.length === 0) {
      render(this._container, this._noDataComponent);
      return;
    }

    this._renderStats();

    render(this._container, this._filmContainerComponent);
    this._renderFilms(films.slice(0, this._showingFilmCount));

    this._renderShowMoreButton();

    const topFilms = getSortedFilms(films, FilmListType.RATING);
    const commentedFilms = getSortedFilms(films, FilmListType.COMMENTS);

    renderFilms(this._topFilmListElement, topFilms.slice(0, TOP_FILM_COUNT), this._onDataChange, this._onViewChange); // change on _getSortedFilms or let it go?
    renderFilms(this._commentedFilmListElement, commentedFilms.slice(0, COMMENTED_FILM_COUNT), this._onDataChange, this._onViewChange);
  }

  _removeFilms() {
    this._showedFilmControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmControllers = [];
  }

  _renderFilms(films) {
    const newFilms = renderFilms(this._filmListContainerElement, films, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._showingFilmCount = this._showedFilmControllers.length;
  }

  _getSortedFilms(films, sortType, from, to) {
    let sortedFilms = [];
    const swowingFilms = films.slice();

    switch (sortType) {
      case SortTypes.get(`Sort by date`):
        sortedFilms = swowingFilms.sort((a, b) => b[sortType] - a[sortType]);
        break;
      case SortTypes.get(`Sort by rating`):
        sortedFilms = swowingFilms.sort((a, b) => b[sortType] - a[sortType]);
        break;
      case SortTypes.get(`Sort by default`):
        sortedFilms = swowingFilms;
        break;
    }

    return sortedFilms.slice(from, to);
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._showingFilmCount >= this._filmsModel.getFilms().length) {
      return;
    }

    render(this._filmListElement, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(() => this._onShowMoreButtonClick());
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._filmsModel.getFilms().slice(0, count));
    this._renderShowMoreButton();
  }

  _onDataChange(filmController, oldData, newData) {
    const isSuccess = this._filmsModel.updateFilm(oldData.id, newData);

    if (isSuccess) {
      filmController.render(newData);
    }
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const films = this._filmsModel.getFilms();
    this._showingFilmCount = FILM_COUNT_ON_START;

    const sortedFilms = this._getSortedFilms(films, sortType, 0, this._showingFilmCount);

    this._removeFilms();
    this._renderFilms(sortedFilms);

    this._renderShowMoreButton();
  }

  _onShowMoreButtonClick() {
    const prevFilmCount = this._showingFilmCount;
    const films = this._filmsModel.getFilms();

    this._showingFilmCount += FILM_COUNT_BY_BUTTON;

    const sortedFilms = this._getSortedFilms(films, this._sortingComponent.getSortType(), prevFilmCount, this._showingFilmCount);
    this._renderFilms(sortedFilms);

    if (this._showingFilmCount >= films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onFilterChange() {
    this._updateFilms(FILM_COUNT_ON_START);
  }
}
