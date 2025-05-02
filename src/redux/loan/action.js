import {
  GET_LOAN,
  GET_LOAN_ERROR,
  GET_LOAN_SUCCESS,
  GET_BY_ID_LOAN,
  GET_BY_ID_LOAN_ERROR,
  GET_BY_ID_LOAN_SUCCESS,
  GET_BY_USERID_LOAN,
  GET_BY_USERID_LOAN_ERROR,
  GET_BY_USERID_LOAN_SUCCESS,
  GET_PENDING_LOAN,
  GET_PENDING_LOAN_SUCCESS,
  GET_PENDING_LOAN_ERROR,
  POST_LOAN,
  POST_LOAN_ERROR,
  POST_LOAN_SUCCESS,
  POST_LOAN_PAYMENT,
  POST_LOAN_PAYMENT_SUCCESS,
  POST_LOAN_PAYMENT_ERROR,
  PUT_LOAN,
  PUT_LOAN_ERROR,
  PUT_LOAN_SUCCESS,
  PUT_CLOSE_LOAN,
  PUT_CLOSE_LOAN_SUCCESS,
  PUT_CLOSE_LOAN_ERROR,
  GET_LOAN_DOWNLOAD,
  GET_LOAN_DOWNLOAD_SUCCESS,
  GET_LOAN_DOWNLOAD_ERROR,
} from "../actions";

export const getLoanAction = (info) => ({
  type: GET_LOAN,
  payload: info,
});
export const getLoanSuccess = (info) => ({
  type: GET_LOAN_SUCCESS,
  payload: info,
});
export const getLoanError = (error) => ({
  type: GET_LOAN_ERROR,
  payload: error,
});

export const getLoanDownloadAction = (info) => ({
  type: GET_LOAN_DOWNLOAD,
  payload: info,
});
export const getLoanDownloadSuccess = (info) => ({
  type: GET_LOAN_DOWNLOAD_SUCCESS,
  payload: info,
});
export const getLoanDownloadError = (error) => ({
  type: GET_LOAN_DOWNLOAD_ERROR,
  payload: error,
});

export const getByIdLoanAction = (info) => ({
  type: GET_BY_ID_LOAN,
  payload: info,
});
export const getByIdLoanSuccess = (info) => ({
  type: GET_BY_ID_LOAN_SUCCESS,
  payload: info,
});
export const getByIdLoanError = (error) => ({
  type: GET_BY_ID_LOAN_ERROR,
  payload: error,
});

export const getByUserIdLoanAction = (info) => ({
  type: GET_BY_USERID_LOAN,
  payload: info,
});
export const getByUserIdLoanSuccess = (info) => ({
  type: GET_BY_USERID_LOAN_SUCCESS,
  payload: info,
});
export const getByUserIdLoanError = (error) => ({
  type: GET_BY_USERID_LOAN_ERROR,
  payload: error,
});

export const getPendingLoanAction = (info) => ({
  type: GET_PENDING_LOAN,
  payload: info,
});
export const getPendingLoanSuccess = (info) => ({
  type: GET_PENDING_LOAN_SUCCESS,
  payload: info,
});
export const getPendingLoanError = (error) => ({
  type: GET_PENDING_LOAN_ERROR,
  payload: error,
});

export const postLoanAction = (info) => ({
  type: POST_LOAN,
  payload: info,
});
export const postLoanSuccess = (info) => ({
  type: POST_LOAN_SUCCESS,
  payload: info,
});
export const postLoanError = (error) => ({
  type: POST_LOAN_ERROR,
  payload: error,
});

export const postLoanPaymentAction = (info) => ({
  type: POST_LOAN_PAYMENT,
  payload: info,
});
export const postLoanPaymentSuccess = (info) => ({
  type: POST_LOAN_PAYMENT_SUCCESS,
  payload: info,
});
export const postLoanPaymentError = (error) => ({
  type: POST_LOAN_PAYMENT_ERROR,
  payload: error,
});

export const putLoanAction = (info) => ({
  type: PUT_LOAN,
  payload: info,
});
export const putLoanSuccess = (info) => ({
  type: PUT_LOAN_SUCCESS,
  payload: info,
});
export const putLoanError = (error) => ({
  type: PUT_LOAN_ERROR,
  payload: error,
});

export const putCloseLoanAction = (info) => ({
  type: PUT_CLOSE_LOAN,
  payload: info,
});
export const putCloseLoanSuccess = (info) => ({
  type: PUT_CLOSE_LOAN_SUCCESS,
  payload: info,
});
export const putCloseLoanError = (error) => ({
  type: PUT_CLOSE_LOAN_ERROR,
  payload: error,
});
