import { LOGIN, SIGNUP, SIGNOUT } from "../constants";

/**
|--------------------------------------------------
| 🔑 Auth Reducer with sweet 😗 initial state
|--------------------------------------------------
*/

const initialState = {
  user: null
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { ...state, user: payload.user };
    case SIGNUP:
      return { ...state, user: payload.user };
    case SIGNOUT:
      return { ...state };

    default:
      return state;
  }
};
