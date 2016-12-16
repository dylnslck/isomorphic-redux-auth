import { Map } from 'immutable';
import * as constants from '../constants';

export default (state = new Map(), action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.CHANGE_USERNAME: {
      const { username } = payload;
      return state
        .setIn(['username', 'value'], username)
        .setIn(['username', 'isValid'], Boolean(username.length));
    }

    case constants.CHANGE_PASSWORD: {
      const { password } = payload;
      return state
        .setIn(['password', 'value'], password)
        .setIn(['password', 'isValid'], Boolean(password.length));
    }

    case constants.LOGIN_REQUEST: {
      return state
        .set('isLoading', true)
        .delete('error');
    }

    case constants.LOGIN_ERROR: {
      return state
        .set('isLoading', false)
        .set('error', payload);
    }

    case constants.LOGIN_SUCCESS: {
      return state
        .set('isLoading', false)
        .delete('error');
    }

    default:
      return state;
  }
};
