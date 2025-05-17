import React from 'react';
import { Link } from 'react-router-dom';
import './Watchlist.css';

const Watchlist = ({ stocks = [] }) => {
  // Default stocks if none are provided
  const defaultStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 178.72, change: 2.31 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 324.65, change: -1.24 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.35, change: 0.87 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 132.45, change: 1.56 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 234.12, change: -5.23 }
  ];

  const stocksToShow = stocks.length > 0 ? stocks : defaultStocks;

  return (
    <div className="watchlist">
      <div className="watchlist-header">
        <h3>Watchlist</h3>
        <button className="btn-add">+ Add</button>
      </div>
      <div className="watchlist-content">
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>            {stocksToShow.map((stock) => (
              <tr key={stock.symbol} className="stock-row">
                <td className="symbol">
                  <Link to={`/stock/${stock.symbol}`}>{stock.symbol}</Link>
                </td>
                <td className="name">{stock.name}</td>
                <td className="price">${stock.price.toFixed(2)}</td>
                <td className={`change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Watchlist;
