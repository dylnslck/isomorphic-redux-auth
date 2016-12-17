import test from 'ava';
import nock from 'nock';
import * as auth from '../src/services/auth';

const AUTH_URL = 'http://localhost:5000/auth';

nock(AUTH_URL)
  .post('/login')
  .reply(200, {
    user: true,
    token: true,
  });

nock(AUTH_URL)
  .post('/verify')
  .reply(200, {
    user: true,
    token: true,
  });

test('should login', async (t) => {
  const { user, token } = await auth.login('demo', 'password1');
  t.truthy(user);
  t.truthy(token);
});

test('should verify a token', async (t) => {
  const { user, token } = await auth.verify('eyJhbGciOiJIUzI1NiJ9.MQ.nMqFd6JpL7b687VlGDrzWT7a-Ju5TFNWeaTX3cPKw0g');
  t.truthy(user);
  t.truthy(token);
});
