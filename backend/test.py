import pytest
from fastapi.encoders import jsonable_encoder

from app.dao.admin import add_admin, UpdateAdmin, retrieve_admin
from app.lib.alpaca import get_symbol_data, get_stocks_from_db, update_stock
from app.lib.config import parse_config
from app.lib.models import CreateAdminIn
from app.lib.order import buy_order

def test_get_symbol_data():
    result = get_symbol_data("AAPL")
    print(result)
    assert(False)

async def test_get_stocks():
    parse_config()
    await get_stocks_from_db()
    assert(False)

async def test_update_stock():
    parse_config()
    await update_stock()
    assert(False)

async def test_create_admin_user():
    parse_config()
    admin = CreateAdminIn(email="test@gmail.com", password="123123")
    result = await add_admin(jsonable_encoder(admin))
    print(result)
    assert False

async def test_get_admin():
    parse_config()
    result = await retrieve_admin("test@gmail.com")
    print(result)
    assert False

async def test_buy_order():
    parse_config()
    await buy_order("AAPL", 10, "62054482632db6fa0066913b")
    
    
    assert False