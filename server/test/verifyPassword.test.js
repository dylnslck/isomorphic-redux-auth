import test from 'ava'; // eslint-disable-line
import verifyPassword from '../src/utils/verifyPassword';

test('should successfully verify a password', async (t) => {
  const signedToken = await verifyPassword('password1', '$2a$10$g34Cxz6O1MOJkXWl1/BXM.CATmnmhHUXnBxjBeTeOga9tgR/RwKFS');
  t.truthy(signedToken);
});
