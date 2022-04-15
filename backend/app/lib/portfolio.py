from app.lib.database import database
from app.lib.alpaca import get_stocks_from_db
from ..dao.user import get_users



async def recalculate_portfolio():
    """
    Calculate the portfolio value for each user
    """
    users = await get_users()
    stocks = await get_stocks_from_db()
    
    for user in users:
        portfolio_value = 0
        portfolio = user["portfolio"]
        keys = portfolio.keys()
        for stock in keys:
            for stock_data in stocks:
                if stock == stock_data["symbol"]:
                    portfolio_value += (stock_data["price"] - portfolio[stock]["buy"]) * portfolio[stock]["shares"]
        await database["users"].update_one({"_id": user["_id"]}, {"$set": {"portfolio_value": portfolio_value}})
