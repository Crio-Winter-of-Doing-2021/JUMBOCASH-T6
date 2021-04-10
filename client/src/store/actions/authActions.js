import axios from 'axios';

import {
  LOGIN_WITH_OAUTH_LOADING,
  LOGIN_WITH_OAUTH_SUCCESS,
  LOGIN_WITH_OAUTH_FAIL,
  USER_LOADING,
  USER_SUCCESS,
  USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  USER_UPDATE_LOADING,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from '../types';
import { BASE_URL } from '../../constants';
import { toast } from 'react-toastify';

export const loadUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(BASE_URL+'/user/me', options);
    dispatch({
      type: USER_SUCCESS,
      payload: { user: response?.data?.data },
    });
  } catch (err) {
    dispatch({
      type: USER_FAIL,
      payload: { error: err?.response?.data?.message },
    });
  }
};

export const updateUserInfo = (formData) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_LOADING });
  
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.patch(BASE_URL+'/user/me',formData, options);
    toast.success('✅ User info updated successfully.')
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: { user: response?.data?.data },
    });
  } catch (err) {
    const errMessage = err?.response?.data?.message || '';
    toast.error('❌ Failed to update user info. ' + errMessage)
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: { error: err?.response?.data?.message },
    });
  }
};

export const logInUserWithOauth = (token) => async (dispatch, getState) => {
  dispatch({ type: LOGIN_WITH_OAUTH_LOADING });
 
  try {
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };

    const response = await axios.get(BASE_URL+'/user/me', { headers });
  
    dispatch({
      type: LOGIN_WITH_OAUTH_SUCCESS,
      payload: { user: response?.data?.data, token },
    });
  } catch (err) {
    dispatch({
      type: LOGIN_WITH_OAUTH_FAIL,
      payload: { error: err?.response?.data?.message },
    });
  }
};

// Log user out
export const logOutUser = (history) => async (dispatch) => {
  console.log("logging out")
  try {
    deleteAllCookies();
    await axios.get(BASE_URL+'/auth/logout');

    dispatch({
      type: LOGOUT_SUCCESS,
    });
    if (history) history.push('/login');
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL,
    });
  }
};


function deleteAllCookies() {
  const cookies = document.cookie.split(';');
  
  cookies.forEach((cookie)=>{
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  })
}

export const attachTokenToHeaders = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
