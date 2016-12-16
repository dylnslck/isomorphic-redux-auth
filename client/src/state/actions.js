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

export const logout = () => ({
  type: constants.LOGOUT,
});

export const verifySuccess = () => ({
  type: constants.VERIFY_SUCCESS,
});

export const dataRequest = type => ({
  type: constants.DATA_REQUEST,
  payload: {
    type,
  },
});

export const dataError = (type, err) => ({
  type: constants.DATA_ERROR,
  payload: {
    type,
    err,
  },
  error: true,
});

export const dataSuccess = (type, data) => ({
  type: constants.DATA_SUCCESS,
  payload: {
    type,
    data,
  },
});
