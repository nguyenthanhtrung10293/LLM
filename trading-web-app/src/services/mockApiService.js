// Sample mock data for the trading platform
const mockData = {
  stocks: {
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
      description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, Mac, iPad, and wearables, home, and accessories.'
    },
    MSFT: {
      name: 'Microsoft Corp.',
      price: 324.65,
      change: -1.24,
      changePercent: -0.38,
      open: 325.89,
      high: 326.45,
      low: 322.76,
      volume: '22.4M',
      marketCap: '2.4T',
      pe: 34.2,
      dividend: 1.10,
      description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company operates through three segments: Productivity and Business Processes, Intelligent Cloud, and More Personal Computing.'
    },
    GOOGL: {
      name: 'Alphabet Inc.',
      price: 142.35,
      change: 0.87,
      changePercent: 0.62,
      open: 141.48,
      high: 143.12,
      low: 140.93,
      volume: '18.7M',
      marketCap: '1.8T',
      pe: 27.3,
      dividend: 0,
      description: 'Alphabet Inc. provides various products and platforms in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America. It operates through Google Services, Google Cloud, and Other Bets segments.'
    },
    AMZN: {
      name: 'Amazon.com Inc.',
      price: 132.45,
      change: 1.56,
      changePercent: 1.19,
      open: 130.89,
      high: 133.22,
      low: 130.41,
      volume: '35.8M',
      marketCap: '1.4T',
      pe: 56.7,
      dividend: 0,
      description: 'Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions through online and physical stores in North America and internationally. It operates through three segments: North America, International, and Amazon Web Services (AWS).'
    },
    TSLA: {
      name: 'Tesla Inc.',
      price: 234.12,
      change: -5.23,
      changePercent: -2.18,
      open: 239.35,
      high: 241.18,
      low: 233.45,
      volume: '60.3M',
      marketCap: '743.2B',
      pe: 80.4,
      dividend: 0,
      description: 'Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems. The company operates in two segments, Automotive, and Energy Generation and Storage.'
    }
  },
  
  // Sample price history data for charts
  priceHistory: {
    '1D': {
      AAPL: [
        {date: '2025-05-16 09:30', price: 176.25},
        {date: '2025-05-16 10:00', price: 176.89},
        {date: '2025-05-16 10:30', price: 177.45},
        {date: '2025-05-16 11:00', price: 177.12},
        {date: '2025-05-16 11:30', price: 177.98},
        {date: '2025-05-16 12:00', price: 178.34},
        {date: '2025-05-16 12:30', price: 178.02},
        {date: '2025-05-16 13:00', price: 178.67},
        {date: '2025-05-16 13:30', price: 178.45},
        {date: '2025-05-16 14:00', price: 178.91},
        {date: '2025-05-16 14:30', price: 179.15},
        {date: '2025-05-16 15:00', price: 178.72}
      ],
      // Other stocks have similar data structure...
    },
    '1W': {
      // Weekly data...
    },
    '1M': {
      // Monthly data...
    }
  },
  
  // Market news
  marketNews: [
    {
      id: 1,
      title: 'Fed signals potential rate cut in upcoming meeting',
      content: 'Federal Reserve officials indicated they may consider reducing interest rates in their next meeting, citing improved inflation data and moderate economic growth.',
      source: 'Financial Times',
      time: '2 hours ago',
      relatedSymbols: ['SPY', 'QQQ', 'DIA']
    },
    {
      id: 2,
      title: 'Apple to launch new augmented reality product line',
      content: 'Apple Inc. is expected to announce a new line of augmented reality products at their upcoming developer conference, according to industry analysts.',
      source: 'TechCrunch',
      time: '4 hours ago',
      relatedSymbols: ['AAPL', 'MSFT', 'GOOGL']
    },
    {
      id: 3,
      title: 'Tesla exceeds Q2 delivery expectations',
      content: 'Tesla reported stronger than expected vehicle deliveries for the second quarter, sending the stock up in pre-market trading.',
      source: 'Reuters',
      time: '5 hours ago',
      relatedSymbols: ['TSLA']
    }
  ]
};

