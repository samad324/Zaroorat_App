import { SET_ALL_CATEGORIES } from "../constants";

const initialState = {
  categories: []
};

export const generalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    default:
      return state;
  }
};
