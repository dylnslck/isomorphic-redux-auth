import React from 'react';
import { connect } from 'react-redux';
import { LoginForm } from 'components';
import mapDispatchToProps from './mapDispatchToProps';
import mapStateToProps from './mapStateToProps';

const Login = ({ ...props }) => (
  <div className="wrapper">
    <div className="container">
      <LoginForm {...props} />
    </div>

    <style jsx>{`
      .wrapper {
        padding: 0 1rem;
        height: 100vh;
        background-image: linear-gradient(-151deg, #25528B 0%, #103C73 100%);
        overflow-y: auto;
      }

      .container {
        max-width: 240px;
        margin: 0 auto;
        margin-top: 3rem;
        background: white;
        border-radius: 0.2rem;
        box-shadow: 0 0 2rem rgba(0, 0, 0, 0.4);
        padding: 2rem;
      }
    `}</style>
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
