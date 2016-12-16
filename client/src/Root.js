import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from 'state/store';
import routes from 'routes';

const store = configureStore();

export default () => (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
);
