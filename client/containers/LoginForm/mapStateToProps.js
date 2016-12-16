import { Map } from 'immutable';

export default (state) => {
  if (!Map.isMap(state.auth)) {
    // it seems that immutable objects that are sent over the server are turned
    // into plain objects without the Immutable API
    state.auth = new Map(); // eslint-disable-line
  }

  return {
    username: state.auth.getIn(['username', 'value']),
    isUsernameValid: state.auth.getIn(['username', 'isValid']),
    password: state.auth.getIn(['password', 'value']),
    isPasswordValid: state.auth.getIn(['password', 'isValid']),
    isLoading: state.auth.get('isLoading'),
    error: state.auth.get('error'),
  };
};
