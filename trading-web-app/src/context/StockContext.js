import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchMarketOverview, fetchStockData } from '../services/mockApiService';

// Create context
export const StockContext = createContext();

/**
 * Stock Context Provider
 * Manages global stock data state across the application
 */
export const StockProvider = ({ children }) => {
  const [marketOverview, setMarketOverview] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [stocks, setStocks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch market overview data on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const overview = await fetchMarketOverview();
        setMarketOverview(overview);
        setError(null);
      } catch (err) {
        console.error('Error fetching market overview:', err);
        setError('Failed to load market data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();

    // Refresh market data every 60 seconds
    const intervalId = setInterval(fetchInitialData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  // Add a stock to watchlist
  const addToWatchlist = async (symbol) => {
    if (watchlist.includes(symbol)) return;
    
    try {
      // Fetch stock data if not already in stocks object
      if (!stocks[symbol]) {
        const stockData = await fetchStockData(symbol);
        setStocks(prevStocks => ({
          ...prevStocks,
          [symbol]: stockData
        }));
      }
      
      setWatchlist(prev => [...prev, symbol]);
      
      // Save watchlist to localStorage
      localStorage.setItem('watchlist', JSON.stringify([...watchlist, symbol]));
    } catch (err) {
      console.error(`Error adding ${symbol} to watchlist:`, err);
      setError(`Failed to add ${symbol} to watchlist.`);
    }
  };

  // Remove a stock from watchlist
  const removeFromWatchlist = (symbol) => {
    setWatchlist(prev => prev.filter(item => item !== symbol));
    
    // Update localStorage
    localStorage.setItem('watchlist', JSON.stringify(
      watchlist.filter(item => item !== symbol)
    ));
  };

  // Load saved watchlist from localStorage on mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) {
      try {
        const parsedWatchlist = JSON.parse(savedWatchlist);
        setWatchlist(parsedWatchlist);
        
        // Fetch data for all watchlist stocks
        parsedWatchlist.forEach(async (symbol) => {
          if (!stocks[symbol]) {
            try {
              const stockData = await fetchStockData(symbol);
              setStocks(prevStocks => ({
                ...prevStocks,
                [symbol]: stockData
              }));
            } catch (err) {
              console.error(`Error fetching data for ${symbol}:`, err);
            }
          }
        });
      } catch (err) {
        console.error('Error parsing saved watchlist:', err);
      }
    }
  }, []);

  const value = {
    marketOverview,
    watchlist,
    stocks,
    loading,
    error,
    addToWatchlist,
    removeFromWatchlist
  };

  return (
    <StockContext.Provider value={value}>
      {children}
    </StockContext.Provider>
  );
};

// Custom hook to use the StockContext
export const useStockContext = () => {
  const context = useContext(StockContext);
  if (context === undefined) {
    throw new Error('useStockContext must be used within a StockProvider');
  }
  return context;
};
