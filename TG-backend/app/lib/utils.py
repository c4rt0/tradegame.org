from bson import ObjectId
import jwt
import os
import time
from werkzeug.security import check_password_hash
import logging


def validate_token(token: str) -> dict:
    # this function checks if the signature of the token is valid
    token = str(token)
    try:
        data = jwt.decode(
            token, os.environ["jwt_secret"], algorithms=os.environ["jwt_algo"]
        )
        print(data)
        return (data,)
    except Exception as e:
        logging.error(e)
        return False


def validate_credentails(plain_pw: str, hashed_pw: str):
    result = check_password_hash(hashed_pw, plain_pw)
    return result


def create_token(user_id: str, is_admin: bool):
    # creates a token that is used to authenticate the user
    timeout_time = 60 * 60 * 4  # seconds, minutes, hours
    expire_time = time.time() + timeout_time
    token = jwt.encode(
        {
            "userid": user_id,
            "is_admin": is_admin,
            "exp": int(expire_time),
            "creationTime": str(time.time()),
        },
        os.environ["jwt_secret"],
        algorithm=os.environ["jwt_algo"],
    )
    # return token.decode('utf-8')
    return token


# https://github.com/c4rt0/mongodb-with-fastapi/blob/master/app.py
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")
