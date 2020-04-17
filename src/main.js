import {createUserProfileTemplate} from './components/user-profile.js';
import {createNavigationTemplate} from './components/navigation.js';
import {createSortingTemplate} from './components/sorting.js';
import {createMovieContainerTemplate} from './components/movie-container.js';
import {createMovieCardTemplate} from './components/movie-card.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createModalTemplate} from './components/modal.js';

import {generateMovies} from "./mock/movie.js";

const MOVIE_COUNT = 18;
const TOP_MOVIE_COUNT = 2;
const COMMENTED_MOVIE_COUNT = 2;

const movies = generateMovies(MOVIE_COUNT);

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
render(mainElement, createNavigationTemplate(), `beforeend`);
render(mainElement, createSortingTemplate(), `beforeend`);
render(mainElement, createMovieContainerTemplate(), `beforeend`);

const movieListElement = document.querySelector(`.films-list .films-list__container`);
const topMovieListElement = document.querySelector(`.films-list--top .films-list__container`);
const commentedMovieListElement = document.querySelector(`.films-list--commented .films-list__container`);

for (const movie of movies) {
  render(movieListElement, createMovieCardTemplate(movie), `beforeend`);
}

render(movieListElement, createShowMoreButtonTemplate(), `afterend`);
repeatRender(topMovieListElement, createMovieCardTemplate(movies[10]), `beforeend`, TOP_MOVIE_COUNT);
repeatRender(commentedMovieListElement, createMovieCardTemplate(movies[6]), `beforeend`, COMMENTED_MOVIE_COUNT);

const bodyElement = document.querySelector(`body`);

render(bodyElement, createModalTemplate(movies[3]), `beforeend`);
