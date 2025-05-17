import React from 'react';
import Watchlist from '../../components/Watchlist/Watchlist';
import StockChart from '../../components/StockChart/StockChart';
import IBConnectionStatus from '../../components/IBConnectionStatus/IBConnectionStatus';
import { useStockContext } from '../../context/StockContext';
import './Dashboard.css';

const Dashboard = () => {
  // Using context would be better in a real app
  // const { marketOverview } = useStockContext();
  
  // Sample data - in a real app, this would come from an API
  const marketSummary = [
    { index: 'S&P 500', value: '4,893.73', change: '+0.52%' },
    { index: 'Dow Jones', value: '38,654.42', change: '+0.34%' },
    { index: 'Nasdaq', value: '15,245.32', change: '+0.73%' },
    { index: 'Russell 2000', value: '2,087.56', change: '-0.18%' }
  ];

  // Sample news items
  const newsItems = [
    {
      id: 1,
      title: 'Fed signals potential rate cut in upcoming meeting',
      source: 'Financial Times',
      time: '2 hours ago'
    },
    {
      id: 2,
      title: 'Tech stocks rally as earnings exceed expectations',
      source: 'Reuters',
      time: '4 hours ago'
    },
    {
      id: 3,
      title: 'Global markets respond to positive economic data',
      source: 'Bloomberg',
      time: '6 hours ago'
    }
  ];
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="page-header">
          <h1 className="page-title">Market Overview</h1>
          <p className="page-description">
            View the latest market data and manage your Interactive Brokers connection.
          </p>
        </div>
        
        {/* IB Connection Status */}
        <IBConnectionStatus />
        
        <div className="market-summary">
          {marketSummary.map((item) => (
            <div key={item.index} className="market-item">
              <h3>{item.index}</h3>
              <p className="value">{item.value}</p>
              <p className={`change ${item.change.startsWith('+') ? 'positive' : 'negative'}`}>
                {item.change}
              </p>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          <div className="main-chart">
            <StockChart />
          </div>
          
          <div className="sidebar">
            <Watchlist />
            
            <div className="news-feed">
              <h3>Latest News</h3>
              <div className="news-items">
                {newsItems.map((news) => (
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
