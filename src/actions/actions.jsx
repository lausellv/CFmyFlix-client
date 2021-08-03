// src/actions/actions.js

export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
export const SET_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER"
export const SET_FAVORITES = "SET_FAVORITES";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const DELETE_FAVORITE = "DELETE_FAVORITE";
export const SET_VIEW = "SET_VIEW";


export const setMovies = value => {
  return { type: SET_MOVIES, payload: { value } };
};

export const setFilter = value => {
  return { type: SET_FILTER, payload: { value } };
};

export const setUser = value => {
  return { type: SET_USER, payload: { value } };
};

export const updateUser = value =>{
  return { type: UPDATE_USER, payload: { value } };
}

export const setFavorites = value => {
  return { type: SET_FAVORITES, payload: { value } };
};

export const addFavorite = value => {
  return { type: ADD_FAVORITE, payload: { value } };
};

export const deleteFavorite = value => {
  return { type: DELETE_FAVORITE, payload: { value } };
};

