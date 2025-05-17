import React from 'react';
import './LoadingSpinner.css';

/**
 * LoadingSpinner component
 * Displays a spinning animation while content is loading
 * @param {Object} props
 * @param {string} [props.size='medium'] - Size of the spinner ('small', 'medium', 'large')
 * @param {string} [props.message] - Optional loading message to display
 */
const LoadingSpinner = ({ size = 'medium', message }) => {
  return (
    <div className="loading-container">
      <div className={`loading-spinner loading-spinner--${size}`}>
        <div className="loading-spinner__circle"></div>
      </div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
