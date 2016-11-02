import {uniqueId, findIndex, remove} from 'lodash';

class BookmarksModel {
  constructor($q) {
    'ngInject';

    this.$q = $q;
    this.bookmarks = [
      {"id":1, "title": "Остров Сокровищ", "url": "https://www.youtube.com/watch?v=O9J1INLXJNY", "category": "Adventure" },
    {"id":2, "title": "Matrix", "url": "http://www.imdb.com/title/tt0133093/", "category": "Sci-fi" },
    {"id":3, "title": "Saw", "url": "http://www.imdb.com/title/tt0387564/?ref_=nv_sr_1", "category": "Thriller" },
    {"id":4, "title": "Ace Ventura", "url": "http://www.imdb.com/title/tt0109040/?ref_=nv_sr_2", "category": "Comedy" }
    ];
  }

  getBookmarks() {
    return this.$q.when(this.bookmarks);
  }

  createBookmark(bookmark) {
    bookmark.id = uniqueId();
    this.bookmarks.push(bookmark);
  }

  updateBookmark(bookmark) {
    const index = findIndex(this.bookmarks, b => b.id === bookmark.id);
    this.bookmarks[index] = bookmark;
  }

  deleteBookmark(bookmark) {
    remove(this.bookmarks, b => b.id === bookmark.id);
  }
}

BookmarksModel.$inject = ['$q'];

export default BookmarksModel;