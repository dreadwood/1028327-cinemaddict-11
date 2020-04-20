import {getRandomIntegerNumber, getRandomRationalNumber, getRandomArrayItem, getArrayRandomItems, getRandomDate} from "../utils.js";

const MovieTitles = [
  {
    localName: `Человек с золотой рукой`,
    originName: `The Man with the Golden Arm`,
  },
  {
    localName: `Танец жизни`,
    originName: `The Dance of Life`,
  },
  {
    localName: `Папай-морячок встречается с Синдбадом-мореходом`,
    originName: `Popeye the Sailor Meets Sindbad the Sailor`,
  },
  {
    localName: `Вне закона`,
    originName: `Down by Law`,
  },
  {
    localName: `Гражданин Кейн`,
    originName: `Citizen Kane`,
  }
];

const Posters = [
  `the-man-with-the-golden-arm.jpg`,
  `popeye-meets-sinbad.png`,
  `the-dance-of-life.jpg`,
  `sagebrush-trail.jpg`,
  `made-for-each-other.png`
];

const textForDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const GenresTypes = [`Drama`, `Film-Noir`, `Mystery`, `Comedy`, `Horror`, `Crime`];

const ContentRatingItems = [0, 6, 12, 16, 18];

const CountryItems = [`USA`, `Russia`, `France`, `Germany`, `UK`, `Krakozhia`];

const Directors = [`Anthony Mann`, `Orson Welles`, `Dave Fleischer`, `Viktor Navorski`];
const Writers = [`Anne Wigton`, `Heinz Herald`, `Richard Weil`, `Herman J. Mankiewicz`, `Bryan Lee O'Malley`];
const Actors = [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`, `Orson Welles`, `Joseph Cotten`, `Tom Waits`, `John Lurie`, `Roberto Benigni`, `Tom Hanks`, `Iggy Pop`];

const getDescription = (text) => {
  const arraySentences = text.split(`. `).map((sentance) => {
    if (sentance[sentance.length - 1] !== `.`) {
      sentance += `.`;
    }
    return sentance;
  });
  const sentenceCount = getRandomIntegerNumber(1, 5);
  return getArrayRandomItems(arraySentences, sentenceCount).join(` `);
};

const generationMovie = () => {
  const movie = getRandomArrayItem(MovieTitles);

  return {
    title: movie.localName,
    originTitle: movie.originName,
    country: getRandomArrayItem(CountryItems),
    rating: getRandomRationalNumber(1, 10),
    contentRating: getRandomArrayItem(ContentRatingItems),
    date: getRandomDate(1936, 1987),
    director: getRandomArrayItem(Directors),
    writers: getArrayRandomItems(Writers, 3).join(`, `),
    actors: getArrayRandomItems(Actors, 3).join(`, `),
    duration: getRandomIntegerNumber(16, 119),
    genres: getArrayRandomItems(GenresTypes, 3),
    poster: getRandomArrayItem(Posters),
    description: getDescription(textForDescription),
    onWatchlist: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    onFavorite: Math.random() > 0.5,
    comments: getRandomIntegerNumber(0, 99),
  };
};

const generateMovies = (count) => {
  return new Array(count)
    .fill(``)
    .map(generationMovie);
};

export {generateMovies};
