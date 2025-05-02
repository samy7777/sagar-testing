import {
 
  GET_USER,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  GET_USER_BY_ID,
  GET_USER_BY_ID_ERROR,
  GET_USER_BY_ID_SUCCESS,
  POST_USER,
  POST_USER_ERROR,
  POST_USER_SUCCESS,
  PUT_USER,
  PUT_USER_ERROR,
  PUT_USER_SUCCESS,
} from "../actions";

export const getUserAction = (info) => ({
  type: GET_USER,
  payload: info,
});
export const getUserSuccess = (info) => ({
  type: GET_USER_SUCCESS,
  payload: info,
});
export const getUserError = (error) => ({
  type: GET_USER_ERROR,
  payload: error,
});
export const getUserByIdAction = (info) => ({
  type: GET_USER_BY_ID,
  payload: info,
});
export const getUserByIdSuccess = (info) => ({
  type: GET_USER_BY_ID_SUCCESS,
  payload: info,
});
export const getUserByIdError = (error) => ({
  type: GET_USER_BY_ID_ERROR,
  payload: error,
});

export const postUserAction = (info) => ({
  type: POST_USER,
  payload: info,
});
export const postUserSuccess = (info) => ({
  type: POST_USER_SUCCESS,
  payload: info,
});
export const postUserError = (error) => ({
  type: POST_USER_ERROR,
  payload: error,
});

export const putUserAction = (info) => ({
  type: PUT_USER,
  payload: info,
});
export const putUserSuccess = (info) => ({
  type: PUT_USER_SUCCESS,
  payload: info,
});
export const putUserError = (error) => ({
  type: PUT_USER_ERROR,
  payload: error,
});
