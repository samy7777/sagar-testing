import {
  DELETE_LOAN_TYPE,
  DELETE_LOAN_TYPE_ERROR,
  DELETE_LOAN_TYPE_SUCCESS,
  GET_BY_ID_LOAN_TYPE,
  GET_BY_ID_LOAN_TYPE_ERROR,
  GET_BY_ID_LOAN_TYPE_SUCCESS,
  GET_LOAN_TYPE,
  GET_LOAN_TYPE_ERROR,
  GET_LOAN_TYPE_SUCCESS,
  POST_LOAN_TYPE,
  POST_LOAN_TYPE_ERROR,
  POST_LOAN_TYPE_SUCCESS,
  PUT_LOAN_TYPE,
  PUT_LOAN_TYPE_ERROR,
  PUT_LOAN_TYPE_SUCCESS,
} from "../actions";

export const getLoanTypeAction = (info) => ({
  type: GET_LOAN_TYPE,
  payload: info,
});
export const getLoanTypeSuccess = (info) => ({
  type: GET_LOAN_TYPE_SUCCESS,
  payload: info,
});
export const getLoanTypeError = (error) => ({
  type: GET_LOAN_TYPE_ERROR,
  payload: error,
});

export const postLoanTypeAction = (info) => ({
  type: POST_LOAN_TYPE,
  payload: info,
});
export const postLoanTypeSuccess = (info) => ({
  type: POST_LOAN_TYPE_SUCCESS,
  payload: info,
});
export const postLoanTypeError = (error) => ({
  type: POST_LOAN_TYPE_ERROR,
  payload: error,
});

export const getByIdLoanTypeAction = (info) => ({
  type: GET_BY_ID_LOAN_TYPE,
  payload: info,
});
export const getByIdLoanTypeSuccess = (info) => ({
  type: GET_BY_ID_LOAN_TYPE_SUCCESS,
  payload: info,
});
export const getByIdLoanTypeError = (error) => ({
  type: GET_BY_ID_LOAN_TYPE_ERROR,
  payload: error,
});

export const putLoanTypeAction = (info) => ({
  type: PUT_LOAN_TYPE,
  payload: info,
});
export const putLoanTypeSuccess = (info) => ({
  type: PUT_LOAN_TYPE_SUCCESS,
  payload: info,
});
export const putLoanTypeError = (error) => ({
  type: PUT_LOAN_TYPE_ERROR,
  payload: error,
});

export const deleteLoanTypeAction = (info) => ({
  type: DELETE_LOAN_TYPE,
  payload: info,
});
export const deleteLoanTypeSuccess = (info) => ({
  type: DELETE_LOAN_TYPE_SUCCESS,
  payload: info,
});
export const deleteLoanTypeError = (error) => ({
  type: DELETE_LOAN_TYPE_ERROR,
  payload: error,
});
