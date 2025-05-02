import {
  GET_LOAN,
  GET_LOAN_ERROR,
  GET_LOAN_SUCCESS,
  GET_BY_ID_LOAN,
  GET_BY_ID_LOAN_ERROR,
  GET_BY_ID_LOAN_SUCCESS,
  GET_BY_USERID_LOAN,
  GET_BY_USERID_LOAN_ERROR,
  GET_BY_USERID_LOAN_SUCCESS,
  GET_PENDING_LOAN,
  GET_PENDING_LOAN_SUCCESS,
  GET_PENDING_LOAN_ERROR,
  POST_LOAN,
  POST_LOAN_ERROR,
  POST_LOAN_SUCCESS,
  POST_LOAN_PAYMENT,
  POST_LOAN_PAYMENT_SUCCESS,
  POST_LOAN_PAYMENT_ERROR,
  PUT_LOAN,
  PUT_LOAN_ERROR,
  PUT_LOAN_SUCCESS,
  PUT_CLOSE_LOAN,
  PUT_CLOSE_LOAN_SUCCESS,
  PUT_CLOSE_LOAN_ERROR,
  GET_LOAN_DOWNLOAD,
  GET_LOAN_DOWNLOAD_SUCCESS,
  GET_LOAN_DOWNLOAD_ERROR,
} from "../actions";

const INIT_STATE = {
  getLoan: [],
  getLoanLoading: false,
  getLoanError: "",
  getLoanDownload: {},
  getLoanDownloadLoading: false,
  getLoanDownloadError: "",
  getByIdLoan: {},
  getByIdLoanLoading: false,
  getByIdLoanError: "",
  getByUserIdLoan: {},
  getByUserIdLoanLoading: false,
  getByUserIdLoanError: "",
  getPendingLoan: {},
  getPendingLoanLoading: false,
  getPendingLoanError: "",
  postLoanPayment: {},
  postLoanPaymentLoading: false,
  postLoanPaymentError: "",
  postLoan: {},
  postLoanLoading: false,
  postLoanError: "",
  putLoan: {},
  putLoanLoading: false,
  putLoanError: "",
  putCloseLoan: {},
  putCloseLoanLoading: false,
  putCloseLoanError: "",
};

const LoanSection = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LOAN:
      return {
        ...state,
        getLoan: {},
        getLoanLoading: true,
      };
    case GET_LOAN_SUCCESS:
      return {
        ...state,
        getLoan: action.payload,
        getLoanLoading: false,
        getLoanError: "",
      };

    case GET_LOAN_ERROR:
      return {
        ...state,
        getLoanLoading: false,
        getLoanError: action.payload,
      };
    case GET_LOAN_DOWNLOAD:
      return {
        ...state,
        getLoanDownload: {},
        getLoanDownloadLoading: true,
      };
    case GET_LOAN_DOWNLOAD_SUCCESS:
      return {
        ...state,
        getLoanDownload: action.payload,
        getLoanDownloadLoading: false,
        getLoanDownloadError: "",
      };
    case GET_LOAN_DOWNLOAD_ERROR:
      return {
        ...state,
        getLoanDownloadLoading: false,
        getLoanDownloadError: action.payload,
      };

    case GET_BY_ID_LOAN:
      return {
        ...state,
        getByIdLoan: {},
        getByIdLoanLoading: true,
      };
    case GET_BY_ID_LOAN_SUCCESS:
      return {
        ...state,
        getByIdLoan: action.payload,
        getByIdLoanLoading: false,
        getByIdLoanError: "",
      };

    case GET_BY_ID_LOAN_ERROR:
      return {
        ...state,
        getByIdLoanLoading: false,
        getByIdLoanError: action.payload,
      };
    case GET_BY_USERID_LOAN:
      return {
        ...state,
        getByUserIdLoan: {},
        getByUserIdLoanLoading: true,
      };
    case GET_BY_USERID_LOAN_SUCCESS:
      return {
        ...state,
        getByUserIdLoan: action.payload,
        getByUserIdLoanLoading: false,
        getByUserIdLoanError: "",
      };
    case GET_BY_USERID_LOAN_ERROR:
      return {
        ...state,
        getByUserIdLoanLoading: false,
        getByUserIdLoanError: action.payload,
      };
    case GET_PENDING_LOAN:
      return {
        ...state,
        getPendingLoan: {},
        getPendingLoanLoading: true,
      };
    case GET_PENDING_LOAN_SUCCESS:
      return {
        ...state,
        getPendingLoan: action.payload,
        getPendingLoanLoading: false,
        getPendingLoanError: "",
      };
    case GET_PENDING_LOAN_ERROR:
      return {
        ...state,
        getPendingLoanLoading: false,
        getPendingLoanError: action.payload,
      };
    case POST_LOAN:
      return {
        ...state,
        postLoan: {},
        postLoanLoading: true,
      };
    case POST_LOAN_SUCCESS:
      return {
        ...state,
        postLoan: action.payload,
        postLoanLoading: false,
        postLoanError: "",
      };

    case POST_LOAN_ERROR:
      return {
        ...state,
        postLoanLoading: false,
        postLoanError: action.payload,
      };
    case POST_LOAN_PAYMENT:
      return {
        ...state,
        postLoanPayment: {},
        postLoanPaymentLoading: true,
      };
    case POST_LOAN_PAYMENT_SUCCESS:
      return {
        ...state,
        postLoanPayment: action.payload,
        postLoanPaymentLoading: false,
        postLoanPaymentError: "",
      };
    case POST_LOAN_PAYMENT_ERROR:
      return {
        ...state,
        postLoanPaymentLoading: false,
        postLoanPaymentError: action.payload,
      };
    case PUT_LOAN:
      return {
        ...state,
        putLoan: {},
        putLoanLoading: true,
      };
    case PUT_LOAN_SUCCESS:
      return {
        ...state,
        putLoan: action.payload,
        getByIdLoan: {},
        putLoanLoading: false,
        putLoanError: "",
      };

    case PUT_LOAN_ERROR:
      return {
        ...state,
        putLoanLoading: false,
        putLoanError: action.payload,
      };
    case PUT_CLOSE_LOAN:
      return {
        ...state,
        putCloseLoan: {},
        putCloseLoanLoading: true,
      };
    case PUT_CLOSE_LOAN_SUCCESS:
      return {
        ...state,
        putCloseLoan: action.payload,
        putCloseLoanLoading: false,
        putCloseLoanError: "",
      };
    case PUT_CLOSE_LOAN_ERROR:
      return {
        ...state,
        putCloseLoanLoading: false,
        putCloseLoanError: action.payload,
      };

    default:
      return { ...state };
  }
};
export default LoanSection;
