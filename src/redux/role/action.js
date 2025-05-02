import {
  DELETE_ROLE,
  DELETE_ROLE_ERROR,
  DELETE_ROLE_SUCCESS,
  GET_BY_ID_ROLE,
  GET_BY_ID_ROLE_ERROR,
  GET_BY_ID_ROLE_SUCCESS,
  GET_ROLE,
  GET_ROLE_ERROR,
  GET_ROLE_SUCCESS,
  POST_ROLE,
  POST_ROLE_ERROR,
  POST_ROLE_SUCCESS,
  PUT_ROLE,
  PUT_ROLE_ERROR,
  PUT_ROLE_SUCCESS,
} from "../actions";

export const getRoleAction = (info) => ({
  type: GET_ROLE,
  payload: info,
});
export const getRoleSuccess = (info) => ({
  type: GET_ROLE_SUCCESS,
  payload: info,
});
export const getRoleError = (error) => ({
  type: GET_ROLE_ERROR,
  payload: error,
});

export const postRoleAction = (info) => ({
  type: POST_ROLE,
  payload: info,
});
export const postRoleSuccess = (info) => ({
  type: POST_ROLE_SUCCESS,
  payload: info,
});
export const postRoleError = (error) => ({
  type: POST_ROLE_ERROR,
  payload: error,
});

export const getByIdRoleAction = (info) => ({
  type: GET_BY_ID_ROLE,
  payload: info,
});
export const getByIdRoleSuccess = (info) => ({
  type: GET_BY_ID_ROLE_SUCCESS,
  payload: info,
});
export const getByIdRoleError = (error) => ({
  type: GET_BY_ID_ROLE_ERROR,
  payload: error,
});

export const putRoleAction = (info) => ({
  type: PUT_ROLE,
  payload: info,
});
export const putRoleSuccess = (info) => ({
  type: PUT_ROLE_SUCCESS,
  payload: info,
});
export const putRoleError = (error) => ({
  type: PUT_ROLE_ERROR,
  payload: error,
});

export const deleteRoleAction = (info) => ({
  type: DELETE_ROLE,
  payload: info,
});
export const deleteRoleSuccess = (info) => ({
  type: DELETE_ROLE_SUCCESS,
  payload: info,
});
export const deleteRoleError = (error) => ({
  type: DELETE_ROLE_ERROR,
  payload: error,
});
