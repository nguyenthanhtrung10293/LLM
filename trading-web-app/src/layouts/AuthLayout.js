import React from 'react';
import './AuthLayout.css';

/**
 * AuthLayout component for authentication pages like login, signup, forgot password
 */
const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-sidebar">
        <div className="auth-logo">
          <h1>TradePro</h1>
          <p className="slogan">Smart trading for smart investors</p>
        </div>
        <div className="auth-features">
          <h3>Why Choose TradePro?</h3>
          <ul>
            <li>
              <span className="feature-icon">📈</span>
              <span>Real-time market data</span>
            </li>
            <li>
              <span className="feature-icon">💰</span>
              <span>Commission-free trading</span>
            </li>
            <li>
              <span className="feature-icon">📊</span>
              <span>Advanced chart analysis</span>
            </li>
            <li>
              <span className="feature-icon">🔒</span>
              <span>Bank-level security</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="auth-content">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
