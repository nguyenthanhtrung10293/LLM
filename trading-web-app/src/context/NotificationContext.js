import React, { createContext, useState, useEffect, useContext } from 'react';

// Create context
export const NotificationContext = createContext();

/**
 * Notification Context Provider
 * Manages global notification state across the application
 */
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  
  // Remove a notification by ID
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };
  
  // Add a new notification
  const addNotification = (notification) => {
    const id = Date.now();
    const newNotification = {
      id,
      duration: 5000, // Default duration
      ...notification,
    };
    
    setNotifications((prev) => [...prev, newNotification]);
    
    // Auto remove after duration if not persistent
    if (!notification.isPersistent) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }
    
    return id;
  };
  
  // Notification shorthand methods
  const success = (message, options = {}) => {
    return addNotification({ type: 'success', message, ...options });
  };
  
  const error = (message, options = {}) => {
    return addNotification({ type: 'error', message, ...options });
  };
  
  const info = (message, options = {}) => {
    return addNotification({ type: 'info', message, ...options });
  };
  
  const warning = (message, options = {}) => {
    return addNotification({ type: 'warning', message, ...options });
  };
  
  const value = {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    info,
    warning
  };
  
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the NotificationContext
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
