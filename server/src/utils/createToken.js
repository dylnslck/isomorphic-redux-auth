import jwt from 'jsonwebtoken';
import secret from './jwtSecret';

const ALGORITHM = 'HS256';

/**
 * Creates and signs a JWT token.
 *
 * @param {String} data - The data that is to be signed.
 * @return {Function}
 */
export default data => new Promise((resolve, reject) => {
  if (!data) {
    return reject(new Error('Tried creating a token, but the data to be signed was undefined'));
  }

  return jwt.sign(data, secret, { algorithm: ALGORITHM }, (err, token) => (
    err ? reject(err) : resolve(token)
  ));
});
