import fetch from 'isomorphic-fetch';
import { toJSON, handleError } from './utils';

const apiEndpoint = process.env.NODE_ENV === 'production'
  ? 'https://server-zvggazfwuz.now.sh/api'
  : 'http://localhost:5000/api';

export const getData = (type) => {
  const request = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return fetch(`${apiEndpoint}/${type}`, request)
    .then(handleError)
    .then(toJSON);
};
