from fastapi import Response, status, APIRouter, status, Depends, Header
from werkzeug.security import generate_password_hash
from fastapi.security import OAuth2PasswordBearer

from ..lib.models import CreateStockIn
from ..lib.models import AdminLoginIn
from ..dao.admin import Admin, UpdateAdmin
from ..lib.database import database
from ..dao.user import get_users
from app.lib.order import calc_portfolio_value

leaderboard = APIRouter(
    prefix="/api/v1/leaderboard",
    tags=["leaderboard_endpoints"],
    responses={404: {"description": "Not found"}},
)

@leaderboard.get("")
async def get_leaderboard():
    users = await get_users()
    portfolio_values = []
    for user in users:
        value = calc_portfolio_value(user)
        portfolio_values.append({"id": str(user["_id"]), "value": value})
    sorted_portfolio_values = sorted(portfolio_values, key=lambda k: k['value'], reverse=True)
    return sorted_portfolio_values