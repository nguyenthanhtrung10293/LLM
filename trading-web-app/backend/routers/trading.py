"""
Router for trading endpoints
"""
from fastapi import APIRouter, HTTPException
from ib_insync import Trade, IB
from typing import List, Dict, Any, Optional
import logging
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from main import ib_service

from models.trading import TradeRequest, TradeResponse

router = APIRouter(prefix="/trading", tags=["Trading"])
logger = logging.getLogger(__name__)

@router.post("/trade", response_model=TradeResponse)
async def place_trade(trade_request: TradeRequest):
    """
    Place a trade with Interactive Brokers
    
    This endpoint will place an order with Interactive Brokers based on the provided
    trade request details. A connection to Interactive Brokers must be established 
    before using this endpoint.
    """
    try:
        logger.info(f"Received trade request: {trade_request.dict()}")
        
        # Check connection
        if not ib_service.ib.isConnected():
            raise HTTPException(
                status_code=400, 
                detail="Not connected to Interactive Brokers. Connect first.")
        
        # Create contract
        contract = ib_service.create_stock_contract(
            symbol=trade_request.symbol,
            exchange=trade_request.exchange,
            currency=trade_request.currency
        )
        logger.info(f"Created contract for {trade_request.symbol}")
        
        # Create order based on order_type
        if trade_request.order_type == "MKT":
            order = ib_service.market_order(
                action=trade_request.action.value,
                quantity=trade_request.quantity
            )
            logger.info(f"Created market order for {trade_request.quantity} shares")
        else:  # LMT order
            if not trade_request.limit_price:
                raise HTTPException(
                    status_code=400,
                    detail="Limit price is required for limit orders")
                
            order = ib_service.limit_order(
                action=trade_request.action.value,
                quantity=trade_request.quantity,
                limit_price=trade_request.limit_price
            )
            logger.info(f"Created limit order at ${trade_request.limit_price}")
        
        # Place order
        trade = ib_service.place_order(contract, order)
        logger.info(f"Order placed successfully: {trade}")
        
        # Return response
        return TradeResponse(
            success=True,
            order_id=str(trade.order.orderId),
            message=f"Order to {trade_request.action.value} {trade_request.quantity} shares of {trade_request.symbol} placed successfully",
            symbol=trade_request.symbol,
            action=trade_request.action.value,
            quantity=trade_request.quantity,
            order_type=trade_request.order_type.value,
            limit_price=trade_request.limit_price
        )
        
    except Exception as e:
        logger.error(f"Error placing trade: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error placing trade: {str(e)}"
        )
