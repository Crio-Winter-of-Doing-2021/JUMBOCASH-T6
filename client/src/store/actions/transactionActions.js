import axios from 'axios';
import { toast } from 'react-toastify';

import { attachTokenToHeaders } from './authActions';
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
  ADD_MULTIPLE_TRANSACTIONS_LOADING,
  ADD_MULTIPLE_TRANSACTIONS_SUCCESS,
  ADD_MULTIPLE_TRANSACTIONS_FAIL,
} from '../types';
import { BASE_URL } from '../../constants';

export const addTransaction = (formData) => async (dispatch, getState) => {
  dispatch({
    type: ADD_TRANSACTION_LOADING,
  });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(BASE_URL + '/transaction', formData, options);
    toast.success('✅ Transaction Added Successfully');
    dispatch({
      type: ADD_TRANSACTION_SUCCESS,
      payload: { transaction: response.data.transaction },
    });
  } catch (err) {
    const errMessage = err?.response?.data?.errorMessage || '';
    toast.error('❌ Failed to add transaction. ' + errMessage);
    dispatch({
      type: ADD_TRANSACTION_FAIL,
      payload: { error: errMessage },
    });
  }
};

export const getTransactions = () => async (dispatch, getState) => {
  dispatch({
    type: GET_TRANSACTIONS_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(BASE_URL + '/transaction', options);

    dispatch({
      type: GET_TRANSACTIONS_SUCCESS,
      payload: { transactions: response.data.data },
    });
  } catch (err) {
    const errMessage = err?.response?.data?.errorMessage;
    dispatch({
      type: GET_TRANSACTIONS_FAIL,
      payload: { error: errMessage },
    });
  }
};

export const getFilteredTransactions = () => async (dispatch, getState) => {
  dispatch({
    type: GET_TRANSACTIONS_LOADING,
  });
  const {from,to} = getState().appDate;
  const data = {
    filter: {
      time: {
        from,
        to,
      },
    },
  };
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(BASE_URL + '/transaction/filter',data, options);

    dispatch({
      type: GET_TRANSACTIONS_SUCCESS,
      payload: { transactions: response.data.data },
    });
  } catch (err) {
    const errMessage = err?.response?.data?.errorMessage;
    dispatch({
      type: GET_TRANSACTIONS_FAIL,
      payload: { error: errMessage },
    });
  }
};

export const editTransaction = (id, formData) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_TRANSACTION_LOADING,
    payload: { id },
  });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.patch(BASE_URL + '/transaction/' + id, formData, options);
    toast.success('✅ Transaction Edited Successfully');
    dispatch({
      type: EDIT_TRANSACTION_SUCCESS,
      payload: {
        transaction: response.data.data,
      },
    });
  } catch (err) {
    const errMessage = err?.response?.data?.errorMessage || '';
    toast.error('❌ Failed to edit transaction. ' + errMessage);
    dispatch({
      type: EDIT_TRANSACTION_FAIL,
      payload: { error: errMessage },
    });
  }
};

export const addMultipleTransactions = (transactionArr) => async (dispatch, getState) => {
  dispatch({
    type: ADD_MULTIPLE_TRANSACTIONS_LOADING,
  });
  toast.info('Parsing Completed. 🚀 Adding the transactions.');
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(BASE_URL + '/transaction/multi', transactionArr, options);
    toast.success('✅ Transactions Added Successfully');
    dispatch({
      type: ADD_MULTIPLE_TRANSACTIONS_SUCCESS,
      payload: { transactions: response.data.transaction },
    });
  } catch (err) {
    const errMessage = err?.response?.data?.errorMessage || '';
    toast.error('❌ Failed to add transactions. ' + errMessage);
    dispatch({
      type: ADD_MULTIPLE_TRANSACTIONS_FAIL,
      payload: { error: errMessage },
    });
  }
};

export const deleteTransaction = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_TRANSACTION_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.delete(BASE_URL + '/transaction/' + id, options);
    toast.success('✅ Transaction Deleted Successfully');
    dispatch({
      type: DELETE_TRANSACTION_SUCCESS,
      payload: { transaction: response.data.transaction },
    });
  } catch (err) {
    const errMessage = err?.response?.data?.errorMessage;
    toast.error('❌ Failed to delete transaction. ' + errMessage);
    dispatch({
      type: DELETE_TRANSACTION_FAIL,
      payload: { error: errMessage },
    });
  }
};
