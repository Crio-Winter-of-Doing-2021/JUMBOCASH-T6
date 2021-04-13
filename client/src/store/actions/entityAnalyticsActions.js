import axios from 'axios';


import { attachTokenToHeaders } from './authActions';
import {
  GET_ENTITY_ANALYTICS_LOADING,
  GET_ENTITY_ANALYTICS_SUCCESS,
  GET_ENTITY_ANALYTICS_FAIL,
} from '../types';
import { BASE_URL } from '../../constants';
import { formatTopEntitiesChartsData } from '../../utils/formatChartData';

export const getEntityAnalytics = () => async (dispatch, getState) => {
    const {from,to} = getState().appDate; 
    dispatch({
      type: GET_ENTITY_ANALYTICS_LOADING,
    });
    try {
      const options = attachTokenToHeaders(getState);
      const response = await axios.post(BASE_URL+'/analytics/entity',{time:{from,to}}, options);
      const data = formatTopEntitiesChartsData(response?.data?.analytics);
      dispatch({
        type: GET_ENTITY_ANALYTICS_SUCCESS,
        payload: { analytics: data },
      });
    } catch (err) {
      dispatch({
        type:  GET_ENTITY_ANALYTICS_FAIL,
        payload: { error: err?.response?.data?.message || 'Failed to fetch chart data' },
      });
    }
};

