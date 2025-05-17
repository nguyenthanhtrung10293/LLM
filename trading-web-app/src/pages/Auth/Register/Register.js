import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import { useNotifications } from '../../../context/NotificationContext';
import LoadingSpinner from '../../../components/UI/LoadingSpinner/LoadingSpinner';
import ErrorDisplay from '../../../components/UI/ErrorDisplay/ErrorDisplay';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  
  const { register, loading, error } = useAuthContext();
  const { success } = useNotifications();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    
    // Basic validation
    if (!name.trim()) {
      setFormError('Name is required');
      return;
    }
    
    if (!email.trim()) {
      setFormError('Email is required');
      return;
    }
    
    if (!password.trim()) {
      setFormError('Password is required');
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const result = await register(name, email, password);
      
      if (result) {
        success('Registration successful! Welcome to TradePro.');
        navigate('/');
      }
    } catch (err) {
      setFormError(err.message || 'Failed to register');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="register-page">
      <div className="register-form-container">
        <h1 className="register-title">Create Account</h1>
        <p className="register-subtitle">Join TradePro for smart investment tracking</p>
        
        {loading && !isSubmitting && <LoadingSpinner message="Loading registration service..." />}
        
        {error && !formError && <ErrorDisplay message={error} type="warning" />}
        
        {formError && <ErrorDisplay message={formError} type="standard" />}
        
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              disabled={isSubmitting}
              required
            />
          </div>
          
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
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="form-actions">
            <button
              type="submit"
              className="register-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoadingSpinner size="small" /> : 'Create Account'}
            </button>
          </div>
        </form>
        
        <div className="register-footer">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
        
        <div className="terms-agreement">
          By creating an account, you agree to our 
          <Link to="/terms"> Terms of Service</Link> and 
          <Link to="/privacy"> Privacy Policy</Link>.
        </div>
      </div>
    </div>
  );
};

export default Register;
