import {FilterType} from './const.js';

const getWatchlistFilms = (movies) => {
  return movies.filter((movie) => movie.onWatchlist);
};

const getWatchedFilms = (movies) => {
  return movies.filter((movie) => movie.isWatched);
};

const getFavoritesFilms = (movies) => {
  return movies.filter((movie) => movie.onFavorite);
};

export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL: // remove?
      return films;
    case FilterType.WATCHLIST:
      return getWatchlistFilms(films);
    case FilterType.HISTORY:
      return getWatchedFilms(films);
    case FilterType.FAVORITES:
      return getFavoritesFilms(films);
  }

  return films;
};
