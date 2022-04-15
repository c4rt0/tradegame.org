from fastapi import FastAPI, Response, status, APIRouter, status, Depends, Header
from werkzeug.security import generate_password_hash, check_password_hash
from fastapi.security import OAuth2PasswordBearer
from fastapi.encoders import jsonable_encoder
import time

from ..lib.models import CreateStockIn
from ..lib.models import AdminLoginIn, CreateAdminIn
from ..dao.admin import Admin, UpdateAdmin, add_admin, retrieve_admin
from ..dao.user import User, get_users, delete_user, update_user
from app.lib.utils import *
from app.dao.user import user_helper

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

admin_router = APIRouter(
    prefix="/api/v1/admin",
    tags=["admin_endpoints"],
    responses={404: {"description": "Not found"}},
)

@admin_router.post("")
async def create_admin(payload: CreateAdminIn, response: Response,):
    admin = jsonable_encoder(payload)
    password_hash = generate_password_hash(admin["password"])
    admin["password"] = password_hash
    admin["created"] = time.time()
    new_admin = await add_admin(admin)
    response.status_code = status.HTTP_201_CREATED
    return new_admin

@admin_router.post("/login")
async def login(payload: AdminLoginIn, response: Response,):
    admin = await retrieve_admin(payload.email)
    if admin:
        if check_password_hash(admin["password"], payload.password):
            response.status_code = status.HTTP_200_OK
            token = create_token(admin["id"], True)
            return {"token": token, "user_id": admin["id"]}
    response.status_code = status.HTTP_401_UNAUTHORIZED
    return {"error": "Invalid credentials"}


# need to be protected
@admin_router.patch("/user")
async def update_user_endpoint(payload: User,response: Response, token: str = Depends(oauth2_scheme)):
    is_token_valid = validate_token(token)
    if not is_token_valid or not is_token_valid[0]["is_admin"]:
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return {"details": "Invalid token"}

    data = jsonable_encoder(payload)
    oid = data["_id"]
    del data["_id"]
    user = await update_user(oid, data)
    response.status_code = status.HTTP_200_OK
    return user    

# need to be protected
@admin_router.get("/user")
async def get_users_endpoint(response: Response, token: str = Depends(oauth2_scheme)):
    is_token_valid = validate_token(token)
    if not is_token_valid or not is_token_valid[0]["is_admin"]:
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return {"details": "Invalid token"}

    users = await get_users()
    result =[]
    for user in users:
        result.append(user_helper(user))
    response.status_code = status.HTTP_200_OK
    return {"data": result}

# need to be protected
@admin_router.delete("/user/{id}")
async def delete_user_endpoint(id: str, response: Response, token: str = Depends(oauth2_scheme)):
    is_token_valid = validate_token(token)
    if not is_token_valid or not is_token_valid[0]["is_admin"]:
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return {"details": "Invalid token"}
        
    if await delete_user(id):
        response.status_code = status.HTTP_200_OK
        return {"data": "User deleted"}
    response.status_code = status.HTTP_404_NOT_FOUND
    return {"error": "User not found"}
