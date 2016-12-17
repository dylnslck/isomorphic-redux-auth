import express from 'express';
import moment from 'moment';
import path from 'path';
import db from './Database';

const router = express.Router();

// log user interactions
router.all('*', (req, res, next) => {
  console.log(req.method, req.url); // eslint-disable-line
  next();
});

// get all users
router.get('/api/users', async (req, res) => {
  const users = await db().getAllUsers();

  res.json({
    data: users,
  });
});

// get a single user
router.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await db().getUser(id);

  res.json({
    data: user,
  });
});

// get the Node version
router.get('/api/version', (req, res) => {
  res.json({
    data: process.version,
  });
});

// get the current server time
router.get('/api/time', (req, res) => {
  res.json({
    data: moment().format('MM/DD/YY h:mm:ss a'),
  });
});

// get app's path
router.get('/api/path', (req, res) => {
  res.json({
    data: path.resolve(__dirname),
  });
});

// auth login route
router.post('/auth/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const userAndToken = await db().login(username, password);
    res.json(userAndToken);
  } catch (err) {
    next(err);
    res.status(401).send('Invalid username/password combination');
  }
});

// auth token verification route
router.post('/auth/verify', async (req, res, next) => {
  const { token } = req.body;

  try {
    const userAndToken = await db().verify(token);
    res.json(userAndToken);
  } catch (err) {
    next(err);
    res.status(401).send('Invalid token');
  }
});

// log errors
router.all('*', (err, req, res, next) => {
  console.log('ERROR', err.message); // eslint-disable-line
  next();
});

export default router;
