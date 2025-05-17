import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginUser, registerUser, fetchUserProfile } from '../services/mockApiService';

// Create context
export const AuthContext = createContext();

/**
 * Authentication Context Provider
 * Manages user authentication state across the application
 */
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing auth token on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          setLoading(true);
          // Validate token and fetch user profile
          const userData = await fetchUserProfile(token);
          setCurrentUser(userData);
          setIsAuthenticated(true);
          setError(null);
        } catch (err) {
          console.error('Error validating auth token:', err);
          // Clear invalid token
          localStorage.removeItem('authToken');
          setCurrentUser(null);
          setIsAuthenticated(false);
          setError('Your session has expired. Please login again.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await loginUser(email, password);
      
      // Save auth token
      localStorage.setItem('authToken', result.token);
      
      setCurrentUser(result.user);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login. Please check your credentials and try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await registerUser(name, email, password);
      
      // Save auth token
      localStorage.setItem('authToken', result.token);
      
      setCurrentUser(result.user);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to register. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    currentUser,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
