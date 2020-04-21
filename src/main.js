import {createUserProfileTemplate} from './components/user-profile.js';
import {createNavigationTemplate} from './components/navigation.js';
import {createSortingTemplate} from './components/sorting.js';
import {createFilmContainerTemplate} from './components/film-container.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createFilmDetailsTemplate} from './components/film-details.js';

import {getRandomInteger, countFilms} from './utils.js';
import {generateFilms} from "./mock/film.js";

const FILM_COUNT = 18;
const TOP_FILM_COUNT = 2;
const COMMENTED_FILM_COUNT = 2;
const FILM_COUNT_ON_START = 5;
const FILM_COUNT_BY_BUTTON = 5;

const films = generateFilms(FILM_COUNT);
const quantity = countFilms(films);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const repeatRender = (container, template, place, iterations) => {
  for (let i = 0; i < iterations; i++) {
    render(container, template, place);
  }
};

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

render(headerElement, createUserProfileTemplate(), `beforeend`);
render(mainElement, createNavigationTemplate(quantity), `beforeend`);
render(mainElement, createSortingTemplate(), `beforeend`);
render(mainElement, createFilmContainerTemplate(), `beforeend`);

const filmListElement = document.querySelector(`.films-list`);
const filmListContainerElement = filmListElement.querySelector(`.films-list__container`);
const topFilmListElement = document.querySelector(`.films-list--top .films-list__container`);
const commentedFilmListElement = document.querySelector(`.films-list--commented .films-list__container`);

let showingFilmCount = FILM_COUNT_ON_START;
films.slice(0, showingFilmCount).forEach((movie) => {
  render(filmListContainerElement, createFilmCardTemplate(movie), `beforeend`);
});

render(filmListElement, createShowMoreButtonTemplate(), `beforeend`); // туть
const showMoreButton = filmListElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  const prevFilmCount = showingFilmCount;
  showingFilmCount += FILM_COUNT_BY_BUTTON;

  films.slice(prevFilmCount, showingFilmCount).forEach((movie) => {
    render(filmListContainerElement, createFilmCardTemplate(movie), `beforeend`);
  });

  if (showingFilmCount >= films.length) {
    showMoreButton.remove();
  }
});

repeatRender(topFilmListElement, createFilmCardTemplate(films[10]), `beforeend`, TOP_FILM_COUNT);
repeatRender(commentedFilmListElement, createFilmCardTemplate(films[6]), `beforeend`, COMMENTED_FILM_COUNT);

const footerStatisticsElement = document.querySelector(`.footer__statistics`);
const filmCountInfoElement = document.createElement(`p`);
filmCountInfoElement.textContent = `${getRandomInteger(1, 130)} ${getRandomInteger(100, 999)} movies inside`;
footerStatisticsElement.appendChild(filmCountInfoElement);

const bodyElement = document.querySelector(`body`);
render(bodyElement, createFilmDetailsTemplate(films[0]), `beforeend`);
