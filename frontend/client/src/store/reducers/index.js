import { combineReducers } from 'redux';

import authReducer from './authReducer';
import entityReducer from './entityReducer';
import transactionReducer from './transactionReducer';
import analyticsReducer from './analyticsReducer';
import entityAnalyticsReducer from './entityAnalyticsReducer';
import cashflowAnalyticsReducer from './cashflowAnalyticsReducer';
import appDateReducer from './appDateReducer';

export default combineReducers({
  auth: authReducer,
  entity: entityReducer,
  transaction: transactionReducer,
  analytics: analyticsReducer,
  entityAnalytics: entityAnalyticsReducer,
  cashflowAnalytics: cashflowAnalyticsReducer,
  appDate: appDateReducer
});
