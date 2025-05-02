import {
  GET_TERMINATE,
  GET_TERMINATE_ERROR,
  GET_TERMINATE_SUCCESS,
  POST_TERMINATE,
  POST_TERMINATE_ERROR,
  POST_TERMINATE_SUCCESS,
} from "../actions";

export const getTerminateAction = (info) => ({
  type: GET_TERMINATE,
  payload: info,
});
export const getTerminateSuccess = (info) => ({
  type: GET_TERMINATE_SUCCESS,
  payload: info,
});
export const getTerminateError = (error) => ({
  type: GET_TERMINATE_ERROR,
  payload: error,
});

export const postTerminateAction = (info) => ({
  type: POST_TERMINATE,
  payload: info,
});
export const postTerminateSuccess = (info) => ({
  type: POST_TERMINATE_SUCCESS,
  payload: info,
});
export const postTerminateError = (error) => ({
  type: POST_TERMINATE_ERROR,
  payload: error,
});

