import {
  GET_STATE,
  GET_BY_ID_STATE,
  POST_STATE,
  PUT_STATE,
  DELETE_STATE,
} from "../actions";

import {
  getStateSuccess,
  getStateError,
  getByIdStateSuccess,
  getByIdStateError,
  postStateSuccess,
  postStateError,
  putStateSuccess,
  putStateError,
  deleteStateSuccess,
  deleteStateError,
} from "./action";

import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import api from "@/auth/api";


function* getStates(action) {
  try {
    const res = yield call(() =>
      api.get(`/state`)
    );
    yield put(getStateSuccess(res));
  } catch (err) {
    yield put(getStateError(err.response));
  }
}

function* getStateById({ payload }) {
  try {
    if (!payload) {
      return;
    }
    const res = yield call(() => api.get(`/state/${payload}`));
    yield put(getByIdStateSuccess(res.data));
  } catch (err) {
    yield put(getByIdStateError(err.response));
  }
}

function* postState({ payload }) {
  try {
    const res = yield call(() => api.post("/state", payload));
    yield put(postStateSuccess(res));
  } catch (err) {
    console.log(err);
    yield put(postStateError(err.response));
  }
}

function* putState({ payload }) {
  try {
    const res = yield call(() => api.put(`/state/${payload.id}`, payload.data));
    yield put(putStateSuccess(res));
  } catch (err) {
    yield put(putStateError(err.response));
  }
}

function* deleteState({ payload }) {
  try {
    const res = yield call(() => api.delete(`/state/${payload.id}`));
    yield put(deleteStateSuccess(res));
  } catch (err) {
    yield put(deleteStateError(err.response));
  }
}

function* watchGetStates() {
  yield takeEvery(GET_STATE, getStates);
}

function* watchGetByIdState() {
  yield takeEvery(GET_BY_ID_STATE, getStateById);
}

function* watchPostState() {
  yield takeEvery(POST_STATE, postState);
}

function* watchPutState() {
  yield takeEvery(PUT_STATE, putState);
}

function* watchDeleteState() {
  yield takeEvery(DELETE_STATE, deleteState);
}

export default function* roleSaga() {
  yield all([
    fork(watchGetStates),
    fork(watchGetByIdState),
    fork(watchPostState),
    fork(watchPutState),
    fork(watchDeleteState),
  ]);
}
