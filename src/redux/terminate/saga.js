import { GET_TERMINATE, POST_TERMINATE } from "../actions";

import {
  getTerminateSuccess,
  getTerminateError,
  postTerminateSuccess,
  postTerminateError,
} from "./action";

import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import api from "@/auth/api";

function* getTerminates(action) {
  try {
    const { page = 1, limit = 10, search = "" } = action.payload || {};
    const res = yield call(() =>
      api.get(`/terminate?page=${page}&limit=${limit}&search=${search}`)
    );
    yield put(getTerminateSuccess(res.data));
  } catch (err) {
    yield put(getTerminateError(err.response));
  }
}

function* postTerminate({ payload }) {
  try {
    const res = yield call(() => api.post("/terminate", payload));
    yield put(postTerminateSuccess(res));
  } catch (err) {
    console.log(err);
    yield put(postTerminateError(err.response));
  }
}

function* watchGetTerminates() {
  yield takeEvery(GET_TERMINATE, getTerminates);
}

function* watchPostTerminate() {
  yield takeEvery(POST_TERMINATE, postTerminate);
}

export default function* roleSaga() {
  yield all([fork(watchGetTerminates), fork(watchPostTerminate)]);
}
