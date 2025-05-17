from fastapi import FastAPI, HTTPException, Body, Response
from fastapi.middleware.cors import CORSMiddleware
from ib_insync import IB, Contract
import logging
from typing import Dict, Any, Optional
from pydantic import BaseModel
from config import IB_HOST, IB_PORT, IB_CLIENT_ID

# Import models and services
from models.connection import ConnectionStatus
from services.ib_service import IBService

# Configure logging
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI(title="Trading Platform API", 
              description="API for connecting to Interactive Brokers and managing trades")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app address
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global IB instance
ib = IB()
ib_service = IBService(ib)
    
@app.get("/")
async def root():
    """Root endpoint to check if the API is running."""
    return {"status": "ok", "message": "Trading Platform API is running"}

@app.post("/connect", response_model=ConnectionStatus)
async def connect_to_ib():
    """Connect to Interactive Brokers TWS or IB Gateway."""
    try:
        # Check if already connected
        if ib.isConnected():
            logger.info("Already connected to Interactive Brokers")
            return ConnectionStatus(
                connected=True,
                message="Already connected to Interactive Brokers",
                client_id=ib.client.clientId
            )
          # Connect to IB
        logger.info(f"Connecting to Interactive Brokers at {IB_HOST}:{IB_PORT} with client ID {IB_CLIENT_ID}")
        ib.connect(IB_HOST, IB_PORT, clientId=IB_CLIENT_ID)
        
        if ib.isConnected():
            logger.info("Successfully connected to Interactive Brokers")
            return ConnectionStatus(
                connected=True,
                message="Successfully connected to Interactive Brokers",
                client_id=ib.client.clientId
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to connect to Interactive Brokers")
            
    except Exception as e:
        logger.error(f"Error connecting to Interactive Brokers: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error connecting to Interactive Brokers: {str(e)}")

@app.post("/disconnect", response_model=ConnectionStatus)
async def disconnect_from_ib():
    """Disconnect from Interactive Brokers TWS or IB Gateway."""
    try:
        if not ib.isConnected():
            return ConnectionStatus(
                connected=False,
                message="Not connected to Interactive Brokers"
            )
            
        ib.disconnect()
        logger.info("Disconnected from Interactive Brokers")
        
        return ConnectionStatus(
            connected=False,
            message="Successfully disconnected from Interactive Brokers"
        )
    except Exception as e:
        logger.error(f"Error disconnecting from Interactive Brokers: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error disconnecting from Interactive Brokers: {str(e)}")

@app.get("/connection", response_model=ConnectionStatus)
async def get_connection_status():
    """Get the current connection status to Interactive Brokers."""
    is_connected = ib.isConnected()
    
    if is_connected:
        return ConnectionStatus(
            connected=True,
            message="Connected to Interactive Brokers",
            client_id=ib.client.clientId
        )
    else:
        return ConnectionStatus(
            connected=False,
            message="Not connected to Interactive Brokers"
        )

class TradeRequest(BaseModel):
    symbol: str
    quantity: float
    order_type: str  # 'market' or 'limit'
    limit_price: Optional[float] = None

class TradeResponse(BaseModel):
    success: bool
    order_id: Optional[str] = None
    message: str

@app.post("/trade", response_model=TradeResponse)
async def trade(request: TradeRequest = Body(...)):
    """Place a trade (market or limit order) via Interactive Brokers."""
    if not ib.isConnected():
        return TradeResponse(success=False, message="Not connected to Interactive Brokers")
    try:
        contract = ib_service.create_stock_contract(request.symbol)
        if request.order_type == 'market':
            order = ib_service.market_order('BUY', request.quantity)
        elif request.order_type == 'limit':
            if not request.limit_price:
                return TradeResponse(success=False, message="Limit price required for limit order")
            order = ib_service.limit_order('BUY', request.quantity, request.limit_price)
        else:
            return TradeResponse(success=False, message="Invalid order type")
        trade = ib_service.place_order(contract, order)
        return TradeResponse(success=True, order_id=str(trade.order.orderId), message="Order placed successfully")
    except Exception as e:
        return TradeResponse(success=False, message=f"Order failed: {str(e)}")

@app.get("/portfolio")
async def get_portfolio():
    """Fetch all current positions from Interactive Brokers."""
    if not ib.isConnected():
        return Response(content='{"error": "Not connected to Interactive Brokers"}', media_type="application/json", status_code=400)
    try:
        positions = ib.positions()
        result = []
        for pos in positions:
            result.append({
                "account": pos.account,
                "symbol": pos.contract.symbol,
                "exchange": pos.contract.exchange,
                "currency": pos.contract.currency,
                "position": pos.position,
                "avgCost": pos.avgCost
            })
        return {"positions": result}
    except Exception as e:
        return Response(content=f'{{"error": "{str(e)}"}}', media_type="application/json", status_code=500)

# Shutdown event to ensure proper disconnection
@app.on_event("shutdown")
def shutdown_event():
    """Ensure IB connection is closed when shutting down."""
    if ib.isConnected():
        logger.info("Disconnecting from IB on shutdown")
        ib.disconnect()
