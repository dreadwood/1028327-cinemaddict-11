import {FilterType} from './const.js';

const getWatchlistFilms = (films) => {
  return films.filter((film) => film.onWatchlist);
};

export const getWatchedFilms = (films) => {
  return films.filter((film) => film.isWatched);
};

const getFavoritesFilms = (films) => {
  return films.filter((film) => film.onFavorite);
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
