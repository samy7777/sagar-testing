import {
  DELETE_STATE,
  DELETE_STATE_ERROR,
  DELETE_STATE_SUCCESS,
  GET_BY_ID_STATE,
  GET_BY_ID_STATE_ERROR,
  GET_BY_ID_STATE_SUCCESS,
  GET_STATE,
  GET_STATE_ERROR,
  GET_STATE_SUCCESS,
  POST_STATE,
  POST_STATE_ERROR,
  POST_STATE_SUCCESS,
  PUT_STATE,
  PUT_STATE_ERROR,
  PUT_STATE_SUCCESS,
} from "../actions";

export const getStateAction = (info) => ({
  type: GET_STATE,
  payload: info,
});
export const getStateSuccess = (info) => ({
  type: GET_STATE_SUCCESS,
  payload: info,
});
export const getStateError = (error) => ({
  type: GET_STATE_ERROR,
  payload: error,
});

export const postStateAction = (info) => ({
  type: POST_STATE,
  payload: info,
});
export const postStateSuccess = (info) => ({
  type: POST_STATE_SUCCESS,
  payload: info,
});
export const postStateError = (error) => ({
  type: POST_STATE_ERROR,
  payload: error,
});

export const getByIdStateAction = (info) => ({
  type: GET_BY_ID_STATE,
  payload: info,
});
export const getByIdStateSuccess = (info) => ({
  type: GET_BY_ID_STATE_SUCCESS,
  payload: info,
});
export const getByIdStateError = (error) => ({
  type: GET_BY_ID_STATE_ERROR,
  payload: error,
});

export const putStateAction = (info) => ({
  type: PUT_STATE,
  payload: info,
});
export const putStateSuccess = (info) => ({
  type: PUT_STATE_SUCCESS,
  payload: info,
});
export const putStateError = (error) => ({
  type: PUT_STATE_ERROR,
  payload: error,
});

export const deleteStateAction = (info) => ({
  type: DELETE_STATE,
  payload: info,
});
export const deleteStateSuccess = (info) => ({
  type: DELETE_STATE_SUCCESS,
  payload: info,
});
export const deleteStateError = (error) => ({
  type: DELETE_STATE_ERROR,
  payload: error,
});
