from fastapi import Response, status, APIRouter, status, Depends, Header
from werkzeug.security import generate_password_hash
from fastapi.security import OAuth2PasswordBearer

from ..dao.user import User, UpdateUser, get_user_by_email
from ..dao.user import get_users, add_user, retrieve_user
from app.lib.models import LoginIn, UserIn
from app.lib.utils import *
from fastapi.encoders import jsonable_encoder


user_router = APIRouter(
    prefix="/api/v1/user",
    tags=["user_endpoint"],
    responses={404: {"description": "Not found"}},
)

@user_router.post("/login")
async def login(payload: LoginIn, response: Response):
    result = await retrieve_user(payload.email)
    print(result)
    if result == None:
        # if their is no user with that email
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"detail": "Not found"}
    # if the email was found
    if validate_credentails(payload.password,result["password"]):
        print(result["id"])
        token = create_token(result["id"], False)
        return {"token": token, "user_id": result["id"]}
    response.status_code = status.HTTP_401_UNAUTHORIZED
    return {"details": "Password in correct"}

@user_router.post("/register")
async def create_user(payload: UserIn, response: Response):
    hashed_password = generate_password_hash(payload.password, method='sha256')
    new_user = UpdateUser(username=payload.username, email=payload.email, password=hashed_password, created=time.time())
    encoded = jsonable_encoder(new_user)
    result = await add_user(encoded)
    if "error" in result.keys():
        response.status_code = status.HTTP_400_BAD_REQUEST
        return result
    return {"details": "success"}