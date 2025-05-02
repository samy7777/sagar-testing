import {
  BLOCKED_EMPLOYEE,
  BLOCKED_EMPLOYEE_ERROR,
  BLOCKED_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE,
  DELETE_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_SUCCESS,
  GET_BY_ID_EMPLOYEE,
  GET_BY_ID_EMPLOYEE_ERROR,
  GET_BY_ID_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE,
  GET_EMPLOYEE_ERROR,
  GET_EMPLOYEE_SUCCESS,
  POST_EMPLOYEE,
  POST_EMPLOYEE_ERROR,
  POST_EMPLOYEE_SUCCESS,
  PUT_EMPLOYEE,
  PUT_EMPLOYEE_ERROR,
  PUT_EMPLOYEE_SUCCESS,
} from "../actions";

const INIT_STATE = {
  getEmployee: [],
  getEmployeeLoading: false,
  getEmployeeError: "",
  getByIdEmployee: {},
  getByIdEmployeeLoading: false,
  getByIdEmployeeError: "",
  postEmployee: {},
  postEmployeeLoading: false,
  postEmployeeError: "false",
  putEmployee: {},
  putEmployeeLoading: false,
  putEmployeeError: "false",
  deleteEmployee: {},
  deleteEmployeeLoading: false,
  deleteEmployeeError: "",
  blockedEmployee: {},
  blockedEmployeeLoading: false,
  blockedEmployeeError: "",
};

const EmployeeSection = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEE:
      return {
        ...state,
        getEmployee: [],
        getEmployeeLoading: true,
      };
    case GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        getEmployee: action.payload,
        getEmployeeLoading: false,
        getEmployeeError: "",
      };

    case GET_EMPLOYEE_ERROR:
      return {
        ...state,
        getEmployeeLoading: false,
        getEmployeeError: action.payload.message,
      };
    case GET_BY_ID_EMPLOYEE:
      return {
        ...state,
        getByIdEmployee: {},
        getByIdEmployeeLoading: true,
      };
    case GET_BY_ID_EMPLOYEE_SUCCESS:
      return {
        ...state,
        getByIdEmployee: action.payload,
        getByIdEmployeeLoading: false,
        getByIdEmployeeError: "",
      };

    case GET_BY_ID_EMPLOYEE_ERROR:
      return {
        ...state,
        getByIdEmployeeLoading: false,
        getByIdEmployeeError: action.payload.message,
      };
    case POST_EMPLOYEE:
      return {
        ...state,
        postEmployee: {},
        postEmployeeLoading: true,
      };
    case POST_EMPLOYEE_SUCCESS:
      return {
        ...state,
        postEmployee: action.payload,
        postEmployeeLoading: false,
        postEmployeeError: "",
      };

    case POST_EMPLOYEE_ERROR:
      return {
        ...state,
        postEmployeeLoading: false,
        postEmployeeError: action.payload,
      };
    case PUT_EMPLOYEE:
      return {
        ...state,
        putEmployee: {},
        putEmployeeLoading: true,
      };
    case PUT_EMPLOYEE_SUCCESS:
      return {
        ...state,
        putEmployee: action.payload,
        getByIdEmployee: {},
        putEmployeeLoading: false,
        putEmployeeError: "",
      };

    case PUT_EMPLOYEE_ERROR:
      return {
        ...state,
        putEmployeeLoading: false,
        putEmployeeError: action.payload,
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        deleteEmployee: {},
        deleteEmployeeLoading: true,
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        deleteEmployee: action.payload,
        deleteEmployeeLoading: false,
        deleteEmployeeError: "",
      };

    case DELETE_EMPLOYEE_ERROR:
      return {
        ...state,
        deleteEmployeeLoading: false,
        deleteEmployeeError: action.payload.message,
      };
    case BLOCKED_EMPLOYEE:
      return {
        ...state,
        blockedEmployee: {},
        blockedEmployeeLoading: true,
      };
    case BLOCKED_EMPLOYEE_SUCCESS:
      return {
        ...state,
        blockedEmployee: action.payload,
        blockedEmployeeLoading: false,
        blockedEmployeeError: "",
      };

    case BLOCKED_EMPLOYEE_ERROR:
      return {
        ...state,
        blockedEmployeeLoading: false,
        blockedEmployeeError: action.payload.message,
      };
    default:
      return { ...state };
  }
};
export default EmployeeSection;
