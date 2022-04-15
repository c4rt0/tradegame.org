import toml
import os
from dataclasses import dataclass


def parse_config():
    with open("conf.toml") as file:
        config = toml.load(file)
        set_env(config)
        return config


def set_env(data):
    os.environ["database_url"] = data["database"]["url"]
    os.environ["database_name"] = data["database"]["database_name"]

    os.environ["admin_token"] = data["Service"]["admin_token"]
    os.environ["jwt_secret"] = data["Service"]["jwt_secret"]
    os.environ["jwt_algo"] = data["Service"]["jwt_algo"]
    
    os.environ["alpaca_api_id"] = data["alpaca"]["api_id"]
    os.environ["alpaca_api_secret"] = data["alpaca"]["api_secret"]
