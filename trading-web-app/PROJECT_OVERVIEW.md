# Trading Web App: Project Overview

## What is this project?
This is a full-stack web application for stock trading and portfolio management. It lets users:
- View real-time and historical stock data
- Place trades (buy/sell stocks)
- Track their portfolio and transaction history
- Connect directly to Interactive Brokers (IB) for real trading

The project is split into two main parts:
- **Frontend:** The user interface (what you see in your browser)
- **Backend:** The server that does the work, talks to Interactive Brokers, and stores/manages data

---

## Project Structure (Folders & Files)

```
trading-web-app/
│
├── backend/                # FastAPI backend (Python)
│   ├── config.py           # Configuration (API/IB connection settings)
│   ├── main.py             # Main FastAPI app (all backend endpoints)
│   ├── run.py              # Script to start the backend
│   ├── requirements.txt    # Python dependencies
│   ├── models/             # Data models (Pydantic)
│   │   ├── connection.py   # Connection status model
│   │   └── trading.py      # Trade request/response models
│   ├── routers/            # (Optional) API route files
│   │   ├── market_data.py  # Market data endpoints (future)
│   │   └── trading.py      # Trading endpoints (future)
│   └── services/           # Business logic (IBService)
│       └── ib_service.py   # Handles all IB API calls
│
├── src/                   # React frontend (JavaScript)
│   ├── App.js              # Main React app
│   ├── index.js            # Entry point
│   ├── components/         # UI components (charts, forms, etc.)
│   ├── context/            # React Contexts (global state)
│   ├── hooks/              # Custom React hooks
│   ├── layouts/            # Page layouts
│   ├── pages/              # Main pages (Dashboard, Portfolio, etc.)
│   ├── services/           # API service files (ibApiService.js, mockApiService.js)
│   └── utils/              # Utility functions
│
├── package.json           # Frontend dependencies & scripts
├── README.md              # Project instructions
└── ... (setup scripts, configs, etc.)
```

---

## How does it work? (Step by Step)

### 1. **Start Interactive Brokers Gateway or TWS**
- You must have IB Gateway or Trader Workstation running and logged in.
- API access must be enabled (in TWS: Configure > API > Settings).
- This allows the backend to place real trades on your behalf.

### 2. **Start the Backend (FastAPI)**
- The backend is a Python server that talks to Interactive Brokers and handles requests from the frontend.
- Start it with:
  ```powershell
  cd backend
  python run.py
  # or
  uvicorn main:app --reload --host 127.0.0.1 --port 8000
  ```
- The backend runs on [http://localhost:8000](http://localhost:8000)

### 3. **Start the Frontend (React)**
- The frontend is what users see and interact with in their browser.
- Start it with:
  ```powershell
  npm install   # Only needed once
  npm start
  ```
- The frontend runs on [http://localhost:3000](http://localhost:3000)

### 4. **Connect the Frontend to the Backend**
- The frontend sends requests to the backend (e.g., to place a trade or fetch your portfolio).
- The backend responds with data or status.
- Example: When you click "Connect to IB" in the UI, the frontend calls the backend's `/connect` endpoint, which connects to Interactive Brokers.

### 5. **Place Trades and View Portfolio**
- You can place trades (buy/sell) from the UI. The backend sends these orders to Interactive Brokers.
- You can view your current holdings and transaction history, which the backend fetches from IB.

### 6. **API Documentation (Swagger/OpenAPI)**
- The backend automatically provides interactive docs at [http://localhost:8000/docs](http://localhost:8000/docs)
- You can test all backend features here, even without the frontend.

---

## Why is it built this way?
- **Separation of concerns:**
  - Frontend (React) handles user experience and display.
  - Backend (FastAPI) handles business logic, security, and communication with Interactive Brokers.
- **Security:**
  - Your IB credentials and trading logic stay on the backend, not in the browser.
- **Flexibility:**
  - You can swap out the frontend or backend independently, or add new features easily.
- **Scalability:**
  - This structure is used by professional trading platforms and is easy to maintain and extend.

---

## For Non-Coders: What can you do with this app?
- **Log in and manage your account**
- **View real-time and historical stock data**
- **Place real trades (buy/sell) via Interactive Brokers**
- **Track your portfolio and see your transaction history**
- **Test all backend features using the built-in API docs**

If you want to add new features, change the look, or connect to a different broker, this structure makes it possible!

---

## Need help?
- Use the README.md for setup instructions.
- Use [http://localhost:8000/docs](http://localhost:8000/docs) to test backend features.
- Ask a developer or AI assistant for help with new features or troubleshooting.
