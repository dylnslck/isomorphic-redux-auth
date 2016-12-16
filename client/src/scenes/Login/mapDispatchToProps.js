import * as actions from '../../state/actions';

export default dispatch => ({
  changeUsername: e => dispatch(actions.changeUsername(e.target.value)),
  changePassword: e => dispatch(actions.changePassword(e.target.value)),
  submit: (username, password) =>
    dispatch(actions.loginRequest(username, password)),
});
