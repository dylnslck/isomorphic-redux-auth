import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

const App = ({ children }) => (
  <div id="app">
    <Helmet title="Login | Redux Auth" />
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.any, // eslint-disable-line
};

export default App;
