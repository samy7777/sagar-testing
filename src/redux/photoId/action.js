import {
  DELETE_PHOTOID,
  DELETE_PHOTOID_ERROR,
  DELETE_PHOTOID_SUCCESS,
  GET_BY_ID_PHOTOID,
  GET_BY_ID_PHOTOID_ERROR,
  GET_BY_ID_PHOTOID_SUCCESS,
  GET_PHOTOID,
  GET_PHOTOID_ERROR,
  GET_PHOTOID_SUCCESS,
  POST_PHOTOID,
  POST_PHOTOID_ERROR,
  POST_PHOTOID_SUCCESS,
  PUT_PHOTOID,
  PUT_PHOTOID_ERROR,
  PUT_PHOTOID_SUCCESS,
} from "../actions";

export const getPhotoIdAction = (info) => ({
  type: GET_PHOTOID,
  payload: info,
});
export const getPhotoIdSuccess = (info) => ({
  type: GET_PHOTOID_SUCCESS,
  payload: info,
});
export const getPhotoIdError = (error) => ({
  type: GET_PHOTOID_ERROR,
  payload: error,
});

export const postPhotoIdAction = (info) => ({
  type: POST_PHOTOID,
  payload: info,
});
export const postPhotoIdSuccess = (info) => ({
  type: POST_PHOTOID_SUCCESS,
  payload: info,
});
export const postPhotoIdError = (error) => ({
  type: POST_PHOTOID_ERROR,
  payload: error,
});

export const getByIdPhotoIdAction = (info) => ({
  type: GET_BY_ID_PHOTOID,
  payload: info,
});
export const getByIdPhotoIdSuccess = (info) => ({
  type: GET_BY_ID_PHOTOID_SUCCESS,
  payload: info,
});
export const getByIdPhotoIdError = (error) => ({
  type: GET_BY_ID_PHOTOID_ERROR,
  payload: error,
});

export const putPhotoIdAction = (info) => ({
  type: PUT_PHOTOID,
  payload: info,
});
export const putPhotoIdSuccess = (info) => ({
  type: PUT_PHOTOID_SUCCESS,
  payload: info,
});
export const putPhotoIdError = (error) => ({
  type: PUT_PHOTOID_ERROR,
  payload: error,
});

export const deletePhotoIdAction = (info) => ({
  type: DELETE_PHOTOID,
  payload: info,
});
export const deletePhotoIdSuccess = (info) => ({
  type: DELETE_PHOTOID_SUCCESS,
  payload: info,
});
export const deletePhotoIdError = (error) => ({
  type: DELETE_PHOTOID_ERROR,
  payload: error,
});
