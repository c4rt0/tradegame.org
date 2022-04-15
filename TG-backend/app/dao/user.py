from ast import And
from pydantic import BaseModel, EmailStr, Field
from typing import Optional

from app.lib.models import UserLogUp
from ..lib.utils import PyObjectId
from app.lib.database import database
from bson.objectid import ObjectId


class User(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    username: str = Field()
    profile_image: Optional[str] = Field()
    email: str = Field()
    password: str = Field()
    portfolio: Optional[dict] = Field(default={})
    history: Optional[dict] = Field(default={})
    cash: int = Field()
    created: int = Field()
    isLogIn: bool = Field()


class UpdateUser(BaseModel):
    username: str = Field()
    profile_image: Optional[str] = Field()
    email: str = Field()
    password: Optional[str] = Field()
    portfolio: Optional[dict] = Field(default={})
    history: Optional[dict] = Field(default={})
    cash: int = Field(default=100000)
    created: Optional[str] = Field()
    isLogIn: Optional[bool] = Field()
    updated: Optional[int] = Field()


class UpdateUserPass(BaseModel):
    password: Optional[str] = Field()


class UpdateUserStocks(BaseModel):
    symbol: str = Field()
    price: float = Field()
    amount: int = Field()
    time: int = Field()


def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "username": user["username"],
        "email": user["email"],
        "password": user["password"],
        "created": user["created"],
        "profile_image": user["profile_image"],
        "cash": user["cash"],
        "portfolio": user["portfolio"],
        "history": user["history"],
        "isLogIn": user["isLogIn"],
    }


async def retrieve_user(email: str) -> dict:
    user = await database["users"].find_one({"email": email})
    if user:
        return user_helper(user)


async def retrieve_user_by_name(username: str) -> dict:
    user = await database["users"].find_one({"username": username})
    if user:
        return user_helper(user)


async def add_user(user_data: dict) -> dict:
    result = await retrieve_user(user_data["email"])
    result2 = await retrieve_user_by_name(user_data["username"])

    if result == None and result2 == None:
        admin = await database["users"].insert_one(user_data)
        new_user = await database["users"].find_one({"_id": admin.inserted_id})
        return user_helper(new_user)
    return {"error": "user already exists"}


async def get_users():
    users = await database["users"].find().to_list(1000)
    return users


async def delete_user(id: str):
    user = await database["users"].find_one({"_id": ObjectId(id)})
    if user:
        await database["users"].delete_one({"_id": ObjectId(id)})
        return True


async def get_user(id: str) -> dict:
    user = await database["users"].find_one({"_id": ObjectId(id)})
    if user:
        return user


async def get_user_by_email(email: str) -> dict:
    user = await database["users"].find_one({"email": email})
    return user


async def update_user(id: str, data: UpdateUser):
    result1 = await retrieve_user(data.email)
    result2 = await retrieve_user_by_name(data.username)
    user = await database["users"].find_one({"_id": ObjectId(id)})
    if user:
        print(data.cash)
        if user["cash"] != data.cash:
            updated_user = await database["users"].update_one(
                {"_id": ObjectId(id)},
                {
                    "$set": {
                        f"username": data.username,
                        "email": data.email,
                        "updated": data.updated,
                        "cash": data.cash,
                    }
                },
            )
            if updated_user:
                return True
            return False

        if result1 == None:
            updated_user = await database["users"].update_one(
                {"_id": ObjectId(id)},
                {
                    "$set": {
                        f"username": data.username,
                        "email": data.email,
                        "updated": data.updated,
                        "cash": data.cash,
                    }
                },
            )
            if updated_user:
                return True
            return False

        if result2 == None:
            updated_user = await database["users"].update_one(
                {"_id": ObjectId(id)},
                {
                    "$set": {
                        f"username": data.username,
                        "email": data.email,
                        "updated": data.updated,
                        "cash": data.cash,
                    }
                },
            )
            if updated_user:
                return True
            return False
    return False


async def update_user_pass(id: str, data: UpdateUserPass):
    # Return false if an empty request body is sent.

    if data.password:
        user = await database["users"].find_one({"_id": ObjectId(id)})
        if user:
            updated_user = await database["users"].update_one(
                {"_id": ObjectId(id)}, {"$set": {f"password": data.password}}
            )
            if updated_user:
                return True
            return False
        return False


async def updateLogin(id: str, data: UserLogUp):
    # Return false if an empty request body is sent.

    user = await database["users"].find_one({"_id": ObjectId(id)})
    if user:
        updated_user = await database["users"].update_one(
            {"_id": ObjectId(id)}, {"$set": {f"isLogIn": data.isLogIn}}
        )
        if updated_user:
            return True
        return False


async def ressetAccountUser(id: str):
    # Return false if an empty request body is sent.

    user = await database["users"].find_one({"_id": ObjectId(id)})
    if user:
        updated_user = await database["users"].update_one(
            {"_id": ObjectId(id)},
            {"$set": {f"portfolio": {}, "history": {}, "cash": 100000}},
        )
        if updated_user:
            return True
        return False


async def insert_portfolio(id: str, symbol: str, data: dict):
    result = await database["users"].update_one(
        {"_id": ObjectId(id)}, {"$set": {f"portfolio.{symbol}": data}}
    )
    return True


async def insert_stock_whishlist(id: str, data: list):
    result = await database["users"].update_one(
        {"_id": ObjectId(id)}, {"$set": {"whishlist": data}}
    )
    return True


async def remove_portfolio(id: str, symbol: str):
    """
    remove symbol from portfolio
    """
    result = await database["users"].update_one(
        {"_id": ObjectId(id)}, {"$unset": {f"portfolio.{symbol}": ""}}
    )
    return True


async def insert_history(id: str, order_id: str, data: dict):
    result = await database["users"].update_one(
        {"_id": ObjectId(id)}, {"$set": {f"history.{order_id}": data}}
    )
    return True


async def update_cash(id: str, new_balance: float):
    result = await database["users"].update_one(
        {"_id": ObjectId(id)}, {"$set": {"cash": new_balance}}
    )
