import AbstractSmartComponent from './abstract-smart-component.js';
import {getRandomArrayItem} from '../utils/common.js';
import {getRang} from '../utils/film-utils.js';

import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 50;

const FilterType = new Map([
  [`statistic-all-time`, 0],
  [`statistic-today`, 1],
  [`statistic-week`, 7],
  [`statistic-month`, 31],
  [`statistic-year`, 365],
]);

const countWatchedGenres = (watchedFilms) => {
  const watchedGenres = watchedFilms.length ? watchedFilms.slice().map((film) => film.genres).reduce((a, b) => [...a, ...b]) : [];
  const countedGenres = new Map();

  watchedGenres.forEach((genre) => {
    if (countedGenres.has(genre)) {
      countedGenres.set(genre, countedGenres.get(genre) + 1);
    } else {
      countedGenres.set(genre, 1);
    }
  });

  return countedGenres;
};

const getListWatchedGenres = (watchedFilms) => {
  const listWatchedGenres = [];
  countWatchedGenres(watchedFilms).forEach((value, key) => {
    listWatchedGenres.push({key, value});
  });

  return listWatchedGenres.sort((a, b) => b.value - a.value);
};

const renderChart = (watchedFilms, statisticCtx) => {
  const genres = getListWatchedGenres(watchedFilms).map((it) => it.key);
  const quantity = getListWatchedGenres(watchedFilms).map((it) => it.value);

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genres,
      datasets: [{
        data: quantity,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`,
        barThickness: 24
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

export default class Statistics extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;
    this._watchedFilms = this._filmsModel.getWatchedFilms();
    this._userRang = getRang(this._watchedFilms.length);

    this._daysFilter = null;
    this._renderChart();
  }

  getTemplate() {
    const quantityWatchedFilms = this._watchedFilms.length;
    const {hours, minutes} = this._getFilmsDuration();
    const topGenre = this._getTopsFilmGenre(this._watchedFilms);

    return (
      `<section class="statistic">
        <p class="statistic__rank">
          Your rank
          <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          <span class="statistic__rank-label">${this._userRang}</span>
        </p>

        <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
          <p class="statistic__filters-description">Show stats:</p>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
          <label for="statistic-all-time" class="statistic__filters-label">All time</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
          <label for="statistic-today" class="statistic__filters-label">Today</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
          <label for="statistic-week" class="statistic__filters-label">Week</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
          <label for="statistic-month" class="statistic__filters-label">Month</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
          <label for="statistic-year" class="statistic__filters-label">Year</label>
        </form>

        <ul class="statistic__text-list">
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">You watched</h4>
            <p class="statistic__item-text">${quantityWatchedFilms}  <span class="statistic__item-description">movies</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Total duration</h4>
            <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Top genre</h4>
            <p class="statistic__item-text">${topGenre}</p>
          </li>
        </ul>

        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>

      </section>`
    );
  }

  show() {
    super.show();

    this._watchedFilms = this._filmsModel.getWatchedFilms();
    this.rerender();
  }

  recoveryListeners() {
    this.setFilterClickHandler();
  }

  rerender() {
    super.rerender();
    this._renderChart();
  }

  setFilterClickHandler() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `INPUT`) {
        this._daysFilter = FilterType.get(evt.target.id);

        this._watchedFilms = this._getFilmsByPeriod(FilterType.get(evt.target.id));
        this.rerender();
        this.getElement().querySelector(`#${evt.target.id}`).checked = true;
      }
    });
  }

  _getFilmsByPeriod(date) {
    const dateFrom = (() => {
      if (!date) {
        return new Date(0);
      }
      const d = new Date();
      d.setDate(d.getDate() - date);
      return d;
    })();

    return this._filmsModel.getWatchedFilms().slice().filter((it) => {
      return it.watchingDate >= dateFrom;
    });
  }

  _renderChart() {
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    statisticCtx.height = BAR_HEIGHT * getListWatchedGenres(this._watchedFilms).length;

    if (this._chart) {
      this._chart.destroy();
      this._chart = null;
    }

    this._chart = renderChart(this._watchedFilms, statisticCtx);
  }

  _getFilmsDuration() {
    const durationWatchedFilms = this._watchedFilms.length ? this._watchedFilms.slice().map((film) => film.duration).reduce((a, b) => a + b) : 0;

    const hours = durationWatchedFilms ? Math.floor(durationWatchedFilms / 60) : 0;
    const minutes = durationWatchedFilms ? durationWatchedFilms % 60 : 0;

    return {
      hours,
      minutes,
    };
  }

  _getTopsFilmGenre(watchedGenres) {
    let topGenres = [];
    let topValue = 0;

    countWatchedGenres(watchedGenres).forEach((value, key) => {
      if (value > topValue) {
        topValue = value;
        topGenres = [key];
      } else if (value === topValue) {
        topGenres.push(key);
      }
    });

    return topGenres.length !== 0 ? getRandomArrayItem(topGenres) : ``;
  }
}
