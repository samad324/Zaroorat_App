import { LOGIN_SUCCESS, LOGOUT_SUCCESS, UPDATE_USER } from "../constants";

export const onLogin = payload => ({
  type: LOGIN_SUCCESS,
  payload
});

export const updateUser = payload => ({
  type: UPDATE_USER,
  payload
});

export const onLogout = () => ({
  type: LOGOUT_SUCCESS
});
