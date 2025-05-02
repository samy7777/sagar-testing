import {
    DELETE_ROLE,
    DELETE_ROLE_ERROR,
    DELETE_ROLE_SUCCESS,
    GET_BY_ID_ROLE,
    GET_BY_ID_ROLE_ERROR,
    GET_BY_ID_ROLE_SUCCESS,
    GET_ROLE,
    GET_ROLE_ERROR,
    GET_ROLE_SUCCESS,
    POST_ROLE,
    POST_ROLE_ERROR,
    POST_ROLE_SUCCESS,
    PUT_ROLE,
    PUT_ROLE_ERROR,
    PUT_ROLE_SUCCESS,
  } from "../actions";

const INIT_STATE = {
getRole: [],
getRoleLoading: false,
getRoleError: "",
getByIdRole: {},
getByIdRoleLoading: false,
getByIdRoleError: "",
postRole: {},
postRoleLoading: false,
postRoleError: "",
putRole: {},
putRoleLoading: false,
putRoleError: "",
deleteRole: {},
deleteRoleLoading: false,
deleteRoleError: "",
};

const RoleSection = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ROLE:
      return {
        ...state,
        getRole: {},
        getRoleLoading: true,
      };
    case GET_ROLE_SUCCESS:
      return {
        ...state,
        getRole: action.payload,
        getRoleLoading: false,
        getRoleError: "",
      };

    case GET_ROLE_ERROR:
      return {
        ...state,
        getRoleLoading: false,
        getRoleError: action.payload,
      };
    case GET_BY_ID_ROLE:
      return {
        ...state,
        getByIdRole: {},
        getByIdRoleLoading: true,
      };
    case GET_BY_ID_ROLE_SUCCESS:
      return {
        ...state,
        getByIdRole: action.payload,
        getByIdRoleLoading: false,
        getByIdRoleError: "",
      };

    case GET_BY_ID_ROLE_ERROR:
      return {
        ...state,
        getByIdRoleLoading: false,
        getByIdRoleError: action.payload,
      };
      case POST_ROLE:
        return {
          ...state,
          postRole: {},
          postRoleLoading: true,
        };
      case POST_ROLE_SUCCESS:
        return {
          ...state,
          postRole: action.payload,
          postRoleLoading: false,
          postRoleError: "",
        };
  
      case POST_ROLE_ERROR:
        return {
          ...state,
          postRoleLoading: false,
          postRoleError: action.payload,
        };
      case PUT_ROLE:
        return {
          ...state,
          putRole: {},
          putRoleLoading: true,
        };
      case PUT_ROLE_SUCCESS:
        return {
          ...state,
          putRole: action.payload,
          getByIdRole: {},
          putRoleLoading: false,
          putRoleError: "",
        };
  
      case PUT_ROLE_ERROR:
        return {
          ...state,
          putRoleLoading: false,
          putRoleError: action.payload,
        };
      case DELETE_ROLE:
        return {
          ...state,
          deleteRole: {},
          deleteRoleLoading: true,
        };
      case DELETE_ROLE_SUCCESS:
        return {
          ...state,
          deleteRole: action.payload,
          deleteRoleLoading: false,
          deleteRoleError: "",
        };
  
      case DELETE_ROLE_ERROR:
        return {
          ...state,
          deleteRoleLoading: false,
          deleteRoleError: action.payload,
        };
    default:
      return { ...state };
  }
};
export default RoleSection;
