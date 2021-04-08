import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import {
  GET_CASHFLOW_ANALYTICS_LOADING,
  GET_CASHFLOW_ANALYTICS_SUCCESS,
  GET_CASHFLOW_ANALYTICS_FAIL
} from '../types';
import { BASE_URL } from '../../constants';
import { formatCashflowSummaryData} from '../../utils/formatChartData';

export const getCashflowAnalytics = (interval) => async (dispatch, getState) => {
    dispatch({
      type: GET_CASHFLOW_ANALYTICS_LOADING,
    });
    try {
      const options = attachTokenToHeaders(getState);
      const response = await axios.post(BASE_URL+'/analytics/cashflow',{time:{from:interval[0],to:interval[1]}}, options);
      const data = formatCashflowSummaryData(response?.data?.analytics);
      dispatch({
        type: GET_CASHFLOW_ANALYTICS_SUCCESS,
        payload: { analytics: data },
      });
    } catch (err) {
      dispatch({
        type:  GET_CASHFLOW_ANALYTICS_FAIL,
        payload: { error: err?.response?.data?.message || 'Failed to fetch chart data' },
      });
    }
};
