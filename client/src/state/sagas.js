import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import * as auth from 'services/auth';
import * as api from 'services/api';
import * as actions from './actions';
import * as constants from './constants';

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

    yield put(actions.dataSuccess('user', { data: user }));
    yield put(actions.loginSuccess());
    browserHistory.push('/dashboard');
  } catch (err) {
    yield put(actions.loginError(err));
  }
}

export function* watchLoginRequest() {
  yield* takeEvery(constants.LOGIN_REQUEST, loginRequest);
}

function logout() {
  localStorage.removeItem('token');
  browserHistory.push('/');
}

export function* watchLogoutRequest() {
  yield* takeEvery(constants.LOGOUT, logout);
}

function* dataRequest(action) {
  const { type } = action.payload;

  try {
    const data = yield api.getData(type);
    yield put(actions.dataSuccess(type, data));
  } catch (err) {
    yield put(actions.dataError(type, err));
  }
}

export function* watchDataRequest() {
  yield* takeEvery(constants.DATA_REQUEST, dataRequest);
}

export default function* rootSaga() {
  yield [
    watchLoginRequest(),
    watchLogoutRequest(),
    watchDataRequest(),
  ];
}
