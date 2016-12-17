import fetch from 'isomorphic-fetch';
import { toJSON, handleError } from './utils';

const authEndpoint = process.env.NODE_ENV === 'production'
  ? 'https://server-zvggazfwuz.now.sh/auth'
  : 'http://localhost:5000/auth';

export const login = (username, password) => {
  const request = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  };

  return fetch(`${authEndpoint}/login`, request)
    .then(handleError)
    .then(toJSON);
};

export const verify = (token) => {
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token,
    }),
  };

  return fetch(`${authEndpoint}/verify`, request)
    .then(handleError)
    .then(toJSON);
};
