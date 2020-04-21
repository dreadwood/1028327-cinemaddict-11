export const countFilms = (movies) => {
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
