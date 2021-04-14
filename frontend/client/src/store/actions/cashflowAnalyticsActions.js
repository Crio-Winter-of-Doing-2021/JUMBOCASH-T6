import axios from 'axios';
import * as download from 'js-file-download';

import {toast} from 'react-toastify';

import { attachTokenToHeaders } from './authActions';
import {
  GET_CASHFLOW_ANALYTICS_LOADING,
  GET_CASHFLOW_ANALYTICS_SUCCESS,
  GET_CASHFLOW_ANALYTICS_FAIL,
} from '../types';
import { BASE_URL } from '../../constants';
import { formatCashflowSummaryData } from '../../utils/formatChartData';

export const getCashflowAnalytics = () => async (dispatch, getState) => {
  const { from, to } = getState().appDate;
  dispatch({
    type: GET_CASHFLOW_ANALYTICS_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(
      BASE_URL + '/analytics/cashflow',
      { time: { from, to } },
      options,
    );
    const data = formatCashflowSummaryData(response?.data?.analytics);
    dispatch({
      type: GET_CASHFLOW_ANALYTICS_SUCCESS,
      payload: { analytics: data },
    });
  } catch (err) {
    dispatch({
      type: GET_CASHFLOW_ANALYTICS_FAIL,
      payload: { error: err?.response?.data?.message || 'Failed to fetch chart data' },
    });
  }
};

export const downloadAnalyticsZip = () => async (dispatch, getState) => {
  toast.info("Downloading zip")
  const { from, to } = getState().appDate;
 
  const data = { time: { from, to }, interval: 'year' };
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(BASE_URL + '/analytics/csv', data, {...options,responseType: 'blob'});
    download(response.data, `reports-${from.toDateString()}-${to.toDateString()}.zip`);
  } catch (err) {
    toast.error("Failed to download zip")
  }
  toast.dismiss()
};
