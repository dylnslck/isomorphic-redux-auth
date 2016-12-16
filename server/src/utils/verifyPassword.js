import bcrypt from 'bcrypt';

/**
 * Verifies that a supplied plaintext password matches a hashed password.
 *
 * @param {String} plaintextPassword - Plain text password.
 * @param {String} hashedPassword - Hashed password (from db).
 * @return {Promise<Boolean>}
 */
export default (plaintextPassword, hashedPassword) => {
  if (!plaintextPassword) {
    throw new TypeError('Password is required');
  }

  if (!hashedPassword) {
    throw new TypeError('Hashed password is required');
  }

  return new Promise((resolve, reject) => (
    bcrypt.compare(plaintextPassword, hashedPassword, (err, isMatch) => {
      // a really bad, internal error has happened
      if (err) return reject(err);

      // incorrect password
      if (!isMatch) return reject(new Error('Incorrect password'));

      // success
      return resolve(isMatch);
    })
  ));
};
