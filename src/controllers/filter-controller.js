import Filter from '../components/filter.js';
import {render, replace} from '../utils/render.js';
import {FilterType} from '../utils/const.js';
import {getFilmsByFilter} from '../utils/filter-utils.js';

const BUTTON_STATS = `stats`;

export default class FilterController {
  constructor(container, filmsModel, pageController) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._pageController = pageController;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const allFilms = this._filmsModel.getFilmsAll();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getFilmsByFilter(allFilms, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new Filter(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(this._container, this._filterComponent);
    }
  }

  _onFilterChange(filterType) {
    if (filterType === BUTTON_STATS) {
      this._pageController.showStats();
    } else {
      this._pageController.hideStats();
      this._filmsModel.setFilter(filterType);
      this._activeFilterType = filterType;
    }
  }

  _onDataChange() {
    this.render();
  }
}
