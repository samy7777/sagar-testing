import {
    DELETE_LOAN_TYPE,
    DELETE_LOAN_TYPE_ERROR,
    DELETE_LOAN_TYPE_SUCCESS,
    GET_BY_ID_LOAN_TYPE,
    GET_BY_ID_LOAN_TYPE_ERROR,
    GET_BY_ID_LOAN_TYPE_SUCCESS,
    GET_LOAN_TYPE,
    GET_LOAN_TYPE_ERROR,
    GET_LOAN_TYPE_SUCCESS,
    POST_LOAN_TYPE,
    POST_LOAN_TYPE_ERROR,
    POST_LOAN_TYPE_SUCCESS,
    PUT_LOAN_TYPE,
    PUT_LOAN_TYPE_ERROR,
    PUT_LOAN_TYPE_SUCCESS,
  } from "../actions";

const INIT_STATE = {
getLoanType: [],
getLoanTypeLoading: false,
getLoanTypeError: "",
getByIdLoanType: {},
getByIdLoanTypeLoading: false,
getByIdLoanTypeError: "",
postLoanType: {},
postLoanTypeLoading: false,
postLoanTypeError: "",
putLoanType: {},
putLoanTypeLoading: false,
putLoanTypeError: "",
deleteLoanType: {},
deleteLoanTypeLoading: false,
deleteLoanTypeError: "",
};

const LoanTypeSection = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LOAN_TYPE:
      return {
        ...state,
        getLoanType: {},
        getLoanTypeLoading: true,
      };
    case GET_LOAN_TYPE_SUCCESS:
      return {
        ...state,
        getLoanType: action.payload,
        getLoanTypeLoading: false,
        getLoanTypeError: "",
      };

    case GET_LOAN_TYPE_ERROR:
      return {
        ...state,
        getLoanTypeLoading: false,
        getLoanTypeError: action.payload,
      };
    case GET_BY_ID_LOAN_TYPE:
      return {
        ...state,
        getByIdLoanType: {},
        getByIdLoanTypeLoading: true,
      };
    case GET_BY_ID_LOAN_TYPE_SUCCESS:
      return {
        ...state,
        getByIdLoanType: action.payload,
        getByIdLoanTypeLoading: false,
        getByIdLoanTypeError: "",
      };

    case GET_BY_ID_LOAN_TYPE_ERROR:
      return {
        ...state,
        getByIdLoanTypeLoading: false,
        getByIdLoanTypeError: action.payload,
      };
      case POST_LOAN_TYPE:
        return {
          ...state,
          postLoanType: {},
          postLoanTypeLoading: true,
        };
      case POST_LOAN_TYPE_SUCCESS:
        return {
          ...state,
          postLoanType: action.payload,
          postLoanTypeLoading: false,
          postLoanTypeError: "",
        };
  
      case POST_LOAN_TYPE_ERROR:
        return {
          ...state,
          postLoanTypeLoading: false,
          postLoanTypeError: action.payload,
        };
      case PUT_LOAN_TYPE:
        return {
          ...state,
          putLoanType: {},
          putLoanTypeLoading: true,
        };
      case PUT_LOAN_TYPE_SUCCESS:
        return {
          ...state,
          putLoanType: action.payload,
          getByIdLoanType: {},
          putLoanTypeLoading: false,
          putLoanTypeError: "",
        };
  
      case PUT_LOAN_TYPE_ERROR:
        return {
          ...state,
          putLoanTypeLoading: false,
          putLoanTypeError: action.payload,
        };
      case DELETE_LOAN_TYPE:
        return {
          ...state,
          deleteLoanType: {},
          deleteLoanTypeLoading: true,
        };
      case DELETE_LOAN_TYPE_SUCCESS:
        return {
          ...state,
          deleteLoanType: action.payload,
          deleteLoanTypeLoading: false,
          deleteLoanTypeError: "",
        };
  
      case DELETE_LOAN_TYPE_ERROR:
        return {
          ...state,
          deleteLoanTypeLoading: false,
          deleteLoanTypeError: action.payload,
        };
    default:
      return { ...state };
  }
};
export default LoanTypeSection;
