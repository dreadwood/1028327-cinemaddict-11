import UserProfile from './components/user-profile.js';
import PageController from './controllers/page.js';
import {getRandomInteger} from './utils/common.js';
import {render} from './utils/render.js';
import {generateFilms} from './mock/film.js';

const FILM_COUNT = 18;
const films = generateFilms(FILM_COUNT);

const isDataBaseEmpty = films.length === 0 ? true : false;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const userProfileComponent = new UserProfile();
render(headerElement, userProfileComponent);

const pageController = new PageController(mainElement);
pageController.render(films);

const footerStatisticsElement = document.querySelector(`.footer__statistics`);
const filmCountInfoElement = document.createElement(`p`);
filmCountInfoElement.textContent = `${isDataBaseEmpty ? `` : getRandomInteger(1, 130)} ${isDataBaseEmpty ? `0` : getRandomInteger(100, 999)} movies inside`;
footerStatisticsElement.appendChild(filmCountInfoElement);
