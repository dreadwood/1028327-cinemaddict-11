export const getRandomInteger = (min = 0, max = Number.MAX_SAFE_INTEGER) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomRational = (min, max) => {
  return getRandomInteger(min, max) + Math.floor(Math.random() * 10) / 10;
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInteger(0, array.length);

  return array[randomIndex];
};

export const getArrayRandomItems = (array, count) => {
  const newArray = [];

  while (newArray.length < count) {
    const randomItem = getRandomArrayItem(array);
    if (newArray.indexOf(randomItem) === -1) {
      newArray.push(randomItem);
    }
  }

  return newArray;
};
