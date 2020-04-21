const createFilmButtonMarkup = (filmButton, isActive) => {
  const [type, name] = filmButton;
  return (
    `<button class="film-card__controls-item button film-card__controls-item--${type} ${isActive ? `film-card__controls-item--active` : ``}">${name}</button>`
  );
};

export const createFilmCardTemplate = (movie) => {
  const {title, rating, date, duration, genres, poster, description, onWatchlist, isWatched, onFavorite, comments} = movie;

  const ratingForInsertion = rating % 1 ? rating : rating + `.0`;
  const year = date.getDate();
  const descriptionForInsertion = description.length > 140 ? (description.substring(0, 139) + `...`) : description;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${ratingForInsertion}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="film poster ${title}" class="film-card__poster">
      <p class="film-card__description">${descriptionForInsertion}</p>
      <a class="film-card__comments">${comments} comments</a>
      <form class="film-card__controls">
        ${createFilmButtonMarkup([`add-to-watchlist`, `Add to watchlist`], onWatchlist)}
        ${createFilmButtonMarkup([`mark-as-watched`, `Mark as watched`], isWatched)}
        ${createFilmButtonMarkup([`favorite`, `Mark as favorite`], onFavorite)}
      </form>
    </article>`
  );
};
