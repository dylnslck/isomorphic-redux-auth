import Promise from 'bluebird';
import { createToken, verifyPassword, verifyToken } from './utils';

/**
 * Seed data that mirrors a typical (K, V) store.
 */
const fakeDatabase = {
  users: {
    1: {
      id: '1',
      name: 'John Doe',
      username: 'demo',
      email: 'johndoe@gmail.com',

      // encrypted "password1" using bcrypt
      password: '$2a$10$g34Cxz6O1MOJkXWl1/BXM.CATmnmhHUXnBxjBeTeOga9tgR/RwKFS',
    },
  },
};

/**
 * Pretend database service.
 */
class Database {
  constructor() {
    this.data = fakeDatabase;
  }

  /**
   * Retrieves all users.
   */
  getAllUsers() {
    const { users } = this.data;
    const allUsers = Object.keys(users).map(id => users[id]);

    // simulate network latency
    return new Promise(resolve => setTimeout(() => resolve(allUsers), 200));
  }

  /**
   * Retrieves a user object from the db whose id is "id".
   *
   * @param {String} id
   */
  getUser(id) {
    // simulate network latency
    return new Promise(resolve => setTimeout(() => resolve(this.data.users[id]), 200));
  }

  /**
   * Retrieves a user object from the db whose username is "username".
   *
   * @param {String} username
   * @return {Object}
   */
  getUserByUsername(username) {
    const { users } = this.data;
    let foundUser;

    Object.keys(users).forEach((id) => {
      // found the user, break out of the search
      if (users[id].username === username) {
        foundUser = users[id];
        return false;
      }

      // keep searching
      return true;
    });

    // simulate network latency
    return new Promise(resolve => setTimeout(() => resolve(foundUser), 200));
  }

  /**
   * Checks a password against the hashed password of a user with "username".
   *
   * ```js
   * try {
   *   const { user, token } = await login('demo', 'password2');
   * } catch (err) {
   *   console.error(err.message); // Incorrect password
   * }
   * ```
   *
   * @param {String} username
   * @param {String} password
   * @return {Object}
   */
  login(username, password) {
    return this.getUserByUsername(username)
      .then((user) => {
        if (!user) {
          return Promise.reject(new Error(
            `Tried to log in a user with the username ${username}, but such user was found`,
          ));
        }

        return Promise.props({
          isVerified: verifyPassword(password, user.password),
          user,
        });
      })
      .then(({ user }) => Promise.props({
        token: createToken(user.id),
        user,
      }));
  }

  /**
   * Verifies that a token hasn't been tampered with and returns the corresponding user.
   *
   * @param {String}
   * @return {Object}
   */
  verify(token) {
    return verifyToken(token)
      .then(id => Promise.props({
        user: this.getUser(id),
        token,
      }));
  }
}

/**
 * Export a database singleton.
 */
export default function database() {
  if (database.instance) return database.instance;

  return {
    start() {
      // simulate network latency
      return new Promise((resolve) => {
        database.instance = new Database();
        setTimeout(resolve, 200);
      });
    },
  };
}
