from fastapi import Response, status, APIRouter, status, Depends, Header
from werkzeug.security import generate_password_hash, check_password_hash
import time
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordBearer

from ..lib.models import CreateStockIn
from ..lib.models import Order
from ..dao.admin import Admin, UpdateAdmin, add_admin, retrieve_admin
from ..dao.user import User, get_users, delete_user, update_user
from ..lib.order import sell_order, buy_order
from ..lib.utils import validate_token


trade_router = APIRouter(
    prefix="/api/v1/trade",
    tags=["trade"],
    responses={404: {"description": "Not found"}},
)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# todo needs to be protected and only the user should be able to access
# user id is needed
@trade_router.post("/order")
async def place_order(payload: Order, response: Response, token: str = Depends(oauth2_scheme)):
    """
    create a order, in the payload is specify the user id and the stock id, and the order type (sell or buy)
    """
    is_token_valid = validate_token(token)
    if not is_token_valid:
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return {"details": "Invalid token"}

    user_id = is_token_valid[0]["userid"]
    if payload.is_buy:
        result = await buy_order(payload.symbol, payload.shares, user_id)
        if  "error" in result.keys():
            response.status_code = status.HTTP_400_BAD_REQUEST
            return result
        response.status_code = status.HTTP_200_OK
        return result

    if not payload.is_buy:
        result = await sell_order(payload.symbol, payload.shares, user_id)
        if "error" in result.keys():
            response.status_code = status.HTTP_400_BAD_REQUEST
            return result
        response.status_code = status.HTTP_200_OK
        return result

    response.status_code = status.HTTP_400_BAD_REQUEST
    return {"error": "order type not specified"}

