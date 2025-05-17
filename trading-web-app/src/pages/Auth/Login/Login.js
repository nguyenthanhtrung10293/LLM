import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import { useNotifications } from '../../../context/NotificationContext';
import LoadingSpinner from '../../../components/UI/LoadingSpinner/LoadingSpinner';
import ErrorDisplay from '../../../components/UI/ErrorDisplay/ErrorDisplay';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  
  const { login, loading, error } = useAuthContext();
  const { success } = useNotifications();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    
    // Basic validation
    if (!email.trim()) {
      setFormError('Email is required');
      return;
    }
    
    if (!password.trim()) {
      setFormError('Password is required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const result = await login(email, password);
      
      if (result) {
        success('Login successful! Welcome back.');
        navigate('/');
      }
    } catch (err) {
      setFormError(err.message || 'Failed to login');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="login-page">
      <div className="login-form-container">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to access your account</p>
        
        {loading && !isSubmitting && <LoadingSpinner message="Loading authentication service..." />}
        
        {error && !formError && <ErrorDisplay message={error} type="warning" />}
        
        {formError && <ErrorDisplay message={formError} type="standard" />}
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="form-actions">
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot password?
            </Link>
            
            <button
              type="submit"
              className="login-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoadingSpinner size="small" /> : 'Sign In'}
            </button>
          </div>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <Link to="/register">Create one</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
