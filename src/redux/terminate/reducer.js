import {
  GET_TERMINATE,
  GET_TERMINATE_ERROR,
  GET_TERMINATE_SUCCESS,
  POST_TERMINATE,
  POST_TERMINATE_ERROR,
  POST_TERMINATE_SUCCESS,
} from "../actions";

const INIT_STATE = {
  getTerminate: [],
  getTerminateLoading: false,
  getTerminateError: "",
  postTerminate: {},
  postTerminateLoading: false,
  postTerminateLoadingError: "",
};

const TerminateSection = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TERMINATE:
      return {
        ...state,
        getTerminate: {},
        getTerminateLoading: true,
      };
    case GET_TERMINATE_SUCCESS:
      return {
        ...state,
        getTerminate: action.payload,
        getTerminateLoading: false,
        getTerminateError: "",
      };

    case GET_TERMINATE_ERROR:
      return {
        ...state,
        getTerminateLoading: false,
        getTerminateError: action.payload,
      };

    case POST_TERMINATE:
      return {
        ...state,
        postTerminate: {},
        postTerminateLoading: true,
      };
    case POST_TERMINATE_SUCCESS:
      return {
        ...state,
        postTerminate: action.payload,
        postTerminateLoading: false,
        postTerminateError: "",
      };

    case POST_TERMINATE_ERROR:
      return {
        ...state,
        postTerminateLoading: false,
        postTerminateError: action.payload,
      };

    default:
      return { ...state };
  }
};
export default TerminateSection;
