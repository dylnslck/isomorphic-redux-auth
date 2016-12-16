import jwt from 'jsonwebtoken';
import secret from './jwtSecret';

export default token => new Promise((resolve, reject) => {
  if (!token) {
    return reject(new Error('Tried verifying a token, but the supplied token was undefined'));
  }

  return jwt.verify(token, secret, (err, decoded) => (
     err ? reject(err) : resolve(decoded)
  ));
});
