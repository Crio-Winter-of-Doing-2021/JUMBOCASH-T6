import axios from 'axios';

import {
  LOGIN_WITH_OAUTH_LOADING,
  LOGIN_WITH_OAUTH_SUCCESS,
  LOGIN_WITH_OAUTH_FAIL,
  LOGOUT_SUCCESS,
  USER_LOADING,
  USER_SUCCESS,
  USER_FAIL
} from '../types';

export const loadUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('/api/users/me', options);

    dispatch({
      type: USER_SUCCESS,
      payload: { user: response.data.user },
    });
  } catch (err) {
    dispatch({
      type: USER_FAIL,
      payload: { error: err.response.data.message },
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

    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${token}`, { headers });

    dispatch({
      type: LOGIN_WITH_OAUTH_SUCCESS,
      payload: { user: response.data.user, token },
    });
  } catch (err) {
    dispatch({
      type: LOGIN_WITH_OAUTH_FAIL,
      payload: { error: err.response.data.message },
    });
  }
};

// Log user out
export const logOutUser = (history) => async (dispatch) => {
  console.log("logging out")
  try {
    deleteAllCookies();
    await axios.get('https://jsonplaceholder.typicode.com/posts');

    dispatch({
      type: LOGOUT_SUCCESS,
    });
    if (history) history.push('/login');
  } catch (err) {}
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
