import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './router';
import db from './Database';

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors()); // TODO: configure CORS properly
app.use(router);

// "start" the database then bind the HTTP port
db().start().then(() => {
  console.log('Database started!'); // eslint-disable-line

  app.listen(port, () => {
    console.log(`App ready at port ${port}!`); // eslint-disable-line
  });
});
