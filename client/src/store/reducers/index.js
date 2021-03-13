import { combineReducers } from 'redux';

import authReducer from './authReducer';
import entityReducer from './entityReducer';
import transactionReducer from './transactionReducer';

export default combineReducers({
  auth: authReducer,
  entity: entityReducer,
  transaction: transactionReducer
});
