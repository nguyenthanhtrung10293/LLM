# Frontend & Backend Relationships: Trading Web App

This document explains how the main functions, components, and services in the frontend (React) and backend (FastAPI) interact. Use this as a guide for learning, debugging, and extending the app.

---

## 1. High-Level Flow

```
[User Action in Browser]
    ↓
[React Component/Hook]
    ↓
[Frontend Service (API call)]
    ↓
[FastAPI Endpoint (Backend)]
    ↓
[IBService / Business Logic]
    ↓
[Interactive Brokers API]
    ↓
[Response flows back to Frontend]
```

---

## 2. Key Relationships

### A. Connecting to Interactive Brokers
- **Frontend:**
  - `IBConnectionStatus.js` (component)
  - `useBrokerConnection.js` (hook)
  - `ibApiService.js` (service)
- **Backend:**
  - `/connect` endpoint in `main.py`
  - `IBService.connect()` in `ib_service.py`
  - `ConnectionStatus` model in `connection.py`

**Flow:**
1. User clicks "Connect to IB" in the UI (`IBConnectionStatus.js`).
2. `useBrokerConnection` calls `ibApiService.connectToIB()`.
3. This sends a POST request to `/connect` (FastAPI).
4. Backend calls `IBService.connect()`, attempts IB connection.
5. Backend returns connection status; frontend updates UI.

---

### B. Placing a Trade
- **Frontend:**
  - `TradeForm.js` (component)
  - `ibApiService.js` (service)
  - `PortfolioContext.js` (context, updates after trade)
- **Backend:**
  - `/trade` endpoint in `main.py`
  - `IBService.place_order()` in `ib_service.py`
  - `TradeRequest`/`TradeResponse` models in `trading.py`

**Flow:**
1. User fills and submits trade form (`TradeForm.js`).
2. Calls `ibApiService.placeTrade()` (POST `/trade`).
3. Backend validates request, calls `IBService.place_order()`.
4. Order sent to IB; response returned to frontend.
5. `PortfolioContext` updates holdings if trade is successful.

---

### C. Viewing Portfolio
- **Frontend:**
  - `Portfolio.js` (page)
  - `PortfolioContext.js` (context)
  - `ibApiService.js` (service)
- **Backend:**
  - `/portfolio` endpoint in `main.py`
  - `IBService.get_portfolio()` in `ib_service.py`

**Flow:**
1. `Portfolio.js` loads or user navigates to portfolio page.
2. `PortfolioContext` calls `ibApiService.getPortfolio()` (GET `/portfolio`).
3. Backend fetches positions from IB via `IBService.get_portfolio()`.
4. Data returned to frontend and displayed.

---

### D. Market Data (Stock Chart, Watchlist, etc.)
- **Frontend:**
  - `StockChart.js`, `Watchlist.js`, `useStockData.js`
  - `ibApiService.js` (service)
- **Backend:**
  - `/market_data` endpoints (future: `market_data.py`)
  - `IBService.get_market_data()` (future)

---

## 3. Debugging Tips
- **Frontend errors:**
  - Check browser console for API errors (network tab shows requests/responses).
  - Check if the correct API endpoint is being called in `ibApiService.js`.
  - Use React DevTools to inspect context and component state.
- **Backend errors:**
  - Check FastAPI logs in the terminal for error messages.
  - Use `/docs` (Swagger UI) to test endpoints directly.
  - Validate request/response models in `models/`.
- **End-to-end:**
  - Trace a user action from component → service → backend endpoint → IBService.
  - If data is missing or wrong, check each step in the flow above.

---

## 4. Example: Placing a Trade (Step-by-Step)
1. User submits trade in `TradeForm.js`.
2. `ibApiService.placeTrade()` sends POST `/trade` with trade details.
3. FastAPI receives request in `main.py`, validates with `TradeRequest`.
4. Calls `IBService.place_order()` (in `ib_service.py`).
5. IBService sends order to Interactive Brokers.
6. Response (success/failure) returned to frontend.
7. UI updates via `PortfolioContext`.

---

## 5. Extending or Debugging
- To add a new feature:
  1. Add a backend endpoint (FastAPI, `main.py` or new router).
  2. Add logic in `ib_service.py` if it involves IB.
  3. Add a function in `ibApiService.js` to call the new endpoint.
  4. Use a React hook/context/component to trigger the new function and display results.
- To debug:
  - Start from the user action and follow the flow above.
  - Use logs and browser/terminal tools at each step.

---

**This structure makes it easy to trace, debug, and extend the app.**

For more details, see `PROJECT_OVERVIEW.md` and the code comments in each file.
