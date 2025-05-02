import {
  GET_REGION,
  GET_BY_ID_REGION,
  POST_REGION,
  PUT_REGION,
  DELETE_REGION,
} from "../actions";

import {
  getRegionSuccess,
  getRegionError,
  getByIdRegionSuccess,
  getByIdRegionError,
  postRegionSuccess,
  postRegionError,
  putRegionSuccess,
  putRegionError,
  deleteRegionSuccess,
  deleteRegionError,
} from "./action";

import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import api from "@/auth/api";

const handleError = (error) =>
  error?.response?.data?.error || error?.message || "Something went wrong";

function* getRegions(action) {
  try {
    const { page = 1, limit = 10, search = "" } = action.payload || {};
    const res = yield call(() =>
      api.get(`/region?page=${page}&limit=${limit}&search=${search}`)
    );
    yield put(getRegionSuccess(res.data));
  } catch (err) {
    yield put(getRegionError(err.response));
  }
}

function* getRegionById({ payload }) {
  try {
    if (!payload) {
      return;
    }
    const res = yield call(() => api.get(`/region/${payload}`));
    yield put(getByIdRegionSuccess(res.data));
  } catch (err) {
    yield put(getByIdRegionError(err.response));
  }
}

function* postRegion({ payload }) {
  try {
    const res = yield call(() => api.post("/region", payload));
    yield put(postRegionSuccess(res));
  } catch (err) {
    console.log(err);
    yield put(postRegionError(err.response));
  }
}

function* putRegion({ payload }) {
  try {
    const res = yield call(() => api.put(`/region/${payload.id}`, payload.data));
    yield put(putRegionSuccess(res));
  } catch (err) {
    yield put(putRegionError(err.response));
  }
}

function* deleteRegion({ payload }) {
  try {
    const res = yield call(() => api.delete(`/region/${payload.id}`));
    yield put(deleteRegionSuccess(res));
  } catch (err) {
    yield put(deleteRegionError(err.response));
  }
}

function* watchGetRegions() {
  yield takeEvery(GET_REGION, getRegions);
}

function* watchGetByIdRegion() {
  yield takeEvery(GET_BY_ID_REGION, getRegionById);
}

function* watchPostRegion() {
  yield takeEvery(POST_REGION, postRegion);
}

function* watchPutRegion() {
  yield takeEvery(PUT_REGION, putRegion);
}

function* watchDeleteRegion() {
  yield takeEvery(DELETE_REGION, deleteRegion);
}

export default function* roleSaga() {
  yield all([
    fork(watchGetRegions),
    fork(watchGetByIdRegion),
    fork(watchPostRegion),
    fork(watchPutRegion),
    fork(watchDeleteRegion),
  ]);
}
