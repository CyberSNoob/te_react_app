import os

if os.getenv('FLASK_ENV') == 'development':
    from dotenv import load_dotenv
    load_dotenv()

class Config:
    DEFAULT_API_KEY = os.getenv('DEFAULT_API_KEY', 'guest:guest')
    TE_API_KEY = os.getenv('TE_API_KEY', DEFAULT_API_KEY)

    DEFAULT_HOST = os.getenv('DEFAULT_HOST', 'localhost')
    FLASK_PORT = int(os.getenv('FLASK_PORT', 5000))
    VITE_PORT = int(os.getenv('VITE_PORT', 3000))

    REDIS_HOST = os.getenv('REDIS_HOST', 'localhost')
    REDIS_PORT = int(os.getenv('REDIS_PORT', 6379))

    DEVELOPMENT = os.getenv('FLASK_ENV', 'production') == 'development'
    REDIS_URL = os.getenv('REDIS_URL', f'redis://{DEFAULT_HOST}:{REDIS_PORT}')
    FRONTEND_URL = os.getenv('FRONTEND_URL', f"http://{DEFAULT_HOST}:{VITE_PORT}")
    VITE_API_URL = os.getenv('VITE_API_URL', f"http://{DEFAULT_HOST}:{FLASK_PORT}")
    TE_API_URL = os.getenv('TE_API_URL')

