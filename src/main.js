import {createUserProfileTemplate} from './components/user-profile.js';
import {createNavigationTemplate} from './components/navigation.js';
import {createSortingTemplate} from './components/sorting.js';
import {createMovieContainerTemplate} from './components/movie-container.js';
import {createMovieCardTemplate} from './components/movie-card.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createModalTemplate} from './components/modal.js';

const MOVIE_COUNT = 5;
const TOP_MOVIE_COUNT = 2;
const COMMENTED_MOVIE_COUNT = 2;

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

repeatRender(movieListElement, createMovieCardTemplate(), `beforeend`, MOVIE_COUNT);
render(movieListElement, createShowMoreButtonTemplate(), `afterend`);
repeatRender(topMovieListElement, createMovieCardTemplate(), `beforeend`, TOP_MOVIE_COUNT);
repeatRender(commentedMovieListElement, createMovieCardTemplate(), `beforeend`, COMMENTED_MOVIE_COUNT);

const bodyElement = document.querySelector(`body`);

render(bodyElement, createModalTemplate(), `beforeend`);
