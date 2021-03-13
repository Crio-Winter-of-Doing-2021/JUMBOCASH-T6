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
  // Will be populated from backend
  transactions: [
    {
      id: 1,
      entityId: '789327d08-9184-4d57-9f83-f7a646e92a58',
      time: '2018-12-06T02:16:39 -06:-30',
      paymentMode: 'CASH',
      paymentStatus: 'PAID',
      amount: 2691.15,
      category: 'SALES',
    },
    {
      id: 2,
      entityId: '15327d08-9184-4d57-9f83-f7a646e92a58',
      time: '2018-12-06T02:16:39 -06:-30',
      paymentMode: 'CREDIT_CARD',
      paymentStatus: 'PAID',
      amount: 2691.15,
      category: 'SALES',
    },
    {
      id: 3,
      entityId: '15327d08-9184-4d57-9f83-f7a646e92a58',
      time: '2018-12-06T02:16:39 -06:-30',
      paymentMode: 'CREDIT_CARD',
      paymentStatus: 'PAID',
      amount: 2691.15,
      category: 'SALES',
    },
    {
      id: 4,
      entityId: '789327d08-9184-4d57-9f83-f7a646e92a58',
      time: '2018-12-06T02:16:39 -06:-30',
      paymentMode: 'DEBIT_CARD',
      paymentStatus: 'NOT_PAID',
      amount: 7985,
      category: 'SALES',
    },
    {
      id: 5,
      entityId: '15327d08-9184-4d57-9f83-f7a646e92a58',
      time: '2018-12-06T02:16:39 -06:-30',
      paymentMode: 'UPI',
      paymentStatus: 'PAID',
      amount: 2691.15,
      category: 'SALES',
    },
    {
      id: 6,
      entityId: '789327d08-9184-4d57-9f83-f7a646e92a58',
      time: '2018-12-06T02:16:39 -06:-30',
      paymentMode: 'CASH',
      paymentStatus: 'NOT_PAID',
      amount: 3000.15,
      category: 'SALES',
    },
    {
      id: 7,
      entityId: '789327d08-9184-4d57-9f83-f7a646e92a58',
      time: '2018-12-06T02:16:39 -06:-30',
      paymentMode: 'UPI',
      paymentStatus: 'PAID',
      amount: 2691.15,
      category: 'SALES',
    },
    {
      id: 8,
      entityId: '15327d08-9184-4d57-9f83-f7a646e92a58',
      time: '2018-12-06T02:16:39 -06:-30',
      paymentMode: 'CASH',
      paymentStatus: 'PAID',
      amount: 2691.15,
      category: 'SALES',
    },
    {
      id: 9,
      entityId: '15327d08-9184-4d57-9f83-f7a646e92a58',
      time: '2018-12-06T02:16:39 -06:-30',
      paymentMode: 'UPI',
      paymentStatus: 'NOT_PAID',
      amount: 1000,
      category: 'SALES',
    },
  ],
  isLoading: false,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_TRANSACTIONS_LOADING:
    case EDIT_TRANSACTION_LOADING:
    case DELETE_TRANSACTION_LOADING:
    case ADD_TRANSACTION_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // entities: payload.entities,
      };
    case ADD_TRANSACTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        transactions: [payload.transaction, ...state.transactions],
      };
    case DELETE_TRANSACTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        transactions: state.transactions.filter((x) => x.id !== payload.transaction.id),
      };
    case EDIT_TRANSACTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        transactions: state.transactions.map((x) => {
          if (x.id === payload.transaction.id) return payload.transaction;
          return x;
        }),
      };
    case DELETE_TRANSACTION_FAIL:
    case EDIT_TRANSACTION_FAIL:
    case ADD_TRANSACTION_FAIL:
    case GET_TRANSACTIONS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    default:
      return state;
  }
}
