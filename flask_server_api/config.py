import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    TE_API_KEY = os.getenv('TE_API_KEY', 'guest:guest')
    DEFAULT_HOST = os.getenv('DEFAULT_HOST')
    REDIS_HOST = os.getenv('DEFAULT_HOST')
    REDIS_PORT = int(os.getenv('REDIS_PORT'))
    TE_API_URL = os.getenv('TE_API_URL')
    FLASK_PORT = int(os.getenv('FLASK_PORT'))