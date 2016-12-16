import test from 'ava'; // eslint-disable-line
import db from '../src/Database';

test.before(async (t) => {
  await db().start().then(() => {
    t.truthy(db().data, 'data was seeded correctly');
  });
});

test('should get all users', async (t) => {
  const users = await db().getAllUsers();

  t.truthy(users[0], 'first user was found');
  t.truthy(users[1], 'second user was found');
});

test('should get a single user', async (t) => {
  t.truthy(await db().getUser('1')); // single user was found
  t.is(await db().getUser('invalid'), undefined); // invalid id should return undefined
});

test('should get the user with username "demo"', async (t) => {
  t.truthy(await db().getUserByUsername('demo')); // demo was found
  t.is(await db().getUserByUsername('invalid'), undefined); // demo was found
});

test('should successfully login', async (t) => {
  try {
    const { user, token } = await db().login('demo', 'password1');
    t.truthy(user);
    t.truthy(token);
  } catch (err) {
    t.fail(err.message);
  }
});

test('should successfully verify a token', async (t) => {
  try {
    const token = 'eyJhbGciOiJIUzI1NiJ9.MQ.nMqFd6JpL7b687VlGDrzWT7a-Ju5TFNWeaTX3cPKw0g';
    const { user, token: verifiedToken } = await db().verify(token);
    t.is(user.id, '1');
    t.is(token, verifiedToken);
  } catch (err) {
    t.fail(err.message);
  }
});
