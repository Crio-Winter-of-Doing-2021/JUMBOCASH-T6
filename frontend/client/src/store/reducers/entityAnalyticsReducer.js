import {
  GET_ENTITY_ANALYTICS_LOADING,
  GET_ENTITY_ANALYTICS_SUCCESS,
  GET_ENTITY_ANALYTICS_FAIL
} from '../types';

const initialState = {
  entityAnalytics: null,
  isEntityAnalyticsLoading: false,
  entityAnalyticsError: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_ENTITY_ANALYTICS_LOADING:
      return {
        ...state,
        isEntityAnalyticsLoading: true,
      };
    case GET_ENTITY_ANALYTICS_SUCCESS:
      return {
        ...state,
        isEntityAnalyticsLoading: false,
        entityAnalytics: payload.analytics,
      };
    case GET_ENTITY_ANALYTICS_FAIL:
      return {
        ...state,
        isEntityAnalyticsLoading: false,
        entityAnalyticsError: payload.error,
      };
    default:
      return state;
  }
}
