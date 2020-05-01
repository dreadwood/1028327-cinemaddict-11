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

export {getRandomInteger, getRandomRational, getRandomArrayItem, getArrayRandomItems};
