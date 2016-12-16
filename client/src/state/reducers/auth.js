import { Map } from 'immutable';
import * as constants from '../constants';

const init = new Map({
  isAuthenticated: false,
});

export default (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.CHANGE_USERNAME: {
      const { username } = payload;
      return state
        .setIn(['username', 'value'], username)
        .setIn(['username', 'isValid'], Boolean(username.length))
        .setIn(['username', 'didTouch'], true);
    }

    case constants.CHANGE_PASSWORD: {
      const { password } = payload;
      return state
        .setIn(['password', 'value'], password)
        .setIn(['password', 'isValid'], Boolean(password.length))
        .setIn(['password', 'didTouch'], true);
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
        .set('isAuthenticated', true)
        .delete('username')
        .delete('password')
        .delete('error');
    }

    case constants.VERIFY_SUCCESS: {
      return state.set('isAuthenticated', true);
    }

    default:
      return state;
  }
};
