import React, { PropTypes } from 'react';

const renderErrorFeedback = () => (
  <div className="feedback feedback-error">
    bad
  </div>
);

const renderSuccessFeedback = () => (
  <div className="feedback feedback-success">
    good
  </div>
);

const Input = ({ error, success, ...props }) => (
  <div className="root">
    <input className="input" {...props} />

    {error && renderErrorFeedback()}
    {success && renderSuccessFeedback()}

    <style jsx>{`
      .root {
        position: relative;
      }

      input {
        display: block;
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #dee2e6;
        outline: 0;
        margin: 0;
        padding: 0.5rem 0.75rem;
      }

      input:focus {
        border: 1px solid #adb5bd;
      }

      .feedback {
        position: absolute;
      }
    `}</style>
  </div>
);

Input.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
};

Input.defaultProps = {
  error: false,
  success: false,
};

export default Input;
