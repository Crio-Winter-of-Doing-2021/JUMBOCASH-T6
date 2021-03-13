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
} from '../types';

export const addTransaction = (formData) => async (dispatch, getState) => {
  dispatch({
    type: ADD_TRANSACTION_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
      options,
    );
    toast.success('✅ Transaction Added Successfully');
    dispatch({
      type: ADD_TRANSACTION_SUCCESS,
      payload: {
        transaction: {
          id:'10',
          userId: "2e107775-2b0d-4e24-af6c-8766c042fb09",
          entityId: '65327d08-9184-4d57-9f83-f7a646e95a58',
          time: '2018-12-06T02:16:39 -06:-30',
          paymentMode: 'CASH',
          paymentStatus: 'PAID',
          amount: 5000,
          category: 'SALES',
        },
      },
    });
  } catch (err) {
    toast.error('❌ Failed to add transaction');
    dispatch({
      type: ADD_TRANSACTION_FAIL,
      payload: { error: true },
    });
  }
};

export const getTransactions = () => async (dispatch, getState) => {
  dispatch({
    type: GET_TRANSACTIONS_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', options);

    dispatch({
      type: GET_TRANSACTIONS_SUCCESS,
      payload: { trasactions: response.data },
    });
  } catch (err) {
    dispatch({
      type: GET_TRANSACTIONS_FAIL,
      payload: { error: err?.response?.data.message || err.message },
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
    const response = await axios.patch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      formData,
      options,
    );
    
    toast.success('✅ Transaction Edited Successfully');
    dispatch({
      type: EDIT_TRANSACTION_SUCCESS,
      payload: {
        transaction: formData,
      },
    });
    
  } catch (err) {
    toast.error('❌ Failed to edit transaction');
    dispatch({
      type: EDIT_TRANSACTION_FAIL,
      payload: { error: err?.response?.data.message || err.message, id },
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
    const response = await axios.delete(`/api/entities/posts/${id}`, options);

    dispatch({
      type: DELETE_TRANSACTION_SUCCESS,
      payload: { transaction: response.data },
    });
  } catch (err) {
    dispatch({
      type: DELETE_TRANSACTION_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};
