import fetch from 'isomorphic-fetch';

const toJSON = res => res.json();

const authEndpoint = process.env.NODE_ENV === 'production'
  ? 'https://TODO.com/auth'
  : 'http://localhost:5000/auth';

const handleError = (res) => {
  if (res.status >= 400) {
    return res.text().then((text) => {
      throw new Error(text);
    });
  }

  return res;
};

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
    .then(handleError);
};
