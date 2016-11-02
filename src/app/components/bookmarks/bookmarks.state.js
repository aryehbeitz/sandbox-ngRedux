import { uniqueId } from 'lodash';

//------------------------------------------------------------
// Constants
//------------------------------------------------------------

export const GET_BOOKMARKS = "GET_BOOKMARKS";
export const GET_SELECTED_BOOKMARK = "GET_SELECTED_BOOKMARK";
export const RESET_SELECTED_BOOKMARK = "RESET_SELECTED_BOOKMARK";
export const CREATE_BOOKMARK = "CREATE_BOOKMARK";
export const UPDATE_BOOKMARK = "UPDATE_BOOKMARK";
export const DELETE_BOOKMARK = "DELETE_BOOKMARK";


//------------------------------------------------------------
// Actions
//------------------------------------------------------------

export const BookmarksActions = ($ngRedux) => {
  'ngInject';

  const getBookmarks = bookmarks => {
    return {type: GET_BOOKMARKS, payload: bookmarks};
  };

  const selectBookmark = (bookmark = initialBookmark) => {
    const { category } = $ngRedux.getState(),
      payload = bookmark.id ? bookmark
        : Object.assign({}, bookmark, { category: category.name});

    return {type: GET_SELECTED_BOOKMARK, payload};
  };

  const resetSelectedBookmark = () => {
    return {type: RESET_SELECTED_BOOKMARK};
  };

  const saveBookmark = bookmark => {
    const hasId = !!bookmark.id,
      type = hasId ? UPDATE_BOOKMARK : CREATE_BOOKMARK;

      if(!hasId) bookmark.id = uniqueId(100); // simulating backend

      return {type, payload: bookmark};
  };

  const deleteBookmark = bookmark => {
    return {type: DELETE_BOOKMARK, payload: bookmark};
  };

  return {
    getBookmarks,
    resetSelectedBookmark,
    selectBookmark,
    saveBookmark,
    deleteBookmark
  };
};

BookmarksActions.$inject = ['$ngRedux'];

//------------------------------------------------------------
// Reducers
//------------------------------------------------------------


const initialBookmarks = [
    {"id":1, "title": "Остров Сокровищ", "url": "https://www.youtube.com/watch?v=O9J1INLXJNY", "category": "Adventure" },
    {"id":2, "title": "Matrix", "url": "http://www.imdb.com/title/tt0133093/", "category": "Sci-fi" },
    {"id":3, "title": "Saw", "url": "http://www.imdb.com/title/tt0387564/?ref_=nv_sr_1", "category": "Thriller" },
    {"id":4, "title": "Ace Ventura", "url": "http://www.imdb.com/title/tt0109040/?ref_=nv_sr_2", "category": "Comedy" }
];

export const bookmarks = (state = initialBookmarks, {type, payload}) => {
  switch (type) {
    case GET_BOOKMARKS:
      return payload || state;
    case CREATE_BOOKMARK:
      state.push(payload);
      return state;
    case UPDATE_BOOKMARK:
      const index = state.findIndex(b => b.id === payload.id);
      state[index] = payload;
      return state;
    case DELETE_BOOKMARK:
      const indexD = state.findIndex(b => b.id === payload.id);
      state.splice(indexD, 1);
      return state;
    default:
      return state;
  }
};

const initialBookmark = {"id": null, "title": "", "url": "", "category": null }

export const bookmark = (state = initialBookmark, {type, payload}) => {
  switch (type) {
    case GET_SELECTED_BOOKMARK:
      return payload || state;
    case RESET_SELECTED_BOOKMARK:
      return initialBookmark;
    default:
      return state;
  }
};