"""
Service module for Interactive Brokers operations
"""
from ib_insync import IB, Contract, Order, Stock, util
import logging

logger = logging.getLogger(__name__)

class IBService:
    """Service class for Interactive Brokers operations"""
    
    def __init__(self, ib_instance: IB):
        """Initialize the service with an IB instance"""
        self.ib = ib_instance
        
    def get_account_summary(self):
        """Get account summary information"""
        if not self.ib.isConnected():
            raise ConnectionError("Not connected to Interactive Brokers")
            
        # Get account summary
        account_summary = self.ib.accountSummary()
        
        # Format into a more usable dictionary
        summary = {}
        for item in account_summary:
            if item.tag not in summary:
                summary[item.tag] = {}
            summary[item.tag][item.currency] = float(item.value) if item.value.replace('.', '', 1).isdigit() else item.value
            
        return summary
        
    def get_positions(self):
        """Get current positions"""
        if not self.ib.isConnected():
            raise ConnectionError("Not connected to Interactive Brokers")
            
        positions = self.ib.positions()
        
        formatted_positions = []
        for position in positions:
            formatted_positions.append({
                'symbol': position.contract.symbol,
                'exchange': position.contract.exchange,
                'currency': position.contract.currency,
                'position': position.position,
                'avgCost': position.avgCost
            })
            
        return formatted_positions
        
    def create_stock_contract(self, symbol: str, exchange: str = 'SMART', currency: str = 'USD'):
        """Create a stock contract"""
        contract = Stock(symbol, exchange, currency)
        return contract
        
    def market_order(self, action: str, quantity: float):
        """Create a market order"""
        return Order(
            orderType='MKT',
            action=action,
            totalQuantity=quantity
        )
        
    def limit_order(self, action: str, quantity: float, limit_price: float):
        """Create a limit order"""
        return Order(
            orderType='LMT',
            action=action,
            totalQuantity=quantity,
            lmtPrice=limit_price
        )
        
    def place_order(self, contract: Contract, order: Order):
        """Place an order with IB"""
        if not self.ib.isConnected():
            raise ConnectionError("Not connected to Interactive Brokers")
            
        trade = self.ib.placeOrder(contract, order)
        self.ib.sleep(1)  # Allow time for order to process
        return trade
