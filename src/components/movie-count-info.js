import {getRandomIntegerNumber} from '../utils.js'

export const createMovieCountInfoTemplate = () => {
  return (
    `<p>${getRandomIntegerNumber(1, 130)} ${getRandomIntegerNumber(0, 999)} movies inside</p>`
  );
};
