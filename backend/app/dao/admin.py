from pydantic import BaseModel, EmailStr, Field
from bson.objectid import ObjectId # pymongo 2.2 call to import objectid 


from ..lib.utils import PyObjectId 
from ..lib.database import database


class Admin(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    email: str = Field()
    password: str = Field()
    created: int = Field()


class UpdateAdmin(BaseModel):
    email: str = Field()
    password: str = Field()
    created: int = Field()


def admin_helper(admin) -> dict:
    return {
        "id": str(admin["_id"]),
        "email": admin["email"],
        "password": admin["password"],
        "created": admin["created"],
    }


async def add_admin(admin_data: dict) -> dict:
    result = await retrieve_admin(admin_data["email"])
    if result == None:
        admin = await database["admin"].insert_one(admin_data)
        new_admin = await database["admin"].find_one({"_id": admin.inserted_id})
        return admin_helper(new_admin)
    return {"error": "Admin already exists"}


async def retrieve_admin(email: str) -> dict:
    admin = await database["admin"].find_one({"email": email})
    if admin:
        return admin_helper(admin)


async def delete_admin(id: str):
    admin = await database["admin"].find_one({"_id": ObjectId(id)})
    if admin:
        await database["admin"].delete_one({"_id": ObjectId(id)})
        return True


async def get_admin(id: str) -> dict:
    admin = await database["admin"].find_one({"_id": ObjectId(id)})
    if admin:
        return admin


async def get_users():
    users = await database["users"].find().to_list(1000)
