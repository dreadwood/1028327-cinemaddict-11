// const getIDs = (comments) => {
//   if (typeof comments[0] === `string`) {
//     return comments;
//   }
//   return comments.map((comment) => {
//     return comment.id;
//   });
// };

export default class FilmModel {
  constructor(data) {
    this.id = data[`id`];
    this.comments = data[`comments`];
    this.title = data[`film_info`][`title`];
    this.originTitle = data[`film_info`][`alternative_title`];
    this.rating = data[`film_info`][`total_rating`];
    this.contentRating = data[`film_info`][`age_rating`];
    this.director = data[`film_info`][`director`];
    this.writers = data[`film_info`][`writers`];
    this.actors = data[`film_info`][`actors`];
    this.duration = data[`film_info`][`runtime`];
    this.genres = data[`film_info`][`genre`];
    this.poster = data[`film_info`][`poster`];
    this.description = data[`film_info`][`description`];
    this.date = new Date(data[`film_info`][`release`][`date`]);
    this.country = data[`film_info`][`release`][`release_country`];
    this.onWatchlist = data[`user_details`][`watchlist`];
    this.isWatched = data[`user_details`][`already_watched`];
    this.watchingDate = new Date(data[`user_details`][`watching_date`]);
    this.favorite = data[`user_details`][`favorite`];
  }

  toRAW() {
    return {
      "id": this.id,
      "comments": getIDs(this.comments), // ??
      "film_info": {
        "title": this.title,
        "alternative_title": this.originTitle,
        "total_rating": this.rating,
        "age_rating": this.contentRating,
        "director": this.director,
        "writers": this.writers,
        "actors": this.actors,
        "runtime": this.duration,
        "genre": this.genres,
        "poster": this.poster,
        "description": this.description,
        "release": {
          "date": this.date.toISOString(),
          "release_country": this.country
        },
      },
      "user_details": {
        "watchlist": this.onWatchlist,
        "already_watched": this.isWatched,
        "watching_date": this.watchingDate.toISOString(),
        "favorite": this.onFavorite
      }
    };
  }

  static parseFilm(data) {
    return new FilmModel(data);
  }

  static parseFilms(data) {
    return data.map(FilmModel.parseFilm);
  }

  static clone(data) {
    return new FilmModel(data.toRAW());
  }
}
