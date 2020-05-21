export default class MoviesModel {
  constructor() {
    this._movies = [];

    this._dataChangeHandlers = [];
  }

  getMovies() {
    return this._movies;
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
    this._callHandlers(this._dataChangeHandlers);
  }

  updateMovie(id, movie) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
