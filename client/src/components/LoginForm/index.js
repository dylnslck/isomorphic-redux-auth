import React, { PropTypes } from 'react';
import { Button, ErrorCard, Input } from 'components';

const LoginForm = ({
  username,
  password,
  submit,
  changeUsername,
  changePassword,
  isUsernameValid,
  isPasswordValid,
  didTouchUsername,
  didTouchPassword,
  isLoading,
  error,
}) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      if (!isLoading) submit(username, password);
    }}
  >
    <header>
      <img src="/static/user.svg" role="presentation" />
    </header>
    <fieldset>
      <label htmlFor="#login-username">Username*</label>
      <Input
        id="login-username"
        type="text"
        placeholder="username"
        value={username}
        onChange={changeUsername}
        success={didTouchUsername && isUsernameValid}
        error={didTouchUsername && !isUsernameValid}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="#login-password">Password*</label>
      <Input
        id="login-password"
        type="password"
        placeholder="password"
        value={password}
        onChange={changePassword}
        success={didTouchPassword && isPasswordValid}
        error={didTouchPassword && !isPasswordValid}
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
  didTouchUsername: PropTypes.bool,
  didTouchPassword: PropTypes.bool,
  isLoading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

LoginForm.defaultProps = {
  username: '',
  password: '',
  didTouchUsername: false,
  didTouchPassword: false,
};

export default LoginForm;
