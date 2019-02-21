import { LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_ALL_USERS } from "../constants";
const initialState = {
  user: null,
  allUsers: []
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};
