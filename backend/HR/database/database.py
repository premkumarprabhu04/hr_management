from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

dotenv_path = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(dotenv_path)

MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

client = AsyncIOMotorClient(MONGODB_URI)
database = client[DATABASE_NAME]
users_collection = database.get_collection("users")
