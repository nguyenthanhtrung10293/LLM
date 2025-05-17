import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchPortfolioData } from '../services/mockApiService';

// Create context
export const PortfolioContext = createContext();

/**
 * Portfolio Context Provider
 * Manages global portfolio data state across the application
 */
export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState({
    balance: 0,
    holdings: [],
    transactions: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch portfolio data on component mount
  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        setLoading(true);
        const data = await fetchPortfolioData();
        setPortfolio(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
        setError('Failed to load portfolio data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadPortfolioData();
  }, []);

  // Execute a stock trade (buy or sell)
  const executeTrade = async (symbol, action, quantity, price) => {
    try {
      // Basic validation
      if (quantity <= 0) throw new Error('Quantity must be greater than 0');
      if (price <= 0) throw new Error('Price must be greater than 0');
      
      const tradeAmount = quantity * price;
      const transaction = {
        id: Date.now(),
        symbol,
        action,
        quantity,
        price,
        timestamp: new Date().toISOString(),
        total: tradeAmount
      };

      if (action === 'buy') {
        // Check if user has enough funds
        if (portfolio.balance < tradeAmount) {
          throw new Error('Insufficient funds for this trade');
        }

        // Update portfolio
        setPortfolio(prev => {
          // Find if stock is already in holdings
          const existingHolding = prev.holdings.find(h => h.symbol === symbol);
          
          let updatedHoldings;
          if (existingHolding) {
            // Update existing holding
            updatedHoldings = prev.holdings.map(holding => {
              if (holding.symbol === symbol) {
                const newQuantity = holding.quantity + quantity;
                const newAvgPrice = ((holding.avgPrice * holding.quantity) + tradeAmount) / newQuantity;
                
                return {
                  ...holding,
                  quantity: newQuantity,
                  avgPrice: newAvgPrice,
                  currentValue: newQuantity * price
                };
              }
              return holding;
            });
          } else {
            // Add new holding
            updatedHoldings = [
              ...prev.holdings,
              {
                symbol,
                quantity,
                avgPrice: price,
                currentValue: tradeAmount
              }
            ];
          }
          
          // Update portfolio with new balance, holdings and transaction
          return {
            ...prev,
            balance: prev.balance - tradeAmount,
            holdings: updatedHoldings,
            transactions: [transaction, ...prev.transactions]
          };
        });
      } else if (action === 'sell') {
        // Find holding to sell from
        const existingHolding = portfolio.holdings.find(h => h.symbol === symbol);
        
        if (!existingHolding) {
          throw new Error(`You don't own any shares of ${symbol}`);
        }
        
        if (existingHolding.quantity < quantity) {
          throw new Error(`You only have ${existingHolding.quantity} shares of ${symbol}`);
        }
        
        // Update portfolio
        setPortfolio(prev => {
          let updatedHoldings = prev.holdings.map(holding => {
            if (holding.symbol === symbol) {
              const newQuantity = holding.quantity - quantity;
              
              // If no shares left, remove from holdings
              if (newQuantity <= 0) {
                return null;
              }
              
              return {
                ...holding,
                quantity: newQuantity,
                currentValue: newQuantity * price
              };
            }
            return holding;
          }).filter(Boolean); // Remove null entries
          
          return {
            ...prev,
            balance: prev.balance + tradeAmount,
            holdings: updatedHoldings,
            transactions: [transaction, ...prev.transactions]
          };
        });
      }
      
      return true; // Indicate success
    } catch (err) {
      console.error('Error executing trade:', err);
      setError(err.message || 'Failed to execute trade');
      return false;
    }
  };

  // Calculate portfolio metrics
  const getPortfolioMetrics = () => {
    const totalValue = portfolio.holdings.reduce(
      (sum, holding) => sum + holding.currentValue, 
      0
    );
    
    const initialValue = portfolio.transactions.reduce((sum, transaction) => {
      if (transaction.action === 'buy') {
        return sum + (transaction.quantity * transaction.price);
      } else {
        return sum - (transaction.quantity * transaction.price);
      }
    }, 0);
    
    const totalReturn = totalValue - initialValue;
    const percentReturn = initialValue > 0 ? (totalReturn / initialValue) * 100 : 0;
    
    return {
      totalValue,
      totalReturn,
      percentReturn
    };
  };

  const value = {
    portfolio,
    loading,
    error,
    executeTrade,
    getPortfolioMetrics
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

// Custom hook to use the PortfolioContext
export const usePortfolioContext = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolioContext must be used within a PortfolioProvider');
  }
  return context;
};
