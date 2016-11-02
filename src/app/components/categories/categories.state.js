//--------------------------------------------------------------
//  Constants
//--------------------------------------------------------------
export const GET_CATEGORIES = 'GET_CATEGORIES';

//--------------------------------------------------------------
//  Reducers
//--------------------------------------------------------------

export const initialCategories = [
    {"id": 0, "name": "Sci-fi"},
    {"id": 1, "name": "Thriller"},
    {"id": 2, "name": "Comedy"},
    {"id": 3, "name": "Adventure"}
];


export const categories = (state = initialCategories, {type, payload}) => {
  switch (type) {
    case GET_CATEGORIES:
      return payload || state;
    default:
      return state;
  }
};