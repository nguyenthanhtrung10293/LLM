"""
Data models for connection endpoints
"""
from pydantic import BaseModel
from typing import Optional

class ConnectionStatus(BaseModel):
    """Model for connection status response"""
    connected: bool
    message: str
    client_id: Optional[int] = None
