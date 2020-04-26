import UserProfile from './components/user-profile.js';
import Navigation from './components/navigation.js';
import Sorting from './components/sorting.js';
import FilmContainer from './components/film-container.js';
import FilmCard from './components/film-card.js';
import ShowMoreButton from './components/show-more-button.js';
import FilmDetails from './components/film-details.js';

import {getRandomInteger, render} from './utils/utils.js';
import {countFilms, getSortedFilms} from './utils/film-utils.js';
import {generateFilms} from "./mock/film.js";

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

const repeatRender = (container, movies, iterations) => {
  for (let i = 0; i < iterations; i++) {
    render(container, new FilmCard(movies[i]).getElement());
  }
};

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

render(headerElement, new UserProfile().getElement());
render(mainElement, new Navigation(quantity).getElement());
render(mainElement, new Sorting().getElement());
render(mainElement, new FilmContainer().getElement());

const filmListElement = document.querySelector(`.films-list`);
const filmListContainerElement = filmListElement.querySelector(`.films-list__container`);

let showingFilmCount = FILM_COUNT_ON_START;
films.slice(0, showingFilmCount).forEach((movie) => {
  render(filmListContainerElement, new FilmCard(movie).getElement());
});

const showMoreButtonComponent = new ShowMoreButton();
render(filmListElement, showMoreButtonComponent.getElement());

const showMoreButton = filmListElement.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  const prevFilmCount = showingFilmCount;
  showingFilmCount += FILM_COUNT_BY_BUTTON;

  films.slice(prevFilmCount, showingFilmCount).forEach((movie) => {
    render(filmListContainerElement, new FilmCard(movie).getElement());
  });

  if (showingFilmCount >= films.length) {
    showMoreButtonComponent.getElement().remove();
    showMoreButtonComponent.removeElement();
  }
});

const topFilms = getSortedFilms(films, SortType.RATING);
const commentedFilms = getSortedFilms(films, SortType.COMMENTS);
const topFilmListElement = document.querySelector(`.films-list--top .films-list__container`);
const commentedFilmListElement = document.querySelector(`.films-list--commented .films-list__container`);
repeatRender(topFilmListElement, topFilms, TOP_FILM_COUNT);
repeatRender(commentedFilmListElement, commentedFilms, COMMENTED_FILM_COUNT);

const footerStatisticsElement = document.querySelector(`.footer__statistics`);
const filmCountInfoElement = document.createElement(`p`);
filmCountInfoElement.textContent = `${getRandomInteger(1, 130)} ${getRandomInteger(100, 999)} movies inside`;
footerStatisticsElement.appendChild(filmCountInfoElement);

const bodyElement = document.querySelector(`body`);
// render(bodyElement, new FilmDetails(films[10]).getElement());