// Mock API service to simulate data fetching
class MockApiService {
  // Simulates API calls with a delay to mimic real-world behavior
  _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Methods for auth context
  async loginUser(email, password) {
    await this._delay(800);
    
    // Mock authentication logic
    if (email === 'user@example.com' && password === 'password') {
      return {
        token: 'mock-auth-token-xyz',
        user: {
          id: 'usr123',
          name: 'John Doe',
          email: 'user@example.com',
          accountType: 'standard'
        }
      };
    }
    
    throw new Error('Invalid email or password');
  }

  async registerUser(name, email, password) {
    await this._delay(1000);
    
    // Mock registration logic
    if (email === 'user@example.com') {
      throw new Error('Email already in use');
    }
    
    return {
      token: 'mock-auth-token-new-user',
      user: {
        id: 'usr' + Math.floor(Math.random() * 1000),
        name,
        email,
        accountType: 'standard'
      }
    };
  }

  async fetchUserProfile(token) {
    await this._delay(600);
    
    // Mock token validation
    if (token === 'mock-auth-token-xyz' || token === 'mock-auth-token-new-user') {
      return {
        id: 'usr123',
        name: 'John Doe',
        email: 'user@example.com',
        accountType: 'standard',
        createdAt: '2025-01-15'
      };
    }
    
    throw new Error('Invalid or expired token');
  }

  // Methods for stock context
  async fetchMarketOverview() {
    await this._delay(700);
    
    return {
      indices: [
        { name: 'S&P 500', value: 4892.37, change: 27.48, changePercent: 0.56 },
        { name: 'Nasdaq', value: 16234.95, change: 118.76, changePercent: 0.74 },
        { name: 'Dow Jones', value: 38372.49, change: -32.28, changePercent: -0.08 }
      ],
      topMovers: {
        gainers: [
          { symbol: 'XYZ', name: 'XYZ Corp', price: 45.28, changePercent: 8.76 },
          { symbol: 'ABC', name: 'ABC Inc', price: 92.45, changePercent: 6.32 }
        ],
        losers: [
          { symbol: 'DEF', name: 'DEF Tech', price: 123.45, changePercent: -7.21 },
          { symbol: 'GHI', name: 'GHI Systems', price: 78.12, changePercent: -5.43 }
        ]
      },
      marketSummary: {
        advancers: 285,
        decliners: 215,
        unchanged: 12,
        volume: '4.2B',
        marketStatus: 'open' // 'open', 'closed', 'pre-market', 'after-hours'
      }
    };
  }

  async fetchStockData(symbol) {
    return this.getStockDetails(symbol);
  }

  async fetchPortfolioData() {
    const portfolioData = await this.getPortfolioData();
    
    return {
      balance: 15000, // Cash balance
      holdings: portfolioData.holdings.map(holding => ({
        symbol: holding.symbol,
        quantity: holding.shares,
        avgPrice: holding.avgPrice,
        currentValue: holding.value
      })),
      transactions: portfolioData.recentTransactions.map(transaction => ({
        id: transaction.id,
        symbol: transaction.symbol,
        action: transaction.type.toLowerCase(),
        quantity: transaction.shares,
        price: transaction.price,
        timestamp: transaction.date,
        total: transaction.total
      }))
    };
  }

  // Get data for all stocks in the watchlist
  async getWatchlistData() {
    await this._delay(500);
    return Object.keys(mockData.stocks).map(symbol => ({
      symbol,
      name: mockData.stocks[symbol].name,
      price: mockData.stocks[symbol].price,
      change: mockData.stocks[symbol].change,
      changePercent: mockData.stocks[symbol].changePercent
    }));
  }

