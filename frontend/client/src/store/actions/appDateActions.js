import { DATE_CHANGE } from '../types';

export const updateDate = (interval) => (dispatch, getState) => {
  const [from,to] = interval;
  if(from && to){
    dispatch({
        type: DATE_CHANGE,
        payload: { from, to },
    });
  }
};
