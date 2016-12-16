import * as constants from './constants';

export const changeUsername = username => ({
  type: constants.CHANGE_USERNAME,
  payload: {
    username,
  },
});

export const changePassword = password => ({
  type: constants.CHANGE_PASSWORD,
  payload: {
    password,
  },
});

export const loginRequest = (username, password) => ({
  type: constants.LOGIN_REQUEST,
  payload: {
    username,
    password,
  },
});

export const loginError = err => ({
  type: constants.LOGIN_ERROR,
  error: true,
  payload: err,
});

export const loginSuccess = () => ({
  type: constants.LOGIN_SUCCESS,
});
