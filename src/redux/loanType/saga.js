import {
  GET_LOAN_TYPE,
  GET_BY_ID_LOAN_TYPE,
  POST_LOAN_TYPE,
  PUT_LOAN_TYPE,
  DELETE_LOAN_TYPE,
} from "../actions";

import {
  getLoanTypeSuccess,
  getLoanTypeError,
  getByIdLoanTypeSuccess,
  getByIdLoanTypeError,
  postLoanTypeSuccess,
  postLoanTypeError,
  putLoanTypeSuccess,
  putLoanTypeError,
  deleteLoanTypeSuccess,
  deleteLoanTypeError,
} from "./action";

import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import api from "@/auth/api";

const handleError = (error) =>
  error?.response?.data?.error || error?.message || "Something went wrong";

function* getLoanTypes(action) {
  try {
    const { page = 1, limit = 10, search = "" } = action.payload || {};
    const res = yield call(() =>
      api.get(`/loanType?page=${page}&limit=${limit}&search=${search}`)
    );
    yield put(getLoanTypeSuccess(res));
  } catch (err) {
    yield put(getLoanTypeError(err.response));
  }
}

function* getLoanTypeById({ payload }) {
  try {
    if (!payload) {
      return;
    }
    const res = yield call(() => api.get(`/loanType/${payload}`));
    yield put(getByIdLoanTypeSuccess(res));
  } catch (err) {
    yield put(getByIdLoanTypeError(err.response));
  }
}

function* postLoanType({ payload }) {
  try {
    const res = yield call(() => api.post("/loanType", payload));
    yield put(postLoanTypeSuccess(res));
  } catch (err) {
    console.log(err);
    yield put(postLoanTypeError(err.response));
  }
}

function* putLoanType({ payload }) {
  try {
    const res = yield call(() => api.put(`/loanType/${payload.id}`, payload.data));
    yield put(putLoanTypeSuccess(res));
  } catch (err) {
    yield put(putLoanTypeError(err.response));
  }
}

function* deleteLoanType({ payload }) {
  try {
    const res = yield call(() => api.delete(`/loanType/${payload.id}`));
    yield put(deleteLoanTypeSuccess(res));
  } catch (err) {
    yield put(deleteLoanTypeError(err.response));
  }
}

function* watchGetLoanTypes() {
  yield takeEvery(GET_LOAN_TYPE, getLoanTypes);
}

function* watchGetByIdLoanType() {
  yield takeEvery(GET_BY_ID_LOAN_TYPE, getLoanTypeById);
}

function* watchPostLoanType() {
  yield takeEvery(POST_LOAN_TYPE, postLoanType);
}

function* watchPutLoanType() {
  yield takeEvery(PUT_LOAN_TYPE, putLoanType);
}

function* watchDeleteLoanType() {
  yield takeEvery(DELETE_LOAN_TYPE, deleteLoanType);
}

export default function* roleSaga() {
  yield all([
    fork(watchGetLoanTypes),
    fork(watchGetByIdLoanType),
    fork(watchPostLoanType),
    fork(watchPutLoanType),
    fork(watchDeleteLoanType),
  ]);
}
