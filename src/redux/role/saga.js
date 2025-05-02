import {
  GET_ROLE,
  GET_BY_ID_ROLE,
  POST_ROLE,
  PUT_ROLE,
  DELETE_ROLE,
} from "../actions";

import {
  getRoleSuccess,
  getRoleError,
  getByIdRoleSuccess,
  getByIdRoleError,
  postRoleSuccess,
  postRoleError,
  putRoleSuccess,
  putRoleError,
  deleteRoleSuccess,
  deleteRoleError,
} from "./action";

import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import api from "@/auth/api";

const handleError = (error) =>
  error?.response?.data?.error || error?.message || "Something went wrong";

function* getRoles(action) {
  try {
    const { page = 1, limit = 10, search = "" } = action.payload || {};
    const res = yield call(() =>
      api.get(`/roles?page=${page}&limit=${limit}&search=${search}`)
    );
    yield put(getRoleSuccess(res.data));
  } catch (err) {
    yield put(getRoleError(err.response));
  }
}

function* getRoleById({ payload }) {
  try {
    if (!payload) {
      return;
    }
    const res = yield call(() => api.get(`/roles/${payload}`));
    yield put(getByIdRoleSuccess(res.data));
  } catch (err) {
    yield put(getByIdRoleError(err.response));
  }
}

function* postRole({ payload }) {
  try {
    const res = yield call(() => api.post("/roles", payload));
    yield put(postRoleSuccess(res));
  } catch (err) {
    console.log(err);
    yield put(postRoleError(err.response));
  }
}

function* putRole({ payload }) {
  try {
    const res = yield call(() => api.put(`/roles/${payload.id}`, payload.data));
    yield put(putRoleSuccess(res));
  } catch (err) {
    yield put(putRoleError(err.response));
  }
}

function* deleteRole({ payload }) {
  try {
    const res = yield call(() => api.delete(`/roles/${payload.id}`));
    yield put(deleteRoleSuccess(res));
  } catch (err) {
    yield put(deleteRoleError(err.response));
  }
}

function* watchGetRoles() {
  yield takeEvery(GET_ROLE, getRoles);
}

function* watchGetByIdRole() {
  yield takeEvery(GET_BY_ID_ROLE, getRoleById);
}

function* watchPostRole() {
  yield takeEvery(POST_ROLE, postRole);
}

function* watchPutRole() {
  yield takeEvery(PUT_ROLE, putRole);
}

function* watchDeleteRole() {
  yield takeEvery(DELETE_ROLE, deleteRole);
}

export default function* roleSaga() {
  yield all([
    fork(watchGetRoles),
    fork(watchGetByIdRole),
    fork(watchPostRole),
    fork(watchPutRole),
    fork(watchDeleteRole),
  ]);
}
