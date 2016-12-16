export default state => ({
  time: state.data.getIn(['time', 'data']),
  isTimeLoading: state.data.getIn(['time', 'isLoading']),
  timeError: state.data.getIn(['time', 'error']),
  version: state.data.getIn(['version', 'data']),
  isVersionLoading: state.data.getIn(['version', 'isLoading']),
  versionError: state.data.getIn(['version', 'error']),
  path: state.data.getIn(['path', 'data']),
  isPathLoading: state.data.getIn(['path', 'isLoading']),
  pathError: state.data.getIn(['path', 'error']),
  user: state.data.getIn(['user', 'data']),
});
