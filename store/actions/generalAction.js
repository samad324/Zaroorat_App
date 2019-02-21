import { GET_ALL_CATEGORIES } from "../constants";

export const setAllCategories = payload => ({
  type: GET_ALL_CATEGORIES,
  payload
});
