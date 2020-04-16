export const createMovieCardTemplate = () => {
  const title = `The Man with the Golden Arm`;
  const rating = 9;
  const year = 1955; // вычисляется из даты
  const duration = `1h 59m`;
  const genres = [`Drama`];
  const poster = `./images/posters/the-man-with-the-golden-arm.jpg`;
  const description = `Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…`;
  const onWatchlist = false;
  const isWatched = true;
  const onFavorite = false;

  const ratingForInsertion = rating % 1 ? rating : rating + `.0`;
  const descriptionForInsertion = description.length > 140 ? (description.substring(0, 139) + `...`) : description;
  const watchlistButtonActiveClass = onWatchlist ? `film-card__controls-item--active` : ``;
  const watchedButtonActiveClass = isWatched ? `film-card__controls-item--active` : ``;
  const favoriteButtonActiveClass = onFavorite ? `film-card__controls-item--active` : ``;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${ratingForInsertion}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${poster}" alt="film poster ${title}" class="film-card__poster">
      <p class="film-card__description">${descriptionForInsertion}</p>
      <a class="film-card__comments">18 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistButtonActiveClass}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  ${watchedButtonActiveClass}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteButtonActiveClass}">Mark as favorite</button>
      </form>
    </article>`
  );
};
