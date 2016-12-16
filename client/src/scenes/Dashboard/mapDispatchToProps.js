import * as actions from 'state/actions';

export default dispatch => ({
  getServerTime: () => dispatch(actions.dataRequest('time')),
  getServerVersion: () => dispatch(actions.dataRequest('version')),
  getServerPath: () => dispatch(actions.dataRequest('path')),
  logout: () => dispatch(actions.logout()),
});
