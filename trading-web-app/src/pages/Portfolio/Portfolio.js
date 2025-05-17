import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './Portfolio.css';

const Portfolio = () => {
  // In a real app, this data would come from an API
  const portfolioSummary = {
    totalValue: 24582.37,
    todayChange: 341.28,
    todayChangePercent: 1.42,
    totalReturn: 3728.45,
    totalReturnPercent: 17.89
  };

  const portfolioHoldings = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      shares: 15,
      avgPrice: 142.32,
      currentPrice: 178.72,
      value: 2680.80,
      returnValue: 545.98,
      returnPercent: 25.58
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      shares: 12,
      avgPrice: 287.75,
      currentPrice: 324.65,
      value: 3895.80,
      returnValue: 442.77,
      returnPercent: 12.82
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      shares: 20,
      avgPrice: 131.25,
      currentPrice: 142.35,
      value: 2847.00,
      returnValue: 222.00,
      returnPercent: 8.45
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      shares: 25,
      avgPrice: 115.74,
      currentPrice: 132.45,
      value: 3311.25,
      returnValue: 417.75,
      returnPercent: 14.43
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      shares: 18,
      avgPrice: 245.36,
      currentPrice: 234.12,
      value: 4214.16,
      returnValue: -202.28,
      returnPercent: -4.58
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      date: '2025-05-15',
      type: 'BUY',
      symbol: 'AAPL',
      shares: 5,
      price: 176.32,
      total: 881.60
    },
    {
      id: 2,
      date: '2025-05-10',
      type: 'SELL',
      symbol: 'TSLA',
      shares: 2,
      price: 238.45,
      total: 476.90
    },
    {
      id: 3,
      date: '2025-05-05',
      type: 'BUY',
      symbol: 'MSFT',
      shares: 3,
      price: 312.78,
      total: 938.34
    }
  ];

  return (
    <div className="portfolio">
      <Header />
      <div className="portfolio-content">
        <div className="portfolio-header">
          <h1>Your Portfolio</h1>
          <div className="portfolio-summary">
            <div className="summary-value">
              <h2>${portfolioSummary.totalValue.toLocaleString()}</h2>
              <p>Total Portfolio Value</p>
            </div>
            <div className="summary-change">
              <div className={`day-change ${portfolioSummary.todayChange >= 0 ? 'positive' : 'negative'}`}>
                <span className="change-value">
                  {portfolioSummary.todayChange >= 0 ? '+' : ''}
                  ${portfolioSummary.todayChange.toLocaleString()}
                </span>
                <span className="change-percent">
                  ({portfolioSummary.todayChange >= 0 ? '+' : ''}
                  {portfolioSummary.todayChangePercent}% today)
                </span>
              </div>
              <div className={`total-return ${portfolioSummary.totalReturn >= 0 ? 'positive' : 'negative'}`}>
                <span className="change-value">
                  {portfolioSummary.totalReturn >= 0 ? '+' : ''}
                  ${portfolioSummary.totalReturn.toLocaleString()}
                </span>
                <span className="change-percent">
                  ({portfolioSummary.totalReturn >= 0 ? '+' : ''}
                  {portfolioSummary.totalReturnPercent}% total)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="portfolio-sections">
          <div className="holdings-section">
            <h3>Your Holdings</h3>
            <div className="portfolio-table">
              <table>
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Shares</th>
                    <th>Avg. Price</th>
                    <th>Current Price</th>
                    <th>Value</th>
                    <th>Return</th>
                  </tr>
                </thead>
                <tbody>                  {portfolioHoldings.map((holding) => (
                    <tr key={holding.symbol} className="stock-row">
                      <td className="symbol">
                        <Link to={`/stock/${holding.symbol}`}>{holding.symbol}</Link>
                      </td>
                      <td className="name">{holding.name}</td>
                      <td>{holding.shares}</td>
                      <td>${holding.avgPrice.toFixed(2)}</td>
                      <td>${holding.currentPrice.toFixed(2)}</td>
                      <td className="value">${holding.value.toFixed(2)}</td>
                      <td className={`return ${holding.returnValue >= 0 ? 'positive' : 'negative'}`}>
                        <div>
                          {holding.returnValue >= 0 ? '+' : ''}${Math.abs(holding.returnValue).toFixed(2)}
                        </div>
                        <div className="percent">
                          {holding.returnPercent >= 0 ? '+' : ''}{holding.returnPercent}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="transactions-section">
            <h3>Recent Transactions</h3>
            <div className="transactions-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Symbol</th>
                    <th>Shares</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.date}</td>
                      <td className={`type ${transaction.type === 'BUY' ? 'buy' : 'sell'}`}>
                        {transaction.type}
                      </td>
                      <td className="symbol">{transaction.symbol}</td>
                      <td>{transaction.shares}</td>
                      <td>${transaction.price.toFixed(2)}</td>
                      <td className="total">${transaction.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
