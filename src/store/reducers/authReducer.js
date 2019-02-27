import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../constants";
const initialState = {
  user: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload
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
