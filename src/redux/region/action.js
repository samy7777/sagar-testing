import {
  DELETE_REGION,
  DELETE_REGION_ERROR,
  DELETE_REGION_SUCCESS,
  GET_BY_ID_REGION,
  GET_BY_ID_REGION_ERROR,
  GET_BY_ID_REGION_SUCCESS,
  GET_REGION,
  GET_REGION_ERROR,
  GET_REGION_SUCCESS,
  POST_REGION,
  POST_REGION_ERROR,
  POST_REGION_SUCCESS,
  PUT_REGION,
  PUT_REGION_ERROR,
  PUT_REGION_SUCCESS,
} from "../actions";

export const getRegionAction = (info) => ({
  type: GET_REGION,
  payload: info,
});
export const getRegionSuccess = (info) => ({
  type: GET_REGION_SUCCESS,
  payload: info,
});
export const getRegionError = (error) => ({
  type: GET_REGION_ERROR,
  payload: error,
});

export const postRegionAction = (info) => ({
  type: POST_REGION,
  payload: info,
});
export const postRegionSuccess = (info) => ({
  type: POST_REGION_SUCCESS,
  payload: info,
});
export const postRegionError = (error) => ({
  type: POST_REGION_ERROR,
  payload: error,
});

export const getByIdRegionAction = (info) => ({
  type: GET_BY_ID_REGION,
  payload: info,
});
export const getByIdRegionSuccess = (info) => ({
  type: GET_BY_ID_REGION_SUCCESS,
  payload: info,
});
export const getByIdRegionError = (error) => ({
  type: GET_BY_ID_REGION_ERROR,
  payload: error,
});

export const putRegionAction = (info) => ({
  type: PUT_REGION,
  payload: info,
});
export const putRegionSuccess = (info) => ({
  type: PUT_REGION_SUCCESS,
  payload: info,
});
export const putRegionError = (error) => ({
  type: PUT_REGION_ERROR,
  payload: error,
});

export const deleteRegionAction = (info) => ({
  type: DELETE_REGION,
  payload: info,
});
export const deleteRegionSuccess = (info) => ({
  type: DELETE_REGION_SUCCESS,
  payload: info,
});
export const deleteRegionError = (error) => ({
  type: DELETE_REGION_ERROR,
  payload: error,
});
