import jwt from 'jsonwebtoken';

const secret = process.env.JWT_KEY;

export default token => new Promise((resolve, reject) => {
  if (!token) {
    return reject(new Error('Tried verifying a token, but the supplied token was undefined'));
  }

  return jwt.verify(token, secret, (err, decoded) => (
     err ? reject(err) : resolve(decoded)
  ));
});
