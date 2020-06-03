import {UserRangs} from './const.js';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
momentDurationFormatSetup(moment);

export const getRatingForInsertion = (rating) => rating % 1 ? rating : rating + `.0`;

export const getDurationFilm = (duration) => {
  return moment.duration(duration, `minutes`).format(`h[h] m[m]`);
};

export const getReleaseDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const getDateComment = (date) => {
  return moment(date).fromNow();
};

export const getRandomDate = (minYear, maxYear) => {
  const start = new Date(minYear, 0);
  const end = new Date(maxYear, 0);

  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const countFilms = (films) => {
  const quantity = {
    history: 0,
    favorites: 0,
    watchlist: 0,
  };

  films.forEach((film) => {
    quantity.watchlist += film.onWatchlist ? 1 : 0;
    quantity.favorites += film.onFavorite ? 1 : 0;
    quantity.history += film.isWatched ? 1 : 0;
  });

  return quantity;
};

export const getRang = (quantityFilms) => {
  switch (true) {
    case (quantityFilms > 20):
      return UserRangs.EXPERT;
    case (quantityFilms > 10):
      return UserRangs.FAN;
    case (quantityFilms > 0):
      return UserRangs.NOVICE;
    default:
      return ``;
  }
};

export const getSortedFilms = (films, sortType) => films.slice().sort((a, b) => b[sortType] - a[sortType]);
