import angular from 'angular';
import SaveBookmarksModule from './save-bookmark/save-bookmark';

import { BookmarksActions } from './bookmarks.state';

import template from './bookmarks.html';
import './bookmarks.css';

class BookmarksController {
  constructor($ngRedux, BookmarksModel, BookmarksActions) {
    'ngInject';

    this.store = $ngRedux;
    this.BookmarksActions = BookmarksActions;
    this.BookmarksModel = BookmarksModel;
  }

  $onInit() {
    this.deleteBookmark = this.BookmarksModel.deleteBookmark;

    this.store.subscribe(() => {
      this.bookmarks = this.store.getState().bookmarks;
      this.currentCategory = this.store.getState().category;
    });

    this.store.dispatch(this.BookmarksActions.getBookmarks());
  }

  createBookmark() {
    this.currentBookmark = this.initNewBookmark();
  }

  editBookmark(bookmark) {
    this.currentBookmark = bookmark;
  }

  initNewBookmark() {
    return {
      id: null,
      title: '',
      url: '',
      category: this.CategoriesModel.getCurrentCategory().name
    };
  }

  saveBookmark(bookmark) {
    if (bookmark.id) {
      this.BookmarksModel.updateBookmark(bookmark);
    } else {
      this.BookmarksModel.createBookmark(bookmark);
    }
  }

  onSave(bookmark) {
    this.saveBookmark(bookmark);
    this.reset();
  }

  reset() {
    this.currentBookmark = null;
  }
}

BookmarksController.$inject = ['$ngRedux', 'BookmarksModel', 'BookmarksActions'];

const BookmarksComponent = {
  template,
  controller: BookmarksController,
  controllerAs: 'bookmarksListCtrl'
};

const BookmarksModule = angular.module('bookmarks', [
    SaveBookmarksModule.name
  ])
  .factory('BookmarksActions', BookmarksActions)
  .component('bookmarks', BookmarksComponent);

export default BookmarksModule;