import UserProfile from './components/user-profile.js';
import FooterStatistics from './components/footer-statistics.js';
import PageController from './controllers/page-controller.js';
import FilterController from './controllers/filter-controller.js';
import FilmsModel from './models/films-model.js';
import CommentsModel from './models/comments-model.js';
import {render} from './utils/render.js';
import {generateFilms} from './mock/film.js';
import {generationFilmComments} from './mock/comment.js';

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const FILM_COUNT = 18;
const COMMENTS_COUNT = 4;
const films = generateFilms(FILM_COUNT);
const comments = generationFilmComments(COMMENTS_COUNT, films);

const userProfileComponent = new UserProfile();
const footerStatisticsComponent = new FooterStatistics(films.length);
render(headerElement, userProfileComponent);
render(footerElement, footerStatisticsComponent);

const commentsModel = new CommentsModel();
const filmsModel = new FilmsModel(commentsModel);
filmsModel.setFilms(films);
commentsModel.setComments(comments);
filmsModel.setCommentsFilms();

const pageController = new PageController(mainElement, filmsModel, commentsModel);
const filterController = new FilterController(mainElement, filmsModel, pageController);
filterController.render();
pageController.render(films);
