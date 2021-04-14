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
import { BASE_URL } from '../../constants';

export const addEntity = (formData) => async (dispatch, getState) => {
  dispatch({
    type: ADD_ENTITY_LOADING,
  });
  
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(
      BASE_URL+'/entity',
      formData,
      options,
    );
    toast.success("✅ Entity Added Successfully")
    dispatch({
      type: ADD_ENTITY_SUCCESS,
      payload: { entity: response.data.entity },
    });
  } catch (err) {
    const errMessage = err?.response?.data?.errorMessage || '';
    toast.error('❌ Failed to add entity. ' + errMessage)
    dispatch({
      type: ADD_ENTITY_FAIL,
      payload: { error: errMessage },
    });
  }
};

export const getEntities = () => async (dispatch, getState) => {
  dispatch({
    type: GET_ENTITIES_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(BASE_URL+'/entity', options);
    dispatch({
      type: GET_ENTITIES_SUCCESS,
      payload: { entities: response.data.data },
    });
  } catch (err) {
    const errMessage = err?.response?.data?.errorMessage;
    dispatch({
      type: GET_ENTITIES_FAIL,
      payload: { error: errMessage },
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
    const response = await axios.patch(BASE_URL+'/entity/'+id, formData, options);
    toast.success("✅ Entity Edited Successfully")
    dispatch({
      type: EDIT_ENTITY_SUCCESS,
      payload: { entity: response.data.data },
    });
  } catch (err) {
    const errMessage = err?.response?.data?.errorMessage || '';
    toast.error('❌ Failed to edit entity. ' + errMessage)
    dispatch({
      type: EDIT_ENTITY_FAIL,
      payload: { error: errMessage },
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
    const response = await axios.delete(BASE_URL+'/entity/'+id, options);

    dispatch({
      type: DELETE_ENTITY_SUCCESS,
      payload: { entity: response.data.data },
    });
  } catch (err) {
    const errMessage = err?.response?.data?.errorMessage;
    toast.error('❌ Failed to delete entity. ' + errMessage)
    dispatch({
      type: DELETE_ENTITY_FAIL,
      payload: { error: errMessage },
    });
  }
};
