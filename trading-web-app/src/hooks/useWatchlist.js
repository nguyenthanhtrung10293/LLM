import { useState, useEffect } from 'react';
import mockApiService from '../services/mockApiService';
import { POLLING_INTERVALS } from '../constants/apiConfig';

/**
 * Custom hook to fetch and manage watchlist data with auto-refresh
 * 
 * @param {boolean} autoRefresh - Whether to automatically refresh data periodically
 * @returns {Object} - Watchlist data, loading state, error state, and management functions
 */
const useWatchlist = (autoRefresh = true) => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch watchlist data
  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      const data = await mockApiService.getWatchlistData();
      setWatchlist(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchWatchlist();
  }, []);

  // Set up auto-refresh interval if enabled
  useEffect(() => {
    if (!autoRefresh) return;

    const intervalId = setInterval(() => {
      fetchWatchlist();
    }, POLLING_INTERVALS.WATCHLIST);

    return () => clearInterval(intervalId);
  }, [autoRefresh]);

  // Add stock to watchlist
  const addToWatchlist = (stockSymbol) => {
    // In a real app, this would call an API
    setWatchlist(prev => {
      const exists = prev.some(item => item.symbol === stockSymbol);
      if (exists) return prev;
      
      // For demo, we'll just add a placeholder
      return [...prev, {
        symbol: stockSymbol,
        name: `${stockSymbol} Inc.`,
        price: 100.00,
        change: 0.00
      }];
    });
  };

  // Remove stock from watchlist
  const removeFromWatchlist = (stockSymbol) => {
    // In a real app, this would call an API
    setWatchlist(prev => prev.filter(item => item.symbol !== stockSymbol));
  };

  return {
    watchlist,
    loading,
    error,
    refreshWatchlist: fetchWatchlist,
    addToWatchlist,
    removeFromWatchlist
  };
};

export default useWatchlist;
