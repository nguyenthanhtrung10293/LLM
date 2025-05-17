import React from 'react';
import Header from '../../components/Header/Header';
import StockChart from '../../components/StockChart/StockChart';
import TradeForm from '../../components/TradeForm/TradeForm';
import './StockDetails.css';
import { useParams } from 'react-router-dom';

const StockDetails = () => {
  const { symbol } = useParams();
  const stockSymbol = symbol || 'AAPL';
  
  // In a real app, this data would come from an API
  const stockData = {
    AAPL: {
      name: 'Apple Inc.',
      price: 178.72,
      change: 2.31,
      changePercent: 1.29,
      open: 176.15,
      high: 179.23,
      low: 175.82,
      volume: '45.2M',
      marketCap: '2.8T',
      pe: 29.5,
      dividend: 0.92,
      description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, Mac, iPad, and wearables, home, and accessories.',
      news: [
        {
          id: 1,
          title: 'Apple announces new MacBook lineup with next-gen processors',
          source: 'TechCrunch',
          time: '3 hours ago'
        },
        {
          id: 2,
          title: 'iPhone sales exceed expectations in Asian markets',
          source: 'CNBC',
          time: '5 hours ago'
        },
        {
          id: 3,
          title: 'Apple\'s services revenue hits all-time high',
          source: 'Bloomberg',
          time: '1 day ago'
        }
      ]
    }
  };
  
  // Use Apple as default fallback if the requested stock isn't in our data
  const stock = stockData[stockSymbol] || stockData.AAPL;

  return (
    <div className="stock-details">
      <Header />
      <div className="stock-details-content">
        <div className="stock-header">
          <div>
            <h1>{stockSymbol} - {stock.name}</h1>
            <div className="price-container">
              <span className="price">${stock.price.toFixed(2)}</span>
              <span className={`change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>

        <div className="stock-details-grid">
          <div className="main-content">
            <StockChart symbol={stockSymbol} />
            
            <div className="stock-info">
              <h3>About {stock.name}</h3>
              <p className="description">{stock.description}</p>
              
              <div className="key-stats">
                <div className="stats-group">
                  <div className="stat-item">
                    <span className="stat-label">Open</span>
                    <span className="stat-value">${stock.open}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">High</span>
                    <span className="stat-value">${stock.high}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Low</span>
                    <span className="stat-value">${stock.low}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Volume</span>
                    <span className="stat-value">{stock.volume}</span>
                  </div>
                </div>
                <div className="stats-group">
                  <div className="stat-item">
                    <span className="stat-label">Market Cap</span>
                    <span className="stat-value">${stock.marketCap}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">P/E Ratio</span>
                    <span className="stat-value">{stock.pe}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Dividend Yield</span>
                    <span className="stat-value">{stock.dividend}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="stock-news">
              <h3>Latest News</h3>
              <div className="news-items">
                {stock.news.map((news) => (
                  <div key={news.id} className="news-item">
                    <h4>{news.title}</h4>
                    <div className="news-meta">
                      <span className="source">{news.source}</span>
                      <span className="time">{news.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sidebar">
            <TradeForm symbol={stockSymbol} currentPrice={stock.price} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
