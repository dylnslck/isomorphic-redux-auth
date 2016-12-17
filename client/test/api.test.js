import test from 'ava';
import nock from 'nock';
import * as api from '../src/services/api';

const API_URL = 'http://localhost:5000/api';

nock(API_URL)
  .get('/time')
  .reply(200, {
    data: '03-19-1993',
  });

nock(API_URL)
  .get('/version')
  .reply(200, {
    data: 'v6.9.1',
  });

nock(API_URL)
  .get('/path')
  .reply(200, {
    data: '/some/path',
  });

test('should get the server time', async (t) => {
  const { data } = await api.getData('time');
  t.is(data, '03-19-1993');
});

test('should get the server version', async (t) => {
  const { data } = await api.getData('version');
  t.is(data, 'v6.9.1');
});

test('should get the server path', async (t) => {
  const { data } = await api.getData('path');
  t.is(data, '/some/path');
});
