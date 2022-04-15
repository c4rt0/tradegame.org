from typing import Optional
from pydantic import BaseModel

class LoginIn(BaseModel):
    email: str
    password: str
    
class UserIn(BaseModel):
    username: str
    email: str
    password: str

class UserUp(BaseModel):
    username: str
    email: str
    id: str
    isLogIn: bool    

class UserUpPass(BaseModel):
    password: str
    id: str

class UserLogUp(BaseModel):
     id: str
     isLogIn: bool 

class UserID(BaseModel):
    id: str  

    

class WhishList(BaseModel):
    id: str
    symbol: str
    isAdd: bool;

class HistoryEntry(BaseModel):
    symbol: str
    shares: int
    buy: float
    sell: float
    remainingCash: int
    buy_timestamp: str
    sell_timestamp: str
    isBuy: bool

class StockEntry(BaseModel):
    price: float
    shares: int
    remainingCash: int
    time: str

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
