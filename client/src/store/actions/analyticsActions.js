import axios from 'axios';
import {toast} from 'react-toastify';

import { attachTokenToHeaders } from './authActions';
import {
  GET_TRENDS_LOADING,
  GET_TRENDS_SUCCESS,
  GET_TRENDS_FAIL
} from '../types';
import { BASE_URL } from '../../constants';
import { formatTrendChartsData } from '../../utils/formatChartData';

export const getTrends = (interval) => async (dispatch, getState) => {
  dispatch({
    type: GET_TRENDS_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(BASE_URL+'/analytics/trend',{interval}, options);
    const data = formatTrendChartsData(response?.data?.analytics,interval);
    dispatch({
      type: GET_TRENDS_SUCCESS,
      payload: { analytics: data },
    });
  } catch (err) {
    dispatch({
      type: GET_TRENDS_FAIL,
      payload: { error: err?.response?.data?.message || 'Failed to fetch chart data' },
    });
  }
};


