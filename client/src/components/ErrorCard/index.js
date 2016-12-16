import React, { PropTypes } from 'react';

const ErrorCard = ({ message }) => (
  <div>
    <span>{message}</span>

    <style jsx>{`
      div {
        background: #fa5252;
        color: white;
        padding: 1rem;
        text-align: center;
      }
    `}</style>
  </div>
);

ErrorCard.propTypes = {
  message: PropTypes.string,
};

ErrorCard.defaultProps = {
  message: 'There was an error',
};

export default ErrorCard;
