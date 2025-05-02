import { GET_PERMISSION, GET_PERMISSION_ERROR, GET_PERMISSION_SUCCESS, POST_EMPLOYEE_LOGIN, POST_EMPLOYEE_LOGIN_ERROR, POST_EMPLOYEE_LOGIN_SUCCESS, POST_LOGIN, POST_LOGIN_ERROR, POST_LOGIN_SUCCESS } from "../actions";

export const postLoginAction = (info) => ({
  type: POST_LOGIN,
  payload: info,
});
export const postLoginSuccess = (info) => ({
  type: POST_LOGIN_SUCCESS,
  payload: info,
});
export const postLoginError = (error) => ({
  type: POST_LOGIN_ERROR,
  payload: error,
});

export const postEmployeeLoginAction = (info) => ({
  type: POST_EMPLOYEE_LOGIN,
  payload: info,
});
export const postEmployeeLoginSuccess = (info) => ({
  type: POST_EMPLOYEE_LOGIN_SUCCESS,
  payload: info,
});
export const postEmployeeLoginError = (error) => ({
  type: POST_EMPLOYEE_LOGIN_ERROR,
  payload: error,
});

export const getPermissionAction = (info) => ({
  type: GET_PERMISSION,
  payload: info,
});
export const getPermissionSuccess = (info) => ({
  type: GET_PERMISSION_SUCCESS,
  payload: info,
});
export const getPermissionError = (error) => ({
  type: GET_PERMISSION_ERROR,
  payload: error,
});


