import axios from 'axios';
import {toast} from 'react-toastify';

import { attachTokenToHeaders } from './authActions';
import {
  ADD_ENTITY_LOADING,
  ADD_ENTITY_SUCCESS,
  ADD_ENTITY_FAIL,
  EDIT_ENTITY_LOADING,
  EDIT_ENTITY_SUCCESS,
  EDIT_ENTITY_FAIL,
  DELETE_ENTITY_LOADING,
  DELETE_ENTITY_SUCCESS,
  DELETE_ENTITY_FAIL,
  GET_ENTITIES_LOADING,
  GET_ENTITIES_SUCCESS,
  GET_ENTITIES_FAIL,
} from '../types';

export const addEntity = (formData) => async (dispatch, getState) => {
  dispatch({
    type: ADD_ENTITY_LOADING,
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
    toast.success("✅ Entity Added Successfully")
    dispatch({
      type: ADD_ENTITY_SUCCESS,
      payload: { entity: { id: '33333', userId: '33333', name: 'Entity3', address: 'Bangalore, India', contact: '3235467898' } },
    });
  } catch (err) {
    toast.error("❌ Failed to add entity")
    dispatch({
      type: ADD_ENTITY_FAIL,
      payload: { error: true },
    });
  }
};

export const getEntities = () => async (dispatch, getState) => {
  dispatch({
    type: GET_ENTITIES_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', options);

    dispatch({
      type: GET_ENTITIES_SUCCESS,
      payload: { entities: response.data },
    });
  } catch (err) {
    dispatch({
      type: GET_ENTITIES_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const deleteEntity = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_ENTITY_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.delete(`/api/entities/${id}`, options);

    dispatch({
      type: DELETE_ENTITY_SUCCESS,
      payload: { entity: response.data },
    });
  } catch (err) {
    dispatch({
      type: DELETE_ENTITY_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const editEntity = (id, formData) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_ENTITY_LOADING,
    payload: { id },
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.put(`/api/entities/${id}`, formData, options);

    dispatch({
      type: EDIT_ENTITY_SUCCESS,
      payload: { entity: response.data },
    });
  } catch (err) {
    dispatch({
      type: EDIT_ENTITY_FAIL,
      payload: { error: err?.response?.data.message || err.message, id },
    });
  }
};

