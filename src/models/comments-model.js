export default class CommentsModel {
  constructor() {
    this._comments = [];

    this._dataChangeHandlers = []; // TODO: It is necessary?
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = Array.from(comments);
    this._callHandlers(this._dataChangeHandlers); // TODO: It is necessary?
  }

  getFilmComment(id) {
    const index = this._comments.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    return this._comments[index].comments;
  }

  removeComment(id, indexComment) {
    const index = this._comments.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._comments = this._comments[index].comments.splice(indexComment, 1);

    return true;
  }

  addComment(сomment) {
    this._comments = [].concat(сomment, this._comments);
    this._callHandlers(this._dataChangeHandlers);
  }

  setDataChangeHandler(handler) { // TODO: It is necessary?
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) { // TODO: It is necessary?
    handlers.forEach((handler) => handler());
  }
}
