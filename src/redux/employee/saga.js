import {
  GET_EMPLOYEE,
  GET_BY_ID_EMPLOYEE,
  POST_EMPLOYEE,
  PUT_EMPLOYEE,
  DELETE_EMPLOYEE,
  BLOCKED_EMPLOYEE,
} from "../actions";

import {
  getEmployeeSuccess,
  getEmployeeError,
  getByIdEmployeeSuccess,
  getByIdEmployeeError,
  postEmployeeSuccess,
  postEmployeeError,
  putEmployeeSuccess,
  putEmployeeError,
  deleteEmployeeSuccess,
  deleteEmployeeError,
  blockedEmployeeSuccess,
  blockedEmployeeError,
} from "./action";

import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import api from "@/auth/api";

// GET employees (paginated)
function* getEmployees(action) {
  try {
    const { page = 1, limit = 10, search = "", isDeleted= false } = action.payload || {};
    const res = yield call(() =>
      api.get(`/admin/employees?page=${page}&limit=${limit}&search=${search}&isDeleted=${isDeleted}`)
    );
    yield put(getEmployeeSuccess(res.data));
  } catch (err) {
    yield put(getEmployeeError(err.response));
  }
}

// GET employee by ID
function* getEmployeeById({ payload }) {
  try {
    if (!payload) {
      return;
    }
    const res = yield call(() => api.get(`/admin/employees/${payload}`));
    yield put(getByIdEmployeeSuccess(res.data));
  } catch (err) {
    yield put(getByIdEmployeeError(err.response));
  }
}

// POST employee
function* postEmployee({ payload }) {
  try {
    const res = yield call(() => api.post("/employee/create", payload));
    yield put(postEmployeeSuccess(res));
  } catch (err) {
    console.log(err)
    yield put(postEmployeeError(err.response));
  }
}

// PUT employee
function* putEmployee({ payload }) {
  try {
    const res = yield call(() =>
      api.put(`/employee/${payload.id}`, payload.data)
    );
    yield put(putEmployeeSuccess(res));
  } catch (err) {
    yield put(putEmployeeError(err.response));
  }
}

// DELETE employee
function* deleteEmployee({ payload }) {
  try {
    const res = yield call(() => api.delete(`/employee/${payload.id}`));
    yield put(deleteEmployeeSuccess(res));
  } catch (err) {
    yield put(deleteEmployeeError(err.response));
  }
}
// Blocked employee
function* blockedEmployee({ payload }) {
  try {
    const res = yield call(() => api.put(`/employee/block/${payload.id}`, {isBlocked: !payload.isBlocked}));
    yield put(blockedEmployeeSuccess(res));
  } catch (err) {
    yield put(blockedEmployeeError(err.response));
  }
}

// Watchers
function* watchGetEmployees() {
  yield takeEvery(GET_EMPLOYEE, getEmployees);
}

function* watchGetByIdEmployee() {
  yield takeEvery(GET_BY_ID_EMPLOYEE, getEmployeeById);
}

function* watchPostEmployee() {
  yield takeEvery(POST_EMPLOYEE, postEmployee);
}

function* watchPutEmployee() {
  yield takeEvery(PUT_EMPLOYEE, putEmployee);
}

function* watchDeleteEmployee() {
  yield takeEvery(DELETE_EMPLOYEE, deleteEmployee);
}
function* watchBlockedEmployee() {
  yield takeEvery(BLOCKED_EMPLOYEE, blockedEmployee);
}

// Root saga
export default function* employeeSaga() {
  yield all([
    fork(watchGetEmployees),
    fork(watchGetByIdEmployee),
    fork(watchPostEmployee),
    fork(watchPutEmployee),
    fork(watchDeleteEmployee),
    fork(watchBlockedEmployee),
  ]);
}
