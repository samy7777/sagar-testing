import {
    DELETE_STATE,
    DELETE_STATE_ERROR,
    DELETE_STATE_SUCCESS,
    GET_BY_ID_STATE,
    GET_BY_ID_STATE_ERROR,
    GET_BY_ID_STATE_SUCCESS,
    GET_STATE,
    GET_STATE_ERROR,
    GET_STATE_SUCCESS,
    POST_STATE,
    POST_STATE_ERROR,
    POST_STATE_SUCCESS,
    PUT_STATE,
    PUT_STATE_ERROR,
    PUT_STATE_SUCCESS,
  } from "../actions";

const INIT_STATE = {
getState: [],
getStateLoading: false,
getStateError: "",
getByIdState: {},
getByIdStateLoading: false,
getByIdStateError: "",
postState: {},
postStateLoading: false,
postStateError: "",
putState: {},
putStateLoading: false,
putStateError: "",
deleteState: {},
deleteStateLoading: false,
deleteStateError: "",
};

const StateSection = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_STATE:
      return {
        ...state,
        getState: {},
        getStateLoading: true,
      };
    case GET_STATE_SUCCESS:
      return {
        ...state,
        getState: action.payload,
        getStateLoading: false,
        getStateError: "",
      };

    case GET_STATE_ERROR:
      return {
        ...state,
        getStateLoading: false,
        getStateError: action.payload,
      };
    case GET_BY_ID_STATE:
      return {
        ...state,
        getByIdState: {},
        getByIdStateLoading: true,
      };
    case GET_BY_ID_STATE_SUCCESS:
      return {
        ...state,
        getByIdState: action.payload,
        getByIdStateLoading: false,
        getByIdStateError: "",
      };

    case GET_BY_ID_STATE_ERROR:
      return {
        ...state,
        getByIdStateLoading: false,
        getByIdStateError: action.payload,
      };
      case POST_STATE:
        return {
          ...state,
          postState: {},
          postStateLoading: true,
        };
      case POST_STATE_SUCCESS:
        return {
          ...state,
          postState: action.payload,
          postStateLoading: false,
          postStateError: "",
        };
  
      case POST_STATE_ERROR:
        return {
          ...state,
          postStateLoading: false,
          postStateError: action.payload,
        };
      case PUT_STATE:
        return {
          ...state,
          putState: {},
          putStateLoading: true,
        };
      case PUT_STATE_SUCCESS:
        return {
          ...state,
          putState: action.payload,
          getByIdState: {},
          putStateLoading: false,
          putStateError: "",
        };
  
      case PUT_STATE_ERROR:
        return {
          ...state,
          putStateLoading: false,
          putStateError: action.payload,
        };
      case DELETE_STATE:
        return {
          ...state,
          deleteState: {},
          deleteStateLoading: true,
        };
      case DELETE_STATE_SUCCESS:
        return {
          ...state,
          deleteState: action.payload,
          deleteStateLoading: false,
          deleteStateError: "",
        };
  
      case DELETE_STATE_ERROR:
        return {
          ...state,
          deleteStateLoading: false,
          deleteStateError: action.payload,
        };
    default:
      return { ...state };
  }
};
export default StateSection;
