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

export const getCityAction = (info) => ({
  type: GET_CITY,
  payload: info,
});
export const getCitySuccess = (info) => ({
  type: GET_CITY_SUCCESS,
  payload: info,
});
export const getCityError = (error) => ({
  type: GET_CITY_ERROR,
  payload: error,
});

export const postCityAction = (info) => ({
  type: POST_CITY,
  payload: info,
});
export const postCitySuccess = (info) => ({
  type: POST_CITY_SUCCESS,
  payload: info,
});
export const postCityError = (error) => ({
  type: POST_CITY_ERROR,
  payload: error,
});

export const getByIdCityAction = (info) => ({
  type: GET_BY_ID_CITY,
  payload: info,
});
export const getByIdCitySuccess = (info) => ({
  type: GET_BY_ID_CITY_SUCCESS,
  payload: info,
});
export const getByIdCityError = (error) => ({
  type: GET_BY_ID_CITY_ERROR,
  payload: error,
});

export const putCityAction = (info) => ({
  type: PUT_CITY,
  payload: info,
});
export const putCitySuccess = (info) => ({
  type: PUT_CITY_SUCCESS,
  payload: info,
});
export const putCityError = (error) => ({
  type: PUT_CITY_ERROR,
  payload: error,
});

export const deleteCityAction = (info) => ({
  type: DELETE_CITY,
  payload: info,
});
export const deleteCitySuccess = (info) => ({
  type: DELETE_CITY_SUCCESS,
  payload: info,
});
export const deleteCityError = (error) => ({
  type: DELETE_CITY_ERROR,
  payload: error,
});
