"""
Data models for trading endpoints
"""
from pydantic import BaseModel, Field
from typing import Optional, Literal
from enum import Enum
from datetime import datetime

class OrderAction(str, Enum):
    """Order action enum"""
    BUY = "BUY"
    SELL = "SELL"

class OrderType(str, Enum):
    """Order type enum"""
    MARKET = "MKT"
    LIMIT = "LMT"

class TradeRequest(BaseModel):
    """Model for trade request"""
    symbol: str = Field(..., description="Stock symbol, e.g., AAPL")
    action: OrderAction = Field(..., description="Trade action: BUY or SELL")
    quantity: float = Field(..., gt=0, description="Number of shares to trade")
    order_type: OrderType = Field(..., description="Order type: MKT (Market) or LMT (Limit)")
    limit_price: Optional[float] = Field(None, gt=0, description="Limit price if order_type is LMT")
    exchange: str = Field("SMART", description="Exchange to route the order to")
    currency: str = Field("USD", description="Currency for the trade")

class TradeResponse(BaseModel):
    """Model for trade response"""
    success: bool = Field(..., description="Whether the order was successfully placed")
    order_id: Optional[str] = Field(None, description="Order ID if successful")
    message: str = Field(..., description="Descriptive message about the result")
    symbol: str = Field(..., description="Stock symbol")
    action: str = Field(..., description="Order action (BUY/SELL)")
    quantity: float = Field(..., description="Number of shares")
    order_type: str = Field(..., description="Order type")
    limit_price: Optional[float] = Field(None, description="Limit price if applicable")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Timestamp when order was placed")
