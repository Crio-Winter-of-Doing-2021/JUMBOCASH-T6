import {
  GET_TRENDS_LOADING,
  GET_TRENDS_SUCCESS,
  GET_TRENDS_FAIL,
} from '../types';

const initialState = {
  trends: null,
  isTrendsLoading: false,
  trendsError: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_TRENDS_LOADING:
      return {
        ...state,
        isTrendsLoading: true,
      };
    case GET_TRENDS_SUCCESS:
      return {
        ...state,
        isTrendsLoading: false,
        trends: payload.analytics,
      };
    case GET_TRENDS_FAIL:
      return {
        ...state,
        isTrendsLoading: false,
        trendsError: payload.error,
      };
    default:
      return state;
  }
}
