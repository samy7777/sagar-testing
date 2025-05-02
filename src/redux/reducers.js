import { combineReducers } from "redux";
import Authsection from "./auth/reducer";
import EmployeeSection from "./employee/reducer";
import RoleSection from "./role/reducer";
import TerminateSection from "./terminate/reducer";
import UserSection from "./user/reducer";
import PhotoIdSection from "./photoId/reducer";
import LoanTypeSection from "./loanType/reducer";
import StateSection from "./state/reducer";
import CitySection from "./city/reducer";
import RegionSection from "./region/reducer";
import LoanSection from "./loan/reducer";


const reducers = combineReducers({

  Authsection,
  EmployeeSection,
  RoleSection,
  TerminateSection,
  UserSection,
  PhotoIdSection,
  LoanTypeSection,
  StateSection,
  CitySection,
  RegionSection,
  LoanSection,
  
});

export default reducers;
