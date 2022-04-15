import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request, Depends
from fastapi_utils.tasks import repeat_every

from app.lib.config import parse_config
from dotenv import load_dotenv
from app.endpoints.admin import admin_router
from app.endpoints.trade import trade_router
from app.endpoints.leaderboard import leaderboard
from app.endpoints.user import user_router
from app.lib.alpaca import update_stock

parse_config()

load_dotenv()  # take environment variables from .env.

# --- FastAPI Server Initialization -------------------------------------------

# Initiating FastAPI Server
app = FastAPI()
@app.on_event("startup")
@repeat_every(seconds=60 * 60)  # 1 hour
async def update_stock_data() -> None:
    parse_config()
    await update_stock()

app.include_router(admin_router)
app.include_router(trade_router)
app.include_router(leaderboard)
app.include_router(user_router)

# # Managing CORS for the React Frontend connections
origins = [
    "http://localhost",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)