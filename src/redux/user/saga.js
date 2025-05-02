import {
  GET_USER,
  GET_USER_BY_ID,
  POST_USER,
  PUT_USER,
} from "../actions";

import {
  getUserSuccess,
  getUserError,
  postUserSuccess,
  postUserError,
  getUserByIdSuccess,
  getUserByIdError,
  putUserSuccess,
  putUserError,
} from "./action";

import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import api from "@/auth/api";

// GET employees (paginated)
function* getUsers(action) {
  try {
    const {
      photoIdNumber,
      name,
      phone,
      email,
      isDefaulter,
      page = 1,
      limit = 10,
    } = action.payload || {};

    const params = new URLSearchParams();

    if (photoIdNumber) params.append("photoIdNumber", photoIdNumber);
    if (name) params.append("name", name);
    if (phone) params.append("phone", phone);
    if (email) params.append("email", email);
    if (isDefaulter !== undefined) params.append("isDefaulter", isDefaulter);
    params.append("page", page);
    params.append("limit", limit);

    const res = yield call(() => api.get(`/users?${params.toString()}`));
    yield put(getUserSuccess(res.data));
  } catch (err) {
    yield put(getUserError(err?.response));
  }
}

function* getUserById(action) {
  try {
    const res = yield call(() => api.get(`/users/${action.payload}`));
    yield put(getUserByIdSuccess(res.data));
  } catch (err) {
    yield put(getUserByIdError(err.response));
  }
}

// POST employee
function* postUser({ payload }) {
  try {
    const res = yield call(() => api.post("/users/", payload));
    yield put(postUserSuccess(res));
  } catch (err) {
    console.log(err);
    yield put(postUserError(err.response));
  }
}

function* putUserDetail({ payload }) {
  try {
    const res = yield call(() =>
      api.put(`/users/${payload.userId}`, payload.body)
    );
    yield put(putUserSuccess(res));
  } catch (err) {
    yield put(putUserError(err.response));
  }
}

// Watchers
function* watchGetUsers() {
  yield takeEvery(GET_USER, getUsers);
}
function* watchGetUsersById() {
  yield takeEvery(GET_USER_BY_ID, getUserById);
}

function* watchPostUser() {
  yield takeEvery(POST_USER, postUser);
}
function* watchPutUser() {
  yield takeEvery(PUT_USER, putUserDetail);
}

// Root saga
export default function* employeeSaga() {
  yield all([
    fork(watchGetUsers),
    fork(watchGetUsersById),
    fork(watchPostUser),
    fork(watchPutUser),
  ]);
}
