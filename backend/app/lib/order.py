import time
from fastapi.encoders import jsonable_encoder
import uuid

from .alpaca import get_stocks_from_db
from ..dao.user import get_user, update_cash, insert_portfolio, remove_portfolio, insert_history
from .models import StockEntry, HistoryEntry

def calc_portfolio_value(user_data: dict):
    value = 0
    for stock in user_data["portfolio"]:
        print(stock)
        value += user_data["portfolio"][stock]["shares"] * user_data["portfolio"][stock]["price"]
    return value

def search_stock_in_portfolio(symbol: str, data: dict) -> dict:
    keys = data.keys()
    for key in keys:
        if key == symbol:
            return data[key]
    return {}

async def sell_order(symbol: str, shares: int, user_id: str):
    user_data = await get_user(user_id)
    available_stocks = await get_stocks_from_db()
    portfolio_data = search_stock_in_portfolio(symbol, user_data["portfolio"])
    for stock in available_stocks:

        if stock["symbol"] == symbol and portfolio_data != {}:
            if portfolio_data["shares"] > shares:
                earnings = shares * stock["price"]
                new_cash_balance = user_data["cash"] + earnings


                calc_new_buy_price = (portfolio_data["price"] + stock["price"]) /2
                new_share_count = portfolio_data["shares"] - shares
                entry = StockEntry(price=calc_new_buy_price, shares=new_share_count, time=portfolio_data["time"])
                encoded = jsonable_encoder(entry)
                await insert_portfolio(user_id, symbol, encoded)
                await update_cash(user_id, new_cash_balance)
                entry = HistoryEntry(symbol=symbol, shares=shares, buy=portfolio_data["price"], sell=stock["price"], buy_timestamp=portfolio_data["time"], sell_timestamp=time.time()) 
                o_id = str(uuid.uuid4()).replace("-", "")
                encoded = jsonable_encoder(entry)
                await insert_history(user_id, order_id=o_id, data=encoded)
                return {"success": True}

            if portfolio_data["shares"] == shares:
                earnings = shares * stock["price"]
                new_cash_balance = user_data["cash"] + earnings
                await remove_portfolio(user_id, symbol)
                await update_cash(user_id, new_cash_balance)
                print(portfolio_data)
                entry = HistoryEntry(symbol=symbol, shares=shares, buy=portfolio_data["price"], sell=stock["price"], buy_timestamp=portfolio_data["time"], sell_timestamp=time.time()) 
                o_id = str(uuid.uuid4()).replace("-", "")
                encoded = jsonable_encoder(entry)
                await insert_history(user_id, order_id=o_id, data=encoded)
                return {"success": True}

    return {"error": "not enough shares"}

            

async def buy_order(symbol: str, shares: int, user_id: str):
    user_data = await get_user(user_id)
    available_stocks = await get_stocks_from_db()
    portfolio_data = search_stock_in_portfolio(symbol, user_data["portfolio"])

    for stock in available_stocks:
        if stock["symbol"] == symbol :
            needed_cash = shares * stock["price"]
            if user_data["cash"] >= needed_cash:
                new_cash_balance = user_data["cash"] - needed_cash
                await update_cash(user_id, new_cash_balance)

                if portfolio_data != {}:
                    new_buy_price = (stock["price"] + portfolio_data["price"]) / 2
                    entry = StockEntry(price=new_buy_price, shares=portfolio_data["shares"] + shares, time=portfolio_data["time"])
                    encoded = jsonable_encoder(entry)
                    await insert_portfolio(user_id, symbol, encoded)
                else:
                    entry = StockEntry(price=stock["price"], shares=shares, time=time.time())
                    encoded = jsonable_encoder(entry)
                    await insert_portfolio(user_id, symbol, encoded)
                
                return {"success": True}
            else:
                return {"error": "not enough funds"}
    return {"error": "symbol not tradeable"}
