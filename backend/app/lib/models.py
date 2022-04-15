from typing import Optional
from pydantic import BaseModel

class LoginIn(BaseModel):
    email: str
    password: str
    
class UserIn(BaseModel):
    username: str
    email: str
    password: str

class HistoryEntry(BaseModel):
    symbol: str
    shares: int
    buy: float
    sell: float
    buy_timestamp: int
    sell_timestamp: int

class StockEntry(BaseModel):
    price: float
    shares: int
    time: int

class CreateAdminIn(BaseModel):
    email: str
    password: str

class AdminLoginIn(BaseModel):
    email: str
    password: str


class Order(BaseModel):
    symbol: str
    shares: int
    is_buy: bool


class AdminUserUpdate(BaseModel):
    username: str
    email: str
    firstname: str
    lastname: str
    total_balance: str
    purchased_assets: list
    profile_picture: str


class CreateStockIn(BaseModel):
    symbol: str