  // Get detailed data for a specific stock
  async getStockDetails(symbol) {
    await this._delay(700);
    const stock = mockData.stocks[symbol];
    
    if (!stock) {
      throw new Error(`Stock data not found for symbol: ${symbol}`);
    }
    
    return {
      symbol,
      ...stock
    };
  }

  // Get price history for a stock
  async getPriceHistory(symbol, timeframe = '1D') {
    await this._delay(600);
    
    if (!mockData.priceHistory[timeframe] || !mockData.priceHistory[timeframe][symbol]) {
      // Fall back to Apple data if requested data isn't available
      return mockData.priceHistory['1D'].AAPL;
    }
    
    return mockData.priceHistory[timeframe][symbol];
  }

  // Get market news
  async getMarketNews() {
    await this._delay(400);
    return mockData.marketNews;
  }

  // Get news related to a specific stock
  async getStockNews(symbol) {
    await this._delay(500);
    return mockData.marketNews.filter(news => 
      news.relatedSymbols.includes(symbol)
    );
  }

  // Get portfolio data (would normally be user-specific)
  async getPortfolioData() {
    await this._delay(800);
    
    return {
      summary: {
        totalValue: 24582.37,
        todayChange: 341.28,
        todayChangePercent: 1.42,
        totalReturn: 3728.45,
        totalReturnPercent: 17.89
      },
      holdings: [
        {
          symbol: 'AAPL',
          name: mockData.stocks.AAPL.name,
          shares: 15,
          avgPrice: 142.32,
          currentPrice: mockData.stocks.AAPL.price,
          value: 15 * mockData.stocks.AAPL.price,
          returnValue: 15 * (mockData.stocks.AAPL.price - 142.32),
          returnPercent: ((mockData.stocks.AAPL.price - 142.32) / 142.32) * 100
        },
        {
          symbol: 'MSFT',
          name: mockData.stocks.MSFT.name,
          shares: 12,
          avgPrice: 287.75,
          currentPrice: mockData.stocks.MSFT.price,
          value: 12 * mockData.stocks.MSFT.price,
          returnValue: 12 * (mockData.stocks.MSFT.price - 287.75),
          returnPercent: ((mockData.stocks.MSFT.price - 287.75) / 287.75) * 100
        },
        // Additional holdings would be here...
      ],
      recentTransactions: [
        {
          id: 1,
          date: '2025-05-15',
          type: 'BUY',
          symbol: 'AAPL',
          shares: 5,
          price: 176.32,
          total: 5 * 176.32
        },
        {
          id: 2,
          date: '2025-05-10',
          type: 'SELL',
          symbol: 'TSLA',
          shares: 2,
          price: 238.45,
          total: 2 * 238.45
        },
        {
          id: 3,
          date: '2025-05-05',
          type: 'BUY',
          symbol: 'MSFT',
          shares: 3,
          price: 312.78,
          total: 3 * 312.78
        }
      ]
    };
  }

  // Place an order (mock implementation)
  async placeOrder(orderData) {
    await this._delay(1000);
    
    console.log('Order placed:', orderData);
    
    // In a real app, this would communicate with a backend API
    return {
      success: true,
      orderId: 'ORD' + Math.floor(Math.random() * 1000000),
      message: `Order to ${orderData.action.toUpperCase()} ${orderData.quantity} shares of ${orderData.symbol} placed successfully`
    };
  }
}

// Export a singleton instance of the API service
const mockApiService = new MockApiService();

export default mockApiService;
// Named exports for compatibility with existing imports
export const fetchUserProfile = (...args) => mockApiService.fetchUserProfile(...args);
export const loginUser = (...args) => mockApiService.loginUser(...args);
export const registerUser = (...args) => mockApiService.registerUser(...args);
export const fetchMarketOverview = (...args) => mockApiService.fetchMarketOverview(...args);
export const fetchStockData = (...args) => mockApiService.fetchStockData(...args);
export const fetchPortfolioData = (...args) => mockApiService.fetchPortfolioData(...args);
