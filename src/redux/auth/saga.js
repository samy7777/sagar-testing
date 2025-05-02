import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {GET_PERMISSION, POST_EMPLOYEE_LOGIN, POST_LOGIN} from "../actions";
import { getPermissionError, getPermissionSuccess, postEmployeeLoginError, postEmployeeLoginSuccess, postLoginError, postLoginSuccess} from "./action";
import api from "@/auth/api";

const ApiLinks = "http://localhost:3001/api"

//login api 
function* postLoginCall(paylaod) {
  try {
    const getApiRes = yield call(postLoginAsync, paylaod);
    yield put(postLoginSuccess(getApiRes));
  } catch (error) {
    yield put(postLoginError(error));
  }
}
const postLoginAsync = (payload) =>
  
  fetch(`${ApiLinks}/admin/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload.payload),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);

export function* watchPostLoginData() {
  yield takeEvery(POST_LOGIN, postLoginCall);
}


//login api 
function* postEmployeeLoginCall(paylaod) {
  try {
    const getApiRes = yield call(postEmployeeLoginAsync, paylaod);
    yield put(postEmployeeLoginSuccess(getApiRes));
  } catch (error) {
    yield put(postEmployeeLoginError(error));
  }
}
const postEmployeeLoginAsync = (payload) =>
  
  fetch(`${ApiLinks}/employee/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload.payload),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);

export function* watchEmployeePostLoginData() {
  yield takeEvery(POST_EMPLOYEE_LOGIN, postEmployeeLoginCall);
}


function* getPermission(action) {
  try {
    const res = yield call(() =>
      api.get(`/employee/permission/${action.payload}`)
    );
    yield put(getPermissionSuccess(res.data));
  } catch (err) {
    yield put(getPermissionError(err.response));
  }
}

export function* watchGetPermission() {
  yield takeEvery(GET_PERMISSION, getPermission);
}




export default function* rootSaga() {
  yield all([
    fork(watchPostLoginData),
    fork(watchEmployeePostLoginData),
    fork(watchGetPermission),
  ]);
}