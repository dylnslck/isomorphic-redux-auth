import * as auth from 'services/auth';
import * as actions from 'state/actions';

export default store => (nextState, replace, cb) => {
  const state = store.getState();
  const isAuthenticated = state.auth.get('isAuthenticated');
  const token = localStorage.token;
  const done = () => cb();

  if (isAuthenticated) return done();
  if (!token) return done();

  const authenticate = ({ user }) => {
    store.dispatch(actions.verifySuccess());
    store.dispatch(actions.dataSuccess('user', { data: user }));
    return done();
  };

  return auth.verify(token)
    .then(authenticate)
    .catch(done);
};
