import {
  GET_USER,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  GET_USER_BY_ID,
  GET_USER_BY_ID_ERROR,
  GET_USER_BY_ID_SUCCESS,
  POST_USER,
  POST_USER_ERROR,
  POST_USER_SUCCESS,
  PUT_USER,
  PUT_USER_ERROR,
  PUT_USER_SUCCESS,
} from "../actions";
const INIT_STATE = {
  getUser: [],
  getUserLoading: false,
  getUserError: "",
  getUserById: [],
  getUserByIdLoading: false,
  getUserByIdError: "",
  postUser: {},
  postUserLoading: false,
  postUserError: "",
  putUser: {},
  putUserLoading: false,
  putUserError: "",
};

const UserSection = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        getUser: [],
        getUserLoading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        getUser: action.payload,
        getUserLoading: false,
        getUserError: "",
      };

    case GET_USER_ERROR:
      return {
        ...state,
        getUserLoading: false,
        getUserError: action.payload.message,
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        getUserById: [],
        getUserByIdLoading: true,
      };
    case GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        getUserById: action.payload,
        getUserByIdLoading: false,
        getUserByIdError: "",
      };

    case GET_USER_BY_ID_ERROR:
      return {
        ...state,
        getUserByIdLoading: false,
        getUserByIdError: action.payload.message,
      };
    
   
    case POST_USER:
      return {
        ...state,
        postUser: {},
        postUserLoading: true,
      };
    case POST_USER_SUCCESS:
      return {
        ...state,
        postUser: action.payload,
        postUserLoading: false,
        postUserError: "",
      };

    case POST_USER_ERROR:
      return {
        ...state,
        postUserLoading: false,
        postUserError: action.payload,
      };
    
   
    case PUT_USER:
      return {
        ...state,
        putUser: {},
        putUserLoading: true,
      };
    case PUT_USER_SUCCESS:
      return {
        ...state,
        putUser: action.payload,
        putUserLoading: false,
        putUserError: "",
      };

    case PUT_USER_ERROR:
      return {
        ...state,
        putUserLoading: false,
        putUserError: action.payload,
      };
    default:
      return { ...state };
  }
};
export default UserSection;
