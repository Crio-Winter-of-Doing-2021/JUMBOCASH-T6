import {
  GET_CASHFLOW_ANALYTICS_LOADING,
  GET_CASHFLOW_ANALYTICS_SUCCESS,
  GET_CASHFLOW_ANALYTICS_FAIL
} from '../types';

const initialState = {
  cashflowAnalytics: null,
  isCashflowAnalyticsLoading: false,
  cashflowAnalyticsError: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_CASHFLOW_ANALYTICS_LOADING:
      return {
        ...state,
        isCashflowAnalyticsLoading: true,
      };
    case GET_CASHFLOW_ANALYTICS_SUCCESS:
      return {
        ...state,
        isCashflowAnalyticsLoading: false,
        cashflowAnalytics: payload.analytics,
      };
    case GET_CASHFLOW_ANALYTICS_FAIL:
      return {
        ...state,
        isCashflowAnalyticsLoading: false,
        cashflowAnalyticsError: payload.error,
      };
    default:
      return state;
  }
}
