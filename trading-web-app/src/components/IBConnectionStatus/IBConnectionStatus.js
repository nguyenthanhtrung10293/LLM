import React, { useEffect } from 'react';
import useBrokerConnection from '../../hooks/useBrokerConnection';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';
import ErrorDisplay from '../UI/ErrorDisplay/ErrorDisplay';
import './IBConnectionStatus.css';

/**
 * Component to display and manage Interactive Brokers connection status
 */
const IBConnectionStatus = () => {
  const { connectionStatus, connect, disconnect, checkConnection } = useBrokerConnection();
  const { isConnected, isLoading, error, clientId } = connectionStatus;
  
  // Check connection status on component mount
  useEffect(() => {
    checkConnection();
  }, [checkConnection]);
  
  return (
    <div className="ib-connection-status">
      <h2 className="ib-connection-title">Interactive Brokers Connection</h2>
      
      {isLoading && (
        <LoadingSpinner size="small" message="Processing connection..." />
      )}
      
      {error && !isLoading && (
        <ErrorDisplay 
          message={error} 
          type="warning" 
          onRetry={isConnected ? null : connect}
        />
      )}
      
      <div className="ib-connection-info">
        <div className="ib-status">
          Status: 
          <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        
        {isConnected && clientId && (
          <div className="ib-client-id">
            Client ID: <span>{clientId}</span>
          </div>
        )}
      </div>
      
      <div className="ib-connection-actions">
        <button 
          className="connect-button"
          onClick={connect}
          disabled={isConnected || isLoading}
        >
          Connect
        </button>
        
        <button 
          className="disconnect-button"
          onClick={disconnect}
          disabled={!isConnected || isLoading}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
};

export default IBConnectionStatus;
