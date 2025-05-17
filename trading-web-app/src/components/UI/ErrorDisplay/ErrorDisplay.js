import React from 'react';
import './ErrorDisplay.css';

/**
 * ErrorDisplay component
 * Displays error messages with optional retry functionality
 * @param {Object} props
 * @param {string} props.message - The error message to display
 * @param {Function} [props.onRetry] - Optional retry function
 * @param {string} [props.type='standard'] - Type of error ('standard', 'warning', 'fatal')
 */
const ErrorDisplay = ({ message, onRetry, type = 'standard' }) => {
  return (
    <div className={`error-display error-display--${type}`}>
      <div className="error-display__icon">
        {type === 'warning' ? '⚠️' : '❌'}
      </div>
      <div className="error-display__content">
        <h3 className="error-display__title">
          {type === 'fatal' ? 'Critical Error' : type === 'warning' ? 'Warning' : 'Error'}
        </h3>
        <p className="error-display__message">{message}</p>
        {onRetry && (
          <button className="error-display__retry-btn" onClick={onRetry}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;
