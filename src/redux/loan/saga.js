import {
  GET_LOAN,
  GET_BY_ID_LOAN,
  GET_BY_USERID_LOAN,
  GET_PENDING_LOAN,
  POST_LOAN,
  POST_LOAN_PAYMENT,
  PUT_LOAN,
  PUT_CLOSE_LOAN,
  GET_LOAN_DOWNLOAD,
} from "../actions";

import {
  getLoanSuccess,
  getLoanError,
  getByIdLoanSuccess,
  getByIdLoanError,
  getByUserIdLoanSuccess,
  getByUserIdLoanError,
  getPendingLoanSuccess,
  getPendingLoanError,
  postLoanPaymentSuccess,
  postLoanPaymentError,
  putCloseLoanSuccess,
  putCloseLoanError,
  postLoanSuccess,
  postLoanError,
  putLoanSuccess,
  putLoanError,
  getLoanDownloadSuccess,
  getLoanDownloadError,
} from "./action";

import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import api from "@/auth/api";

function* getLoans(action) {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      stateId,
      cityId,
      regionId,
      isActive,
      isDefaulted,
    } = action.payload || {};

    const params = new URLSearchParams();

    params.append("page", page);
    params.append("limit", limit);
    if (search) params.append("search", search);
    if (stateId) params.append("stateId", stateId);
    if (cityId) params.append("cityId", cityId);
    if (regionId) params.append("regionId", regionId);
    if (isActive) params.append("isClosed", isActive);
    if (isDefaulted) params.append("isDefaulted", isDefaulted);

    const queryString = params.toString();

    const res = yield call(() => api.get(`/loan?${queryString}`));
    yield put(getLoanSuccess(res.data));
  } catch (err) {
    yield put(getLoanError(err.response));
  }
}

function* getLoansDownload(action) {
  try {
    const { stateId, cityId, regionId, isActive, isDefaulted } =
      action.payload || {};

    const params = new URLSearchParams();
    if (stateId) params.append("stateId", stateId);
    if (cityId) params.append("cityId", cityId);
    if (regionId) params.append("regionId", regionId);
    if (isActive) params.append("isClosed", isActive);
    if (isDefaulted) params.append("isDefaulted", isDefaulted);

    const queryString = params.toString();

    const res = yield call(() => api.get(`/loan/download?${queryString}`));
    yield put(getLoanDownloadSuccess(res));
  } catch (err) {
    yield put(getLoanDownloadError(err.response));
  }
}

function* getLoanById({ payload }) {
  try {
    if (!payload) {
      return;
    }
    const res = yield call(() => api.get(`/loan/${payload}`));
    yield put(getByIdLoanSuccess(res.data));
  } catch (err) {
    yield put(getByIdLoanError(err.response));
  }
}

function* getByUserIdLoan({ payload }) {
  try {
    if (!payload) {
      return;
    }
    const res = yield call(() => api.get(`/loan/user/${payload}`));
    yield put(getByUserIdLoanSuccess(res.data));
  } catch (err) {
    yield put(getByUserIdLoanError(err.response));
  }
}

function* getPendingLoan({ payload }) {
  try {
    if (!payload) {
      return;
    }
    const res = yield call(() => api.get(`/loan/pending/${payload}`));
    yield put(getPendingLoanSuccess(res.data));
  } catch (err) {
    yield put(getPendingLoanError(err.response));
  }
}

function* postLoanPayment({ payload }) {
  try {
    const res = yield call(() => api.post("/loan/payment", payload));
    yield put(postLoanPaymentSuccess(res));
  } catch (err) {
    console.log(err);
    yield put(postLoanPaymentError(err.response));
  }
}

function* putCloseLoan({ payload }) {
  try {
    const res = yield call(() =>
      api.put(`/loan/close/${payload.id}`, payload.data)
    );
    yield put(putCloseLoanSuccess(res));
  } catch (err) {
    yield put(putCloseLoanError(err.response));
  }
}

function* postLoan({ payload }) {
  try {
    const res = yield call(() => api.post("/loan", payload));
    yield put(postLoanSuccess(res));
  } catch (err) {
    console.log(err);
    yield put(postLoanError(err.response));
  }
}

function* putLoan({ payload }) {
  try {
    const res = yield call(() => api.put(`/loan/${payload.id}`, payload.data));
    yield put(putLoanSuccess(res));
  } catch (err) {
    yield put(putLoanError(err.response));
  }
}

function* watchGetLoans() {
  yield takeEvery(GET_LOAN, getLoans);
}

function* watchGetLoansDownload() {
  yield takeEvery(GET_LOAN_DOWNLOAD, getLoansDownload);
}

function* watchGetByIdLoan() {
  yield takeEvery(GET_BY_ID_LOAN, getLoanById);
}

function* watchGetByUserIdLoan() {
  yield takeEvery(GET_BY_USERID_LOAN, getByUserIdLoan);
}

function* watchGetPendingLoan() {
  yield takeEvery(GET_PENDING_LOAN, getPendingLoan);
}


function* watchPostLoanPayment() {
  yield takeEvery(POST_LOAN_PAYMENT, postLoanPayment);
}

function* watchPutCloseLoan() {
  yield takeEvery(PUT_CLOSE_LOAN, putCloseLoan);
}

function* watchPostLoan() {
  yield takeEvery(POST_LOAN, postLoan);
}

function* watchPutLoan() {
  yield takeEvery(PUT_LOAN, putLoan);
}

export default function* roleSaga() {
  yield all([
    fork(watchGetLoans),
    fork(watchGetLoansDownload),
    fork(watchGetByIdLoan),
    fork(watchGetByUserIdLoan),
    fork(watchGetPendingLoan),
    fork(watchPostLoanPayment),
    fork(watchPutCloseLoan),
    fork(watchPostLoan),
    fork(watchPutLoan),
  ]);
}
