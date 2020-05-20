import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
momentDurationFormatSetup(moment);

const getRatingForInsertion = (rating) => rating % 1 ? rating : rating + `.0`;

const getDurationFilm = (duration) => {
  return moment.duration(duration, `minutes`).format(`h[h] m[m]`);
};

const getReleaseDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

const getDateComment = (date) => {
  return moment(date).fromNow();
};

const getRandomDate = (minYear, maxYear) => {
  const start = new Date(minYear, 0);
  const end = new Date(maxYear, 0);

  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const countFilms = (movies) => {
  const quantity = {
    history: 0,
    favorites: 0,
    watchlist: 0,
  };

  movies.forEach((movie) => {
    quantity.watchlist += movie.onWatchlist ? 1 : 0;
    quantity.favorites += movie.onFavorite ? 1 : 0;
    quantity.history += movie.isWatched ? 1 : 0;
  });

  return quantity;
};

const getSortedFilms = (movies, sortType) => movies.slice().sort((a, b) => b[sortType] - a[sortType]);

export {getRatingForInsertion, getDurationFilm, getRandomDate, countFilms, getSortedFilms, getReleaseDate, getDateComment};
