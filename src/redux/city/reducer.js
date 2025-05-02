import {
    DELETE_CITY,
    DELETE_CITY_ERROR,
    DELETE_CITY_SUCCESS,
    GET_BY_ID_CITY,
    GET_BY_ID_CITY_ERROR,
    GET_BY_ID_CITY_SUCCESS,
    GET_CITY,
    GET_CITY_ERROR,
    GET_CITY_SUCCESS,
    POST_CITY,
    POST_CITY_ERROR,
    POST_CITY_SUCCESS,
    PUT_CITY,
    PUT_CITY_ERROR,
    PUT_CITY_SUCCESS,
  } from "../actions";

const INIT_STATE = {
getCity: [],
getCityLoading: false,
getCityError: "",
getByIdCity: {},
getByIdCityLoading: false,
getByIdCityError: "",
postCity: {},
postCityLoading: false,
postCityError: "",
putCity: {},
putCityLoading: false,
putCityError: "",
deleteCity: {},
deleteCityLoading: false,
deleteCityError: "",
};

const CitySection = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CITY:
      return {
        ...state,
        getCity: {},
        getCityLoading: true,
      };
    case GET_CITY_SUCCESS:
      return {
        ...state,
        getCity: action.payload,
        getCityLoading: false,
        getCityError: "",
      };

    case GET_CITY_ERROR:
      return {
        ...state,
        getCityLoading: false,
        getCityError: action.payload,
      };
    case GET_BY_ID_CITY:
      return {
        ...state,
        getByIdCity: {},
        getByIdCityLoading: true,
      };
    case GET_BY_ID_CITY_SUCCESS:
      return {
        ...state,
        getByIdCity: action.payload,
        getByIdCityLoading: false,
        getByIdCityError: "",
      };

    case GET_BY_ID_CITY_ERROR:
      return {
        ...state,
        getByIdCityLoading: false,
        getByIdCityError: action.payload,
      };
      case POST_CITY:
        return {
          ...state,
          postCity: {},
          postCityLoading: true,
        };
      case POST_CITY_SUCCESS:
        return {
          ...state,
          postCity: action.payload,
          postCityLoading: false,
          postCityError: "",
        };
  
      case POST_CITY_ERROR:
        return {
          ...state,
          postCityLoading: false,
          postCityError: action.payload,
        };
      case PUT_CITY:
        return {
          ...state,
          putCity: {},
          putCityLoading: true,
        };
      case PUT_CITY_SUCCESS:
        return {
          ...state,
          putCity: action.payload,
          getByIdCity: {},
          putCityLoading: false,
          putCityError: "",
        };
  
      case PUT_CITY_ERROR:
        return {
          ...state,
          putCityLoading: false,
          putCityError: action.payload,
        };
      case DELETE_CITY:
        return {
          ...state,
          deleteCity: {},
          deleteCityLoading: true,
        };
      case DELETE_CITY_SUCCESS:
        return {
          ...state,
          deleteCity: action.payload,
          deleteCityLoading: false,
          deleteCityError: "",
        };
  
      case DELETE_CITY_ERROR:
        return {
          ...state,
          deleteCityLoading: false,
          deleteCityError: action.payload,
        };
    default:
      return { ...state };
  }
};
export default CitySection;
