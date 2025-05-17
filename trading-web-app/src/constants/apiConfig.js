// API endpoints and configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.tradepro.com';

export const API_ENDPOINTS = {
  STOCKS: '/stocks',
  PORTFOLIO: '/portfolio',
  USER: '/user',
  MARKET: '/market',
  WATCHLIST: '/watchlist',
  ORDERS: '/orders',
  NEWS: '/news'
};

export const DEFAULT_REQUEST_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
};

// Polling intervals (in milliseconds)
export const POLLING_INTERVALS = {
  MARKET_DATA: 60000,  // 1 minute
  PORTFOLIO: 300000,   // 5 minutes
  WATCHLIST: 60000     // 1 minute
};
