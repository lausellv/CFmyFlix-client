import { combineReducers } from "redux";

import {
  SET_MOVIES,
  SET_FILTER,
  SET_USER,
  UPDATE_USER, // profile view
  SET_FAVORITES,
  ADD_FAVORITE,
  DELETE_FAVORITE
} from "../actions/actions";

function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;
    default:
      return state;
  }
}

function favorites(state = [], action) {
  switch (action.type) {
    case SET_FAVORITES:
      return action.payload;
    case ADD_FAVORITE:
      return action.payload;
    case DELETE_FAVORITE:
      return action.payload;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.payload;
    default:
      return state;
  }
}
function user(state = "", action) {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case UPDATE_USER:
      return action.payload;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
  favorites
});

export default moviesApp;
