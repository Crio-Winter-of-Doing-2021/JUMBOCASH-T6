import {
  LOGIN_WITH_OAUTH_LOADING,
  LOGIN_WITH_OAUTH_SUCCESS,
  LOGIN_WITH_OAUTH_FAIL,
  LOGOUT_SUCCESS,
  USER_LOADING,
  USER_SUCCESS,
  USER_FAIL,
} from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false, 
  isLoading: false,
  user: null,
  error: null,
  appLoaded: false,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
        appLoaded: false,
        error: null,
      };
    case LOGIN_WITH_OAUTH_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGIN_WITH_OAUTH_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        token: payload.token,
        user: payload.user,
        error: null,
      };
    case USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload.user,
        error: null,
        appLoaded: true,
      };
    case USER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null,
        appLoaded: true,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null, 
      };
    default:
      return state;
  }
}
