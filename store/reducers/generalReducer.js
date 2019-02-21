import { GET_ALL_CATEGORIES } from "../constants";

const initialState = {
  allCategories: []
};

export const generalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        allCategories: action.payload
      };
    default:
      return state;
  }
};
