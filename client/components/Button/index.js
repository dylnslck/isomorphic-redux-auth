import React, { PropTypes } from 'react';
import cx from 'classnames';

const Button = ({ children, block, disabled, loading, ...props }) => (
  <div>
    <button
      {...props}
      className={cx(
        'is-block': block,
        'is-disabled': disabled,
        'is-loading': loading,
      )}
    >
      {loading ? 'Loading...' : children}
    </button>

    <style jsx>{`
      button {
        outline: 0;
        border: 0;
        padding: 0.5rem 0.75rem;
        color: white;
        background: #ff6b6b;
        cursor: pointer;
      }

      button:hover {
        background: #ff8787;
      }

      .is-block {
        display: block;
        width: 100%;
      }
    `}</style>
  </div>
);

Button.propTypes = {
  children: PropTypes.any, // eslint-disable-line
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  block: false,
  disabled: false,
  loading: false,
};

export default Button;
