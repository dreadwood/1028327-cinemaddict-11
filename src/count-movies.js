export const countMovies = (items) => {
  const quantity = {
    history: 0,
    favorites: 0,
    watchlist: 0,
  };

  items.forEach((item) => {
    quantity.watchlist += item.isWatched ? 1 : 0;
    quantity.favorites += item.onFavorite ? 1 : 0;
    quantity.history += item.onWatchlist ? 1 : 0;
  });

  return quantity;
};
