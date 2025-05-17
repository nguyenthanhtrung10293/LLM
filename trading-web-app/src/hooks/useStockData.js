import { useState, useEffect } from 'react';
import mockApiService from '../services/mockApiService';

/**
 * Custom hook to fetch and manage stock details data
 * 
 * @param {string} symbol - Stock symbol (e.g., 'AAPL', 'MSFT')
 * @returns {Object} - Stock data, loading state, and error state
 */
const useStockData = (symbol) => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Don't fetch if no symbol is provided
    if (!symbol) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await mockApiService.getStockDetails(symbol);
        setStockData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setStockData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  return { stockData, loading, error };
};

export default useStockData;
