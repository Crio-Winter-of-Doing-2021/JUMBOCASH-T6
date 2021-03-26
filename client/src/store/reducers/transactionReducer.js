import {
  ADD_TRANSACTION_LOADING,
  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_FAIL,
  EDIT_TRANSACTION_LOADING,
  EDIT_TRANSACTION_SUCCESS,
  EDIT_TRANSACTION_FAIL,
  DELETE_TRANSACTION_LOADING,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAIL,
  GET_TRANSACTIONS_LOADING,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAIL,
} from '../types';

const initialState = {
  transactions: [],
  isLoading: false,
  isUpdating:false,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_TRANSACTIONS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_TRANSACTION_LOADING:
    case DELETE_TRANSACTION_LOADING:
    case ADD_TRANSACTION_LOADING:
      return {
        ...state,
        isUpdating: true,
      };
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        transactions: payload.transactions,
      };
    case ADD_TRANSACTION_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        transactions: [payload.transaction, ...state.transactions],
      };
    case DELETE_TRANSACTION_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        transactions: state.transactions.filter((x) => x.id !== payload.transaction.id),
      };
    case EDIT_TRANSACTION_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        transactions: state.transactions.map((x) => {
          if (x.id === payload.transaction.id) return payload.transaction;
          return x;
        }),
      };
    case DELETE_TRANSACTION_FAIL:
    case EDIT_TRANSACTION_FAIL:
    case ADD_TRANSACTION_FAIL:
      return {
        ...state,
        isUpdating: false,
      };
    case GET_TRANSACTIONS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
