#!/usr/bin/env python3
import os
import motor.motor_asyncio
# Importing dotenv to avoid sensitive data leak to opensource repo
from app.lib.config import parse_config

parse_config()

client = motor.motor_asyncio.AsyncIOMotorClient(
    os.environ["database_url"], uuidRepresentation="standard"
)
# MongoDB database instance ("DB" by default, can be changed)
database = client[os.environ["database_name"]]

# MongoDB users collection instance ("users" by default, can be changed)
collection = database["users"]