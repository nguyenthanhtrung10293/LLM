# Trading Platform Application

A modern web application for stock trading and portfolio management built with React and FastAPI, featuring Interactive Brokers integration.

## Features

- **Dashboard**: View market overview, watchlist, and latest news
- **Stock Details**: Detailed information for individual stocks with interactive charts
- **Portfolio**: Track your holdings and transaction history
- **Trading**: Place real buy/sell orders via Interactive Brokers
- **Authentication**: Secure user authentication system
- **Interactive Brokers Integration**: Connect directly to your IB account

## Architecture

The application consists of two main parts:

1. **Frontend**: React application for the user interface
2. **Backend**: FastAPI server that connects to Interactive Brokers

## Project Structure

```
├── src/                          # React frontend
│   ├── components/               # Reusable UI components
│   ├── pages/                    # Page components
│   ├── context/                  # React context providers
│   ├── hooks/                    # Custom React hooks
│   ├── services/                 # API services
│   └── utils/                    # Utility functions
│
└── backend/                      # FastAPI backend
    ├── models/                   # Pydantic data models
    ├── routers/                  # API route handlers
    ├── services/                 # Business logic services
    └── main.py                   # FastAPI application entry point
```

## Requirements

### Frontend
- Node.js 14+ and npm

### Backend
- Python 3.8+
- Interactive Brokers Trader Workstation (TWS) or IB Gateway

## Installation

1. Clone the repository
2. Install frontend dependencies:
   ```
   npm install
   ```
3. Install backend dependencies:
   ```
   cd backend
   pip install -r requirements.txt
   ```
4. Create a `.env` file in the root directory based on the provided `.env.example`

## Running the Application

### Option 1: Run with the convenience script
```
# On Windows
start_app.bat

# On Linux/macOS
./start_app.sh
```

### Option 2: Run frontend and backend separately

Terminal 1 (Backend):
```
cd backend
python run.py
```

Terminal 2 (Frontend):
```
npm start
```

## Interactive Brokers Setup

1. Launch Interactive Brokers Trader Workstation (TWS) or IB Gateway
2. Go to Edit -> Global Configuration -> API -> Settings
3. Enable API connections and set the port to 7497 (paper trading) or 7496 (live trading)
4. You can limit connections to localhost only for security
5. Make sure to disable "Read-Only API" if you want to place trades

## Technologies Used

### Frontend
- React
- React Router
- React Context API for state management
- CSS variables for theming
- Custom React hooks for data fetching

### Backend
- FastAPI
- ib_insync library for Interactive Brokers API connectivity
- Pydantic for data validation
- Uvicorn ASGI server

## Development

### Backend Development
API documentation is automatically generated and available at:
- http://localhost:8000/docs (Swagger UI)
- http://localhost:8000/redoc (ReDoc)

### Building for Production

Create a production build of the frontend:
```
npm run build
```
