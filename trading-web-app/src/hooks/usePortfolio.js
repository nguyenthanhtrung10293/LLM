import { useState, useEffect } from 'react';
import mockApiService from '../services/mockApiService';

/**
 * Custom hook to fetch and manage portfolio data
 * 
 * @returns {Object} - Portfolio data, loading state, and error state
 */
const usePortfolio = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const data = await mockApiService.getPortfolioData();
        setPortfolioData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setPortfolioData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  // Function to refresh portfolio data
  const refreshPortfolio = async () => {
    setLoading(true);
    try {
      const data = await mockApiService.getPortfolioData();
      setPortfolioData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to simulate buying a stock
  const buyStock = async (symbol, quantity, price) => {
    try {
      await mockApiService.placeOrder({
        symbol,
        action: 'buy',
        quantity,
        price,
        orderType: 'market',
        timestamp: new Date().toISOString()
      });
      return refreshPortfolio();
    } catch (err) {
      setError(err.message);
      return Promise.reject(err);
    }
  };

  // Function to simulate selling a stock
  const sellStock = async (symbol, quantity, price) => {
    try {
      await mockApiService.placeOrder({
        symbol,
        action: 'sell',
        quantity,
        price,
        orderType: 'market',
        timestamp: new Date().toISOString()
      });
      return refreshPortfolio();
    } catch (err) {
      setError(err.message);
      return Promise.reject(err);
    }
  };

  return {
    portfolioData,
    loading,
    error,
    refreshPortfolio,
    buyStock,
    sellStock
  };
};

export default usePortfolio;
