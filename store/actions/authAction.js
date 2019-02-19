import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../constants";

export const onLogin = payload => ({
  type: LOGIN_SUCCESS,
  payload
});

export const onLogout = () => ({
  type: LOGOUT_SUCCESS
});
