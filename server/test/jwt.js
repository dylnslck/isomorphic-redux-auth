import test from 'ava'; // eslint-disable-line
import createToken from '../src/utils/createToken';
import verifyToken from '../src/utils/verifyToken';

test('should successfully create a signed token', async (t) => {
  const signedToken = await createToken('test');
  const verifiedToken = await verifyToken(signedToken);
  t.is(verifiedToken, 'test');
});
