import React from 'react';
import { useNotifications } from '../../../context/NotificationContext';
import './NotificationSystem.css';

/**
 * NotificationItem component
 * Individual notification item
 */
const NotificationItem = ({ notification, onClose }) => {
  const { id, type, message, title } = notification;

  // Get icon based on notification type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className={`notification notification--${type}`}>
      <div className="notification__icon">
        {getIcon()}
      </div>
      <div className="notification__content">
        {title && <h4 className="notification__title">{title}</h4>}
        <p className="notification__message">{message}</p>
      </div>
      <button className="notification__close-btn" onClick={() => onClose(id)}>
        ×
      </button>
    </div>
  );
};

/**
 * NotificationSystem component
 * Displays notifications across the application
 */
const NotificationSystem = () => {
  const { notifications, removeNotification } = useNotifications();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={removeNotification}
        />
      ))}
    </div>
  );
};

export default NotificationSystem;
