import { DATE_CHANGE } from '../types';
import * as moment from 'moment';

const now = moment();

const initialState = {
  from:new Date(now.subtract(1, 'years')),
  to:new Date()
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case DATE_CHANGE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
