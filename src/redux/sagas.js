import { all } from "redux-saga/effects";
import authSaga from "./auth/saga";
import EmployeeSaga from "./employee/saga";
import RoleSaga from "./role/saga";
import TerminateSaga from "./terminate/saga";
import UserSaga from "./user/saga";
import PhotoIdSaga from "./photoId/saga";
import LoanTypeSaga from "./loanType/saga";
import StateSaga from "./state/saga";
import CitySaga from "./city/saga";
import RegionSaga from "./region/saga";
import LoanSaga from "./loan/saga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    EmployeeSaga(),
    RoleSaga(),
    TerminateSaga(),
    UserSaga(),
    PhotoIdSaga(),
    LoanTypeSaga(),
    StateSaga(),
    CitySaga(),
    RegionSaga(),
    LoanSaga(),
  ]);
}
