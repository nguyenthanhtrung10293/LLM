import { useState, useCallback } from 'react';
import { useNotifications } from '../context/NotificationContext';

/**
 * Custom hook for managing Interactive Brokers connection
 */
const useBrokerConnection = () => {
  const [connectionStatus, setConnectionStatus] = useState({
    isConnected: false,
    isLoading: false,
    error: null,
    clientId: null
  });
  
  const { success, error } = useNotifications();
  
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  
  /**
   * Connect to Interactive Brokers
   */
  const connect = useCallback(async () => {
    try {
      setConnectionStatus(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await fetch(`${API_URL}/connect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to connect to broker');
      }
      
      setConnectionStatus({
        isConnected: data.connected,
        isLoading: false,
        error: null,
        clientId: data.client_id
      });
      
      success('Successfully connected to Interactive Brokers');
      return data;
    } catch (err) {
      setConnectionStatus({
        isConnected: false,
        isLoading: false,
        error: err.message,
        clientId: null
      });
      
      error(`Connection error: ${err.message}`);
      return { connected: false, message: err.message };
    }
  }, [API_URL, success, error]);
  
  /**
   * Disconnect from Interactive Brokers
   */
  const disconnect = useCallback(async () => {
    try {
      setConnectionStatus(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await fetch(`${API_URL}/disconnect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to disconnect from broker');
      }
      
      setConnectionStatus({
        isConnected: false,
        isLoading: false,
        error: null,
        clientId: null
      });
      
      success('Successfully disconnected from Interactive Brokers');
      return data;
    } catch (err) {
      setConnectionStatus(prev => ({
        ...prev,
        isLoading: false,
        error: err.message
      }));
      
      error(`Disconnect error: ${err.message}`);
      return { connected: false, message: err.message };
    }
  }, [API_URL, success, error]);
  
  /**
   * Check connection status
   */
  const checkConnection = useCallback(async () => {
    try {
      setConnectionStatus(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await fetch(`${API_URL}/connection`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to check connection status');
      }
      
      setConnectionStatus({
        isConnected: data.connected,
        isLoading: false,
        error: null,
        clientId: data.client_id
      });
      
      return data;
    } catch (err) {
      setConnectionStatus(prev => ({
        ...prev,
        isLoading: false,
        error: err.message
      }));
      
      return { connected: false, message: err.message };
    }
  }, [API_URL]);
    /**
   * Place a trade with Interactive Brokers
   */
  const placeTrade = useCallback(async (tradeData) => {
    try {
      // Check if connected before placing trade
      if (!connectionStatus.isConnected) {
        error('Not connected to Interactive Brokers. Connect first.');
        return {
          success: false,
          message: 'Not connected to Interactive Brokers. Connect first.'
        };
      }
      
      // Format the request payload
      const payload = {
        symbol: tradeData.symbol,
        action: tradeData.action.toUpperCase(), // API expects uppercase
        quantity: parseFloat(tradeData.quantity),
        order_type: tradeData.orderType === 'market' ? 'MKT' : 'LMT',
        limit_price: tradeData.orderType === 'limit' ? parseFloat(tradeData.limitPrice) : null,
        exchange: "SMART",
        currency: "USD"
      };
      
      const response = await fetch(`${API_URL}/trading/trade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to place order');
      }
      
      success(`Order placed: ${data.message}`);
      return data;
    } catch (err) {
      error(`Trade error: ${err.message}`);
      return { 
        success: false, 
        message: err.message
      };
    }
  }, [API_URL, connectionStatus.isConnected, success, error]);
  
  return {
    connectionStatus,
    connect,
    disconnect,
    checkConnection,
    placeTrade
  };
};

export default useBrokerConnection;
