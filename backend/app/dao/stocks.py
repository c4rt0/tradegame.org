from ctypes import py_object
from motor import *
from typing import Field
from motor.core import BaseModel
from lib.utils import PyObjectId
import time

class Stocks(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    symbol: str = Field()
    price: float = Field()
    last_update: int = Field()


class UpdateStock(BaseModel):
    symbol: str = Field()
    price: float = Field()
    
