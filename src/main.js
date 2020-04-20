import {createUserProfileTemplate} from './components/user-profile.js';
import {createNavigationTemplate} from './components/navigation.js';
import {createSortingTemplate} from './components/sorting.js';
import {createMovieContainerTemplate} from './components/movie-container.js';
import {createMovieCardTemplate} from './components/movie-card.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createModalTemplate} from './components/modal.js';
import {createMovieCountInfoTemplate} from './components/movie-count-info.js';

import {countMovies} from './count-movies.js';
import {generateMovies} from "./mock/movie.js";

const MOVIE_COUNT = 18;
const TOP_MOVIE_COUNT = 2;
const COMMENTED_MOVIE_COUNT = 2;
const MOVIE_COUNT_ON_START = 5;
const MOVIE_COUNT_BY_BUTTON = 5;

const movies = generateMovies(MOVIE_COUNT);
const quantity = countMovies(movies);

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
render(mainElement, createMovieContainerTemplate(), `beforeend`);

const movieListElement = document.querySelector(`.films-list`);
const movieListContainerElement = movieListElement.querySelector(`.films-list__container`);
const topMovieListElement = document.querySelector(`.films-list--top .films-list__container`);
const commentedMovieListElement = document.querySelector(`.films-list--commented .films-list__container`);

let showingMovieCount = MOVIE_COUNT_ON_START;
movies.slice(0, showingMovieCount).forEach((movie) => {
  render(movieListContainerElement, createMovieCardTemplate(movie), `beforeend`);
});

render(movieListElement, createShowMoreButtonTemplate(), `beforeend`); // туть
const showMoreButton = movieListElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  const prevMovieCount = showingMovieCount;
  showingMovieCount += MOVIE_COUNT_BY_BUTTON;

  movies.slice(prevMovieCount, showingMovieCount).forEach((movie) => {
    render(movieListContainerElement, createMovieCardTemplate(movie), `beforeend`);
  });

  if (showingMovieCount >= movies.length) {
    showMoreButton.remove();
  }
});

repeatRender(topMovieListElement, createMovieCardTemplate(movies[10]), `beforeend`, TOP_MOVIE_COUNT);
repeatRender(commentedMovieListElement, createMovieCardTemplate(movies[6]), `beforeend`, COMMENTED_MOVIE_COUNT);

const footerStatisticsElement = document.querySelector(`.footer__statistics`);
render(footerStatisticsElement, createMovieCountInfoTemplate(), `beforeend`);

const bodyElement = document.querySelector(`body`);
render(bodyElement, createModalTemplate(movies[0]), `beforeend`);
