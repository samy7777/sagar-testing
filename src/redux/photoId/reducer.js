import {
    DELETE_PHOTOID,
    DELETE_PHOTOID_ERROR,
    DELETE_PHOTOID_SUCCESS,
    GET_BY_ID_PHOTOID,
    GET_BY_ID_PHOTOID_ERROR,
    GET_BY_ID_PHOTOID_SUCCESS,
    GET_PHOTOID,
    GET_PHOTOID_ERROR,
    GET_PHOTOID_SUCCESS,
    POST_PHOTOID,
    POST_PHOTOID_ERROR,
    POST_PHOTOID_SUCCESS,
    PUT_PHOTOID,
    PUT_PHOTOID_ERROR,
    PUT_PHOTOID_SUCCESS,
  } from "../actions";

const INIT_STATE = {
getPhotoId: [],
getPhotoIdLoading: false,
getPhotoIdError: "",
getByIdPhotoId: {},
getByIdPhotoIdLoading: false,
getByIdPhotoIdError: "",
postPhotoId: {},
postPhotoIdLoading: false,
postPhotoIdError: "",
putPhotoId: {},
putPhotoIdLoading: false,
putPhotoIdError: "",
deletePhotoId: {},
deletePhotoIdLoading: false,
deletePhotoIdError: "",
};

const PhotoIdSection = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PHOTOID:
      return {
        ...state,
        getPhotoId: {},
        getPhotoIdLoading: true,
      };
    case GET_PHOTOID_SUCCESS:
      return {
        ...state,
        getPhotoId: action.payload,
        getPhotoIdLoading: false,
        getPhotoIdError: "",
      };

    case GET_PHOTOID_ERROR:
      return {
        ...state,
        getPhotoIdLoading: false,
        getPhotoIdError: action.payload,
      };
    case GET_BY_ID_PHOTOID:
      return {
        ...state,
        getByIdPhotoId: {},
        getByIdPhotoIdLoading: true,
      };
    case GET_BY_ID_PHOTOID_SUCCESS:
      return {
        ...state,
        getByIdPhotoId: action.payload,
        getByIdPhotoIdLoading: false,
        getByIdPhotoIdError: "",
      };

    case GET_BY_ID_PHOTOID_ERROR:
      return {
        ...state,
        getByIdPhotoIdLoading: false,
        getByIdPhotoIdError: action.payload,
      };
      case POST_PHOTOID:
        return {
          ...state,
          postPhotoId: {},
          postPhotoIdLoading: true,
        };
      case POST_PHOTOID_SUCCESS:
        return {
          ...state,
          postPhotoId: action.payload,
          postPhotoIdLoading: false,
          postPhotoIdError: "",
        };
  
      case POST_PHOTOID_ERROR:
        return {
          ...state,
          postPhotoIdLoading: false,
          postPhotoIdError: action.payload,
        };
      case PUT_PHOTOID:
        return {
          ...state,
          putPhotoId: {},
          putPhotoIdLoading: true,
        };
      case PUT_PHOTOID_SUCCESS:
        return {
          ...state,
          putPhotoId: action.payload,
          getByIdPhotoId: {},
          putPhotoIdLoading: false,
          putPhotoIdError: "",
        };
  
      case PUT_PHOTOID_ERROR:
        return {
          ...state,
          putPhotoIdLoading: false,
          putPhotoIdError: action.payload,
        };
      case DELETE_PHOTOID:
        return {
          ...state,
          deletePhotoId: {},
          deletePhotoIdLoading: true,
        };
      case DELETE_PHOTOID_SUCCESS:
        return {
          ...state,
          deletePhotoId: action.payload,
          deletePhotoIdLoading: false,
          deletePhotoIdError: "",
        };
  
      case DELETE_PHOTOID_ERROR:
        return {
          ...state,
          deletePhotoIdLoading: false,
          deletePhotoIdError: action.payload,
        };
    default:
      return { ...state };
  }
};
export default PhotoIdSection;
