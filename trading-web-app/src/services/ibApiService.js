// src/services/ibApiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Connect to Interactive Brokers
export const connectToIB = async () => {
  const response = await axios.post(`${API_BASE_URL}/connect`);
  return response.data;
};

// Place a trade (market or limit)
export const placeTrade = async ({ symbol, quantity, orderType, limitPrice }) => {
  const payload = {
    symbol,
    quantity,
    order_type: orderType, // 'market' or 'limit'
    limit_price: orderType === 'limit' ? limitPrice : undefined
  };
  const response = await axios.post(`${API_BASE_URL}/trade`, payload);
  return response.data;
};

// Fetch all current positions (portfolio)
export const fetchPortfolio = async () => {
  const response = await axios.get(`${API_BASE_URL}/portfolio`);
  return response.data;
};

export default {
  connectToIB,
  placeTrade,
  fetchPortfolio
};
