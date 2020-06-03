import UserProfile from './components/user-profile.js';
import PageController from './controllers/page-controller.js';
import FilterController from './controllers/filter-controller.js';
import FilmsModel from './models/films-model.js';
import CommentsModel from './models/comments-model.js';
import {getRandomInteger} from './utils/common.js';
import {render} from './utils/render.js';
import {generateFilms} from './mock/film.js';
import {generationFilmComments} from './mock/comment.js';

const FILM_COUNT = 18;
const COMMENTS_COUNT = 4;
const films = generateFilms(FILM_COUNT);
const comments = generationFilmComments(COMMENTS_COUNT, films);

const isDataBaseEmpty = films.length === 0 ? true : false;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const userProfileComponent = new UserProfile();
render(headerElement, userProfileComponent);

const commentsModel = new CommentsModel();
const filmsModel = new FilmsModel(commentsModel);
filmsModel.setFilms(films);
commentsModel.setComments(comments);
filmsModel.setCommentsFilms();

const pageController = new PageController(mainElement, filmsModel, commentsModel);
const filterController = new FilterController(mainElement, filmsModel);
filterController.render();
pageController.render(films);

const footerStatisticsElement = document.querySelector(`.footer__statistics`);
const filmCountInfoElement = document.createElement(`p`);
filmCountInfoElement.textContent = `${isDataBaseEmpty ? `` : getRandomInteger(1, 130)} ${isDataBaseEmpty ? `0` : getRandomInteger(100, 999)} movies inside`;
footerStatisticsElement.appendChild(filmCountInfoElement);
