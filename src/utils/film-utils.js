const getRatingForInsertion = (rating) => rating % 1 ? rating : rating + `.0`;

const getdurationInHours = (duration) => `${duration > 60
  ? Math.floor(duration / 60) + `h `
  : ``}${duration % 60}m`;

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
    quantity.watchlist += movie.isWatched ? 1 : 0;
    quantity.favorites += movie.onFavorite ? 1 : 0;
    quantity.history += movie.onWatchlist ? 1 : 0;
  });

  return quantity;
};

const getSortedFilms = (movies, sortType) => movies.slice().sort((a, b) => b[sortType] - a[sortType]);

export {getRatingForInsertion, getdurationInHours, getRandomDate, countFilms, getSortedFilms};
