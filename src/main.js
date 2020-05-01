import UserProfile from './components/user-profile.js';
import Navigation from './components/navigation.js';
import Sorting from './components/sorting.js';
import PageController from './controllers/page.js';
import {getRandomInteger} from './utils/common.js';
import {render} from './utils/render.js';
import {countFilms} from './utils/film-utils.js';
import {generateFilms} from './mock/film.js';

const FILM_COUNT = 18;

const films = generateFilms(FILM_COUNT);
const quantity = countFilms(films);
const isDataBaseEmpty = films.length === 0 ? true : false;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const userProfileComponent = new UserProfile();
const navigationComponent = new Navigation(quantity);
const sortingComponent = new Sorting();

render(headerElement, userProfileComponent);
render(mainElement, navigationComponent);
render(mainElement, sortingComponent);

const pageController = new PageController(mainElement);
pageController.render(films);

const footerStatisticsElement = document.querySelector(`.footer__statistics`);
const filmCountInfoElement = document.createElement(`p`);
filmCountInfoElement.textContent = `${isDataBaseEmpty ? `` : getRandomInteger(1, 130)} ${isDataBaseEmpty ? `0` : getRandomInteger(100, 999)} movies inside`;
footerStatisticsElement.appendChild(filmCountInfoElement);
