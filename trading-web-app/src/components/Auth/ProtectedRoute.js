import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';

/**
 * ProtectedRoute component
 * Redirects to login page if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthContext();
  const location = useLocation();
  
  // Show loading spinner while checking authentication status
  if (loading) {
    return (
      <div className="protected-route-loading">
        <LoadingSpinner message="Verifying your session..." />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    // Redirect to login page, but save the current location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // User is authenticated, render the protected content
  return children;
};

export default ProtectedRoute;
