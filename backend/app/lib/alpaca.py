import datetime
import ssl
import requests
import os
import logging
import time
import aiohttp

from app.lib.config import parse_config
from app.lib.database import database
parse_config()

def get_symbol_data(symbol: str):
    host = "https://data.alpaca.markets"
    headers = {"APCA-API-KEY-ID": os.environ["alpaca_api_id"],"APCA-API-SECRET-KEY": os.environ["alpaca_api_secret"]}
    url = f"{host}/v2/stocks/{symbol}/trades/latest"
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()

async def get_symbol_async(symbol:str):
    async with aiohttp.ClientSession() as session:
     host = "https://data.alpaca.markets"
     headers = {"APCA-API-KEY-ID": os.environ["alpaca_api_id"],"APCA-API-SECRET-KEY": os.environ["alpaca_api_secret"]}
     url = f"{host}/v2/stocks/{symbol}/trades/latest"
     async with  session.get(url,headers=headers,ssl=ssl.SSLContext()) as r:
        json_body = await r.json();
        return json_body

async def get_stocks_from_db():
    stocks = await database["stocks"].find().to_list(1000)
    return stocks

async def update_stock():
   print('okok')
   stocks = await get_stocks_from_db()
   for stock in stocks:
        symbol = stock["symbol"]
        data = get_symbol_data(symbol)
        print(data.__str__())
        price = data["trade"]["p"]
        logging.debug(price)
        if not price == None:
            await database["stocks"].update_one({"symbol": symbol}, {"$set": {"price": price, "last_update": datetime.datetime.now()}})

async def add_Symbol(symbol: str):
    data =await get_symbol_async(symbol)
    price = data["trade"]["p"]
    logging.debug(price)
    if not price == None:
     response = await database["stocks"].insert_one({"symbol": symbol,"price":price, "last_update": datetime.datetime.now()})
     return response