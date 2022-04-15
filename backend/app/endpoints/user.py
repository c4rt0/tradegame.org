from fastapi import Response, status, APIRouter, status, Depends, Header
from werkzeug.security import generate_password_hash
from fastapi.security import OAuth2PasswordBearer
import json
from bson import json_util, ObjectId

from app.lib.alpaca import add_Symbol, get_stocks_from_db
from ..dao.user import UpdateUserPass, User, UpdateUser, delete_user, get_user, get_user_by_email, insert_stock_whishlist, ressetAccountUser, update_user, update_user_pass, updateLogin
from ..dao.user import get_users, add_user, retrieve_user
from app.lib.models import LoginIn, UserID, UserIn, UserLogUp, UserUp, UserUpPass, WhishList
from app.lib.utils import *
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
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
    new_user = UpdateUser(isLogIn=False, username=payload.username, email=payload.email, password=hashed_password, created=time.time(),)
    encoded = jsonable_encoder(new_user)
    result = await add_user(encoded)
    if "error" in result.keys():
        response.status_code = status.HTTP_400_BAD_REQUEST
        return result
    return {"details": "success"}



@user_router.post("/updateUser")
async def updateUser(payload: UserUp, response: Response):
    new_user = UpdateUser( username=payload.username, email=payload.email,  updated=time.time(),)
    encoded = jsonable_encoder(new_user)
    result = await update_user(payload.id, new_user)
    if result==False:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return result
    return {"details": "success"}

@user_router.post("/updateUserPassword")
async def updateUserPassword(payload: UserUpPass, response: Response):
    hashed_password = generate_password_hash(payload.password, method='sha256')
    new_user = UpdateUserPass(password = hashed_password)
    encoded = jsonable_encoder(new_user)
    result = await update_user_pass(payload.id, new_user)
    if result==False:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return result
    return {"details": "success"}

@user_router.post("/ressetAccount")
async def ressetAccount(payload: UserLogUp, response: Response):
    result = await ressetAccountUser(payload.id)
    if result==False:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return result
    return {"details": "success"}   

@user_router.post("/updateUserLogin")
async def updateUserLogin(payload: UserLogUp, response: Response):
    new_user = UserLogUp(isLogIn=payload.isLogIn, id=payload.id)
    encoded = jsonable_encoder(new_user)
    result = await updateLogin(payload.id, new_user)
    if result==False:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return result
    return {"details": "success"}


@user_router.post("/getUserByID")
async def getUserByID(payload: UserID, response: Response):
    result = await get_user(payload.id)
    if "error" in result.keys():
        response.status_code = status.HTTP_400_BAD_REQUEST
        return result
    print(response)
    return JSONResponse(json.loads(json_util.dumps(result)));

@user_router.post("/addWhishlist")
async def addStockinWhishlist(payload : WhishList):
     user = await get_user(payload.id);
     upUser=dict(user);
     available_stocks = await get_stocks_from_db()
     flag='false'
     for stock in available_stocks:

      if stock["symbol"] == payload.symbol:
        flag='true';


     if(flag=='false'):
       await add_Symbol(payload.symbol);

     if(upUser.__contains__('whishlist')):
       if(payload.isAdd):
           x=user['whishlist']
           x.append(payload.symbol)
           result= await insert_stock_whishlist(payload.id,x);
           return result
        
       else:
           x=user['whishlist']
           x.remove(payload.symbol)
           result= await insert_stock_whishlist(payload.id,x);
           return result 
               
     else:
        stock=[]
        stock.append(payload.symbol)
        result= await insert_stock_whishlist(payload.id,stock);
        return result
@user_router.get("/getAllUsers")
async def getAllUsers( response: Response):
    result = await get_users()
    return JSONResponse(json.loads(json_util.dumps(result)));

@user_router.delete("/deleteUserById")
async def deleteUserById( payload: UserID, response: Response):
    result = await delete_user(payload.id)
    return JSONResponse(json.loads(json_util.dumps(result)));