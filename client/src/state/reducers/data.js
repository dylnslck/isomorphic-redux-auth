import { Map } from 'immutable';
import * as constants from '../constants';

export default (state = new Map(), action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.DATA_REQUEST: {
      const { type: dataType } = payload;
      return state.setIn([dataType, 'isLoading'], true);
    }

    case constants.DATA_SUCCESS: {
      const { type: dataType, data: { data } } = payload;
      return state
        .setIn([dataType, 'isLoading'], false)
        .setIn([dataType, 'data'], data);
    }

    case constants.DATA_ERROR: {
      const { type: dataType, err } = payload;
      return state
        .set([dataType, 'isLoading'], false)
        .set([dataType, 'error'], err);
    }

    default:
      return state;
  }
};
