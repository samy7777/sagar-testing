import {
    DELETE_REGION,
    DELETE_REGION_ERROR,
    DELETE_REGION_SUCCESS,
    GET_BY_ID_REGION,
    GET_BY_ID_REGION_ERROR,
    GET_BY_ID_REGION_SUCCESS,
    GET_REGION,
    GET_REGION_ERROR,
    GET_REGION_SUCCESS,
    POST_REGION,
    POST_REGION_ERROR,
    POST_REGION_SUCCESS,
    PUT_REGION,
    PUT_REGION_ERROR,
    PUT_REGION_SUCCESS,
  } from "../actions";

const INIT_STATE = {
getRegion: [],
getRegionLoading: false,
getRegionError: "",
getByIdRegion: {},
getByIdRegionLoading: false,
getByIdRegionError: "",
postRegion: {},
postRegionLoading: false,
postRegionError: "",
putRegion: {},
putRegionLoading: false,
putRegionError: "",
deleteRegion: {},
deleteRegionLoading: false,
deleteRegionError: "",
};

const RegionSection = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_REGION:
      return {
        ...state,
        getRegion: {},
        getRegionLoading: true,
      };
    case GET_REGION_SUCCESS:
      return {
        ...state,
        getRegion: action.payload,
        getRegionLoading: false,
        getRegionError: "",
      };

    case GET_REGION_ERROR:
      return {
        ...state,
        getRegionLoading: false,
        getRegionError: action.payload,
      };
    case GET_BY_ID_REGION:
      return {
        ...state,
        getByIdRegion: {},
        getByIdRegionLoading: true,
      };
    case GET_BY_ID_REGION_SUCCESS:
      return {
        ...state,
        getByIdRegion: action.payload,
        getByIdRegionLoading: false,
        getByIdRegionError: "",
      };

    case GET_BY_ID_REGION_ERROR:
      return {
        ...state,
        getByIdRegionLoading: false,
        getByIdRegionError: action.payload,
      };
      case POST_REGION:
        return {
          ...state,
          postRegion: {},
          postRegionLoading: true,
        };
      case POST_REGION_SUCCESS:
        return {
          ...state,
          postRegion: action.payload,
          postRegionLoading: false,
          postRegionError: "",
        };
  
      case POST_REGION_ERROR:
        return {
          ...state,
          postRegionLoading: false,
          postRegionError: action.payload,
        };
      case PUT_REGION:
        return {
          ...state,
          putRegion: {},
          putRegionLoading: true,
        };
      case PUT_REGION_SUCCESS:
        return {
          ...state,
          putRegion: action.payload,
          getByIdRegion: {},
          putRegionLoading: false,
          putRegionError: "",
        };
  
      case PUT_REGION_ERROR:
        return {
          ...state,
          putRegionLoading: false,
          putRegionError: action.payload,
        };
      case DELETE_REGION:
        return {
          ...state,
          deleteRegion: {},
          deleteRegionLoading: true,
        };
      case DELETE_REGION_SUCCESS:
        return {
          ...state,
          deleteRegion: action.payload,
          deleteRegionLoading: false,
          deleteRegionError: "",
        };
  
      case DELETE_REGION_ERROR:
        return {
          ...state,
          deleteRegionLoading: false,
          deleteRegionError: action.payload,
        };
    default:
      return { ...state };
  }
};
export default RegionSection;
