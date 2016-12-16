import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import * as actions from './actions';
import * as constants from './constants';
import * as auth from '../services/auth';

function* loginRequest(action) {
  const { username, password } = action.payload;

  try {
    if (!username) {
      throw new Error('Please provide a username');
    }

    if (!password) {
      throw new Error('Please provide a password');
    }

    const { user, token } = yield auth.login(username, password);

    localStorage.setItem('token', token);
    localStorage.setItem('id', user.id);

    yield put(actions.loginSuccess());
  } catch (err) {
    yield put(actions.loginError(err));
  }
}

export function* watchLoginRequest() {
  yield* takeEvery(constants.LOGIN_REQUEST, loginRequest);
}

function logoutRequest() {
  localStorage.removeItem('token');
}

export function* watchLogoutRequest() {
  yield* takeEvery(constants.LOGOUT_REQUEST, logoutRequest);
}

export default function* rootSaga() {
  yield [
    watchLoginRequest(),
    watchLogoutRequest(),
  ];
}
