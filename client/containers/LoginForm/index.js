import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import Button from '../../components/Button';
import ErrorCard from '../../components/ErrorCard';
import Input from '../../components/Input';

const LoginForm = ({
  username,
  password,
  submit,
  changeUsername,
  changePassword,
  isUsernameValid,
  isPasswordValid,
  isLoading,
  error,
}) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      submit(username, password);
    }}
  >
    <header>
      <img src="/static/user.svg" role="presentation" />
    </header>
    <fieldset>
      <label htmlFor="#login-username">Username</label>
      <Input
        id="login-username"
        type="text"
        placeholder="username"
        value={username}
        onChange={changeUsername}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="#login-password">Password</label>
      <Input
        id="login-password"
        type="password"
        placeholder="password"
        value={password}
        onChange={changePassword}
      />
    </fieldset>
    {error && (
      <fieldset>
        <ErrorCard message={error.message} />
      </fieldset>
    )}
    <fieldset>
      <Button block loading={isLoading} disabled={isLoading}>Log in</Button>
    </fieldset>

    <style jsx>{`
      header {
        text-align: center;
        margin-bottom: 2rem;
      }

      img {
        max-width: 50%;
        opacity: 0.2;
      }

      fieldset {
        border: 0;
        margin: 0;
        padding: 0;
      }

      label {
        display: block;
        margin-bottom: 0.25rem;
        font-size: 0.85rem;
        color: #868e96;
      }

      fieldset:not(:last-child) {
        margin-bottom: 0.5rem;
      }
    `}</style>
  </form>
);

LoginForm.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  submit: PropTypes.func,
  changeUsername: PropTypes.func,
  changePassword: PropTypes.func,
  isUsernameValid: PropTypes.bool,
  isPasswordValid: PropTypes.bool,
  isLoading: PropTypes.bool,
};

LoginForm.defaultProps = {
  username: '',
  password: '',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);
