export default state => ({
  username: state.auth.getIn(['username', 'value']),
  isUsernameValid: state.auth.getIn(['username', 'isValid']),
  didTouchUsername: state.auth.getIn(['username', 'didTouch']),
  password: state.auth.getIn(['password', 'value']),
  isPasswordValid: state.auth.getIn(['password', 'isValid']),
  didTouchPassword: state.auth.getIn(['password', 'didTouch']),
  isLoading: state.auth.get('isLoading'),
  error: state.auth.get('error'),
});
