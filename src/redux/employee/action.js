import {
  BLOCKED_EMPLOYEE,
  BLOCKED_EMPLOYEE_ERROR,
  BLOCKED_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE,
  DELETE_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_SUCCESS,
  GET_BY_ID_EMPLOYEE,
  GET_BY_ID_EMPLOYEE_ERROR,
  GET_BY_ID_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE,
  GET_EMPLOYEE_ERROR,
  GET_EMPLOYEE_SUCCESS,
  POST_EMPLOYEE,
  POST_EMPLOYEE_ERROR,
  POST_EMPLOYEE_SUCCESS,
  PUT_EMPLOYEE,
  PUT_EMPLOYEE_ERROR,
  PUT_EMPLOYEE_SUCCESS,
} from "../actions";

export const getEmployeeAction = (info) => ({
  type: GET_EMPLOYEE,
  payload: info,
});
export const getEmployeeSuccess = (info) => ({
  type: GET_EMPLOYEE_SUCCESS,
  payload: info,
});
export const getEmployeeError = (error) => ({
  type: GET_EMPLOYEE_ERROR,
  payload: error,
});

export const postEmployeeAction = (info) => ({
  type: POST_EMPLOYEE,
  payload: info,
});
export const postEmployeeSuccess = (info) => ({
  type: POST_EMPLOYEE_SUCCESS,
  payload: info,
});
export const postEmployeeError = (error) => ({
  type: POST_EMPLOYEE_ERROR,
  payload: error,
});

export const getByIdEmployeeAction = (info) => ({
  type: GET_BY_ID_EMPLOYEE,
  payload: info,
});
export const getByIdEmployeeSuccess = (info) => ({
  type: GET_BY_ID_EMPLOYEE_SUCCESS,
  payload: info,
});
export const getByIdEmployeeError = (error) => ({
  type: GET_BY_ID_EMPLOYEE_ERROR,
  payload: error,
});

export const putEmployeeAction = (info) => ({
  type: PUT_EMPLOYEE,
  payload: info,
});
export const putEmployeeSuccess = (info) => ({
  type: PUT_EMPLOYEE_SUCCESS,
  payload: info,
});
export const putEmployeeError = (error) => ({
  type: PUT_EMPLOYEE_ERROR,
  payload: error,
});

export const deleteEmployeeAction = (info) => ({
  type: DELETE_EMPLOYEE,
  payload: info,
});
export const deleteEmployeeSuccess = (info) => ({
  type: DELETE_EMPLOYEE_SUCCESS,
  payload: info,
});
export const deleteEmployeeError = (error) => ({
  type: DELETE_EMPLOYEE_ERROR,
  payload: error,
});

export const blockedEmployeeAction = (info) => ({
  type: BLOCKED_EMPLOYEE,
  payload: info,
});
export const blockedEmployeeSuccess = (info) => ({
  type: BLOCKED_EMPLOYEE_SUCCESS,
  payload: info,
});
export const blockedEmployeeError = (error) => ({
  type: BLOCKED_EMPLOYEE_ERROR,
  payload: error,
});
