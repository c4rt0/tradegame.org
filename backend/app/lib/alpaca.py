from datetime import datetime, timezone, timedelta
import requests
import os
import logging
import time

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


async def get_stocks_from_db():
    stocks = await database["stocks"].find().to_list(1000)
    return stocks

async def update_stock():
   stocks = await get_stocks_from_db()
   for stock in stocks:
        symbol = stock["symbol"]
        data = get_symbol_data(symbol)
        price = data["trade"]["p"]
        logging.debug(price)
        if not price == None:
            await database["stocks"].update_one({"symbol": symbol}, {"$set": {"price": price, "last_update": time.time()}})
