import {
  GET_PERMISSION,
  GET_PERMISSION_ERROR,
  GET_PERMISSION_SUCCESS,
  POST_EMPLOYEE_LOGIN,
  POST_EMPLOYEE_LOGIN_ERROR,
  POST_EMPLOYEE_LOGIN_SUCCESS,
  POST_LOGIN,
  POST_LOGIN_ERROR,
  POST_LOGIN_SUCCESS,
} from "../actions";
const INIT_STATE = {
  postLogin: {},
  postLoginLoading: false,
  postLoginError: "",
  postEmployeeLogin: {},
  postEmployeeLoginLoading: false,
  postEmployeeLoginError: "",
  getPermission: [],
  getPermissionLoading: false,
  getPermissionError: "",
};

const Authsection = (state = INIT_STATE, action) => {
  switch (action.type) {
    case POST_LOGIN:
      return {
        ...state,
        postLogin: {},
        postLoginLoading: true,
      };
    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        postLogin: action.payload,
        postLoginLoading: false,
        postLoginError: "",
      };

    case POST_LOGIN_ERROR:
      return {
        ...state,
        postLoginLoading: false,
        postLoginError: action.payload.message,
      };
    case POST_EMPLOYEE_LOGIN:
      return {
        ...state,
        postEmployeeLogin: {},
        postEmployeeLoginLoading: true,
      };
    case POST_EMPLOYEE_LOGIN_SUCCESS:
      return {
        ...state,
        postEmployeeLogin: action.payload,
        postEmployeeLoginLoading: false,
        postEmployeeLoginError: "",
      };
    case POST_EMPLOYEE_LOGIN_ERROR:
      return {
        ...state,
        postEmployeeLoginLoading: false,
        postEmployeeLoginError: action.payload.message,
      };

    case GET_PERMISSION:
      return {
        ...state,
        getPermission: [],
        getPermissionLoading: true,
      };
    case GET_PERMISSION_SUCCESS:
      return {
        ...state,
        getPermission: action.payload,
        getPermissionLoading: false,
        getPermissionError: "",
      };
    case GET_PERMISSION_ERROR:
      return {
        ...state,
        getPermissionLoading: false,
        getPermissionError: action.payload.message,
      };

    default:
      return { ...state };
  }
};
export default Authsection;
