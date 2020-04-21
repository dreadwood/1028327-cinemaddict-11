const getRandomInteger = (min = 0, max = Number.MAX_SAFE_INTEGER) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomRational = (min, max) => {
  return getRandomInteger(min, max) + Math.floor(Math.random() * 10) / 10;
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInteger(0, array.length);

  return array[randomIndex];
};

const getArrayRandomItems = (array, count) => {
  const newArray = [];

  while (newArray.length < count) {
    const randomItem = getRandomArrayItem(array);
    if (newArray.indexOf(randomItem) === -1) {
      newArray.push(randomItem);
    }
  }

  return newArray;
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
    quantity.watchlist += movie.isWatched ? 1 : 0;
    quantity.favorites += movie.onFavorite ? 1 : 0;
    quantity.history += movie.onWatchlist ? 1 : 0;
  });

  return quantity;
};

export {getRandomInteger, getRandomRational, getRandomArrayItem, getArrayRandomItems, getRandomDate, countFilms};
