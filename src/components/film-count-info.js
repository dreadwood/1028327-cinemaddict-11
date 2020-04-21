import {getRandomInteger} from '../utils.js';

export const createFilmCountInfoTemplate = () => {
  return (
    `<p>${getRandomInteger(1, 130)} ${getRandomInteger(0, 999)} movies inside</p>`
  );
};
