# filepath: c:\repos\LLM\trading-web-app\backend\README.md
# Trading Platform Backend

This is the FastAPI backend for the Trading Platform application, providing connectivity to Interactive Brokers using the ib_insync library.

## Requirements

- Python 3.8+
- Interactive Brokers Trader Workstation (TWS) or IB Gateway running on your machine
- TWS API settings configured to allow API connections

## Setup

1. Install the required dependencies:

```bash
pip install -r requirements.txt
```

2. Make sure Interactive Brokers TWS or IB Gateway is running on your machine

3. In TWS/IB Gateway, go to Edit -> Global Configuration -> API -> Settings and ensure:
   - API is enabled
   - Socket port is set to 7497 (for paper trading) or 7496 (for live trading)
   - "Allow connections from localhost only" can be checked for security
   - "Read-only API" should be unchecked if you want to place trades

## Running the Server

Start the FastAPI server with uvicorn:

```bash
uvicorn main:app --reload
```

The API will be available at http://127.0.0.1:8000

## Available Endpoints

- `GET /` - Check if the API is running
- `POST /connect` - Connect to Interactive Brokers
- `POST /disconnect` - Disconnect from Interactive Brokers
- `GET /connection` - Get the current connection status

## API Documentation

Once the server is running, you can access the automatic API documentation:

- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc
