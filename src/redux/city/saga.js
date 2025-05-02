import {
  GET_CITY,
  GET_BY_ID_CITY,
  POST_CITY,
  PUT_CITY,
  DELETE_CITY,
} from "../actions";

import {
  getCitySuccess,
  getCityError,
  getByIdCitySuccess,
  getByIdCityError,
  postCitySuccess,
  postCityError,
  putCitySuccess,
  putCityError,
  deleteCitySuccess,
  deleteCityError,
} from "./action";

import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import api from "@/auth/api";

const handleError = (error) =>
  error?.response?.data?.error || error?.message || "Something went wrong";

function* getCitys(action) {
  try {
    const { page = 1, limit = 10, search = "" } = action.payload || {};
    const res = yield call(() =>
      api.get(`/city?page=${page}&limit=${limit}&search=${search}`)
    );
    yield put(getCitySuccess(res));
  } catch (err) {
    yield put(getCityError(err.response));
  }
}

function* getCityById({ payload }) {
  try {
    if (!payload) {
      return;
    }
    const res = yield call(() => api.get(`/city/${payload}`));
    yield put(getByIdCitySuccess(res.data));
  } catch (err) {
    yield put(getByIdCityError(err.response));
  }
}

function* postCity({ payload }) {
  try {
    const res = yield call(() => api.post("/city", payload));
    yield put(postCitySuccess(res));
  } catch (err) {
    console.log(err);
    yield put(postCityError(err.response));
  }
}

function* putCity({ payload }) {
  try {
    const res = yield call(() => api.put(`/city/${payload.id}`, payload.data));
    yield put(putCitySuccess(res));
  } catch (err) {
    yield put(putCityError(err.response));
  }
}

function* deleteCity({ payload }) {
  try {
    const res = yield call(() => api.delete(`/city/${payload.id}`));
    yield put(deleteCitySuccess(res));
  } catch (err) {
    yield put(deleteCityError(err.response));
  }
}

function* watchGetCitys() {
  yield takeEvery(GET_CITY, getCitys);
}

function* watchGetByIdCity() {
  yield takeEvery(GET_BY_ID_CITY, getCityById);
}

function* watchPostCity() {
  yield takeEvery(POST_CITY, postCity);
}

function* watchPutCity() {
  yield takeEvery(PUT_CITY, putCity);
}

function* watchDeleteCity() {
  yield takeEvery(DELETE_CITY, deleteCity);
}

export default function* roleSaga() {
  yield all([
    fork(watchGetCitys),
    fork(watchGetByIdCity),
    fork(watchPostCity),
    fork(watchPutCity),
    fork(watchDeleteCity),
  ]);
}
