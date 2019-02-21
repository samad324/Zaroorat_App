import { LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_ALL_USERS } from "../constants";

export const onLogin = payload => ({
  type: LOGIN_SUCCESS,
  payload
});

export const setAllUsers = payload => ({
  type: SET_ALL_USERS,
  payload
});

export const onLogout = () => ({
  type: LOGOUT_SUCCESS
});
