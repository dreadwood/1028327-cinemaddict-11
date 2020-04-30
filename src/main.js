import UserProfile from './components/user-profile.js';
import Navigation from './components/navigation.js';
import Sorting from './components/sorting.js';
import NoData from './components/no-data.js';
import FilmContainer from './components/film-container.js';
import FilmCard from './components/film-card.js';
import ShowMoreButton from './components/show-more-button.js';
import FilmDetails from './components/film-details.js';

import {getRandomInteger} from './utils/common.js';
import {render, remove} from './utils/render.js';
import {countFilms, getSortedFilms} from './utils/film-utils.js';
import {generateFilms} from './mock/film.js';

const FILM_COUNT = 18;
const TOP_FILM_COUNT = 2;
const COMMENTED_FILM_COUNT = 2;
const FILM_COUNT_ON_START = 5;
const FILM_COUNT_BY_BUTTON = 5;

const SortType = {
  RATING: `rating`,
  COMMENTS: `comments`,
};

const films = generateFilms(FILM_COUNT);
const quantity = countFilms(films);
const isDataBaseEmpty = films.length === 0 ? true : false;
let openedFilmDetails = false;

const repeatRender = (container, movies, iterations) => {
  for (let i = 0; i < iterations; i++) {
    renderFilm(container, movies[i]);
  }
};

const renderFilm = (place, movie) => {
  const openFilmDetails = (evt) => {
    evt.preventDefault();

    if (!openedFilmDetails) {
      bodyElement.appendChild(filmDetailsComponent.getElement());
      openedFilmDetails = true;
      document.addEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      evt.preventDefault();
      bodyElement.removeChild(filmDetailsComponent.getElement());
      openedFilmDetails = false;
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onFilmPosterClick = (evt) => openFilmDetails(evt);
  const onFilmTitleClick = (evt) => openFilmDetails(evt);
  const onFilmCommentsClick = (evt) => openFilmDetails(evt);

  const onCloseButtonClick = (evt) => {
    evt.preventDefault();
    bodyElement.removeChild(filmDetailsComponent.getElement());
    openedFilmDetails = false;
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const filmComponent = new FilmCard(movie);
  const filmPoster = filmComponent.getElement().querySelector(`.film-card__poster`);
  const filmTitle = filmComponent.getElement().querySelector(`.film-card__title`);
  const filmComments = filmComponent.getElement().querySelector(`.film-card__comments`);
  filmPoster.addEventListener(`click`, onFilmPosterClick);
  filmTitle.addEventListener(`click`, onFilmTitleClick);
  filmComments.addEventListener(`click`, onFilmCommentsClick);

  const filmDetailsComponent = new FilmDetails(movie);
  const closeButton = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
  closeButton.addEventListener(`click`, onCloseButtonClick);

  render(place, filmComponent);
};

const renderFilmList = (movies) => {
  if (isDataBaseEmpty) {
    const noDataComponent = new NoData();
    render(mainElement, noDataComponent);
    return;
  }

  const filmContainerComponent = new FilmContainer();
  render(mainElement, filmContainerComponent);

  const filmListElement = filmContainerComponent.getElement().querySelector(`.films-list`);
  const filmListContainerElement = filmListElement.querySelector(`.films-list__container`);

  let showingFilmCount = FILM_COUNT_ON_START;
  movies.slice(0, showingFilmCount).forEach((movie) => {
    renderFilm(filmListContainerElement, movie);
  });

  const showMoreButtonComponent = new ShowMoreButton();
  render(filmListElement, showMoreButtonComponent);

  const showMoreButton = filmListElement.querySelector(`.films-list__show-more`);
  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    const prevFilmCount = showingFilmCount;
    showingFilmCount += FILM_COUNT_BY_BUTTON;

    movies.slice(prevFilmCount, showingFilmCount).forEach((movie) => {
      renderFilm(filmListContainerElement, movie);
    });

    if (showingFilmCount >= movies.length) {
      remove(showMoreButtonComponent);
    }
  });

  const topFilms = getSortedFilms(films, SortType.RATING);
  const commentedFilms = getSortedFilms(films, SortType.COMMENTS);
  const topFilmListElement = filmContainerComponent.getElement().querySelector(`.films-list--top .films-list__container`);
  const commentedFilmListElement = filmContainerComponent.getElement().querySelector(`.films-list--commented .films-list__container`);
  repeatRender(topFilmListElement, topFilms, TOP_FILM_COUNT);
  repeatRender(commentedFilmListElement, commentedFilms, COMMENTED_FILM_COUNT);
};

const bodyElement = document.querySelector(`body`);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const userProfileComponent = new UserProfile();
const navigationComponent = new Navigation(quantity);
const sortingComponent = new Sorting();

render(headerElement, userProfileComponent);
render(mainElement, navigationComponent);
render(mainElement, sortingComponent);

renderFilmList(films);

const footerStatisticsElement = document.querySelector(`.footer__statistics`);
const filmCountInfoElement = document.createElement(`p`);
filmCountInfoElement.textContent = `${isDataBaseEmpty ? `` : getRandomInteger(1, 130)} ${isDataBaseEmpty ? `0` : getRandomInteger(100, 999)} movies inside`;
footerStatisticsElement.appendChild(filmCountInfoElement);
