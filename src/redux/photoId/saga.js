import {
  GET_PHOTOID,
  GET_BY_ID_PHOTOID,
  POST_PHOTOID,
  PUT_PHOTOID,
  DELETE_PHOTOID,
} from "../actions";

import {
  getPhotoIdSuccess,
  getPhotoIdError,
  getByIdPhotoIdSuccess,
  getByIdPhotoIdError,
  postPhotoIdSuccess,
  postPhotoIdError,
  putPhotoIdSuccess,
  putPhotoIdError,
  deletePhotoIdSuccess,
  deletePhotoIdError,
} from "./action";

import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import api from "@/auth/api";

function* getPhotoIds(action) {
  try {
    const res = yield call(() =>
      api.get(`/photoId`)
    );
    yield put(getPhotoIdSuccess(res.data));
  } catch (err) {
    yield put(getPhotoIdError(err.response));
  }
}

function* getPhotoIdById({ payload }) {
  try {
    if (!payload) {
      return;
    }
    const res = yield call(() => api.get(`/photoId/${payload}`));
    yield put(getByIdPhotoIdSuccess(res.data));
  } catch (err) {
    yield put(getByIdPhotoIdError(err.response));
  }
}

function* postPhotoId({ payload }) {
  try {
    const res = yield call(() => api.post("/photoId", payload));
    yield put(postPhotoIdSuccess(res));
  } catch (err) {
    console.log(err);
    yield put(postPhotoIdError(err.response));
  }
}

function* putPhotoId({ payload }) {
  try {
    const res = yield call(() => api.put(`/photoId/${payload.id}`, payload.data));
    yield put(putPhotoIdSuccess(res));
  } catch (err) {
    yield put(putPhotoIdError(err.response));
  }
}

function* deletePhotoId({ payload }) {
  try {
    const res = yield call(() => api.delete(`/photoId/${payload.id}`));
    yield put(deletePhotoIdSuccess(res));
  } catch (err) {
    yield put(deletePhotoIdError(err.response));
  }
}

function* watchGetPhotoIds() {
  yield takeEvery(GET_PHOTOID, getPhotoIds);
}

function* watchGetByIdPhotoId() {
  yield takeEvery(GET_BY_ID_PHOTOID, getPhotoIdById);
}

function* watchPostPhotoId() {
  yield takeEvery(POST_PHOTOID, postPhotoId);
}

function* watchPutPhotoId() {
  yield takeEvery(PUT_PHOTOID, putPhotoId);
}

function* watchDeletePhotoId() {
  yield takeEvery(DELETE_PHOTOID, deletePhotoId);
}

export default function* roleSaga() {
  yield all([
    fork(watchGetPhotoIds),
    fork(watchGetByIdPhotoId),
    fork(watchPostPhotoId),
    fork(watchPutPhotoId),
    fork(watchDeletePhotoId),
  ]);
}
