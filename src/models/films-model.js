import {getFilmsByFilter, getWatchedFilms} from '../utils/filter-utils.js';
import {FilterType} from '../utils/const.js';

export default class FilmsModel {
  constructor(commentsModel) {
    this._commentsModel = commentsModel;

    this._activeFilterType = FilterType.ALL;

    this._films = [];
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getFilms() {
    return getFilmsByFilter(this._films, this._activeFilterType);
  }

  getWatchedFilms() {
    return getWatchedFilms(this._films);
  }

  getFilmsAll() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setCommentsFilms() {
    this._films.forEach((film) => {
      film.comments = this._commentsModel.getFilmComment(film.id);
    });
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
