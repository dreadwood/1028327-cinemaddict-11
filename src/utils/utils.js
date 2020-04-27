const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFOR_END: `beforeend`,
};

const getRandomInteger = (min = 0, max = Number.MAX_SAFE_INTEGER) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomRational = (min, max) => {
  return getRandomInteger(min, max) + Math.floor(Math.random() * 10) / 10;
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInteger(0, array.length);

  return array[randomIndex];
};

const getArrayRandomItems = (array, count) => {
  const newArray = [];

  while (newArray.length < count) {
    const randomItem = getRandomArrayItem(array);
    if (newArray.indexOf(randomItem) === -1) {
      newArray.push(randomItem);
    }
  }

  return newArray;
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place = RenderPosition.BEFOR_END) => {
  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOR_END:
      container.append(element);
      break;
  }
};

export {getRandomInteger, getRandomRational, getRandomArrayItem, getArrayRandomItems, createElement, RenderPosition, render};
