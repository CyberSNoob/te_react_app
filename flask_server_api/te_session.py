import logging
import tradingeconomics as te

from flask_server_api.config import Config
from flask_server_api.constants import TE_FUNCTIONS

logger = logging.getLogger(__name__)


def init_client(func):
    @classmethod
    def wrapper(cls, *args, **kwargs):
        cls.init()
        return func(cls, *args, **kwargs)
    return wrapper

class TEAdapter():
    _client = None
    
    @classmethod
    def init(cls):
        TE_API_KEY = Config.TE_API_KEY

        if cls._client is None:
            logger.debug("Not logged in, attempting to log in...")
            try:
                te.login(TE_API_KEY)
            except Exception as e:
                logger.error('Login failed with %s, reason: %s', TE_API_KEY, e)
                TE_API_KEY = Config.DEFAULT_API_KEY
                try:
                    te.login(TE_API_KEY)
                except Exception as fallback_error:
                    raise PermissionError(f"Fallback login failed, unable to login with {Config.TE_API_KEY} or {Config.DEFAULT_API_KEY}.") from fallback_error
            cls._client = te
            logger.debug("Successfully logged in with %s", TE_API_KEY)
        else:
            logger.debug("Already logged in with %s", TE_API_KEY)

    @init_client
    def fetch(cls, data_kind, **kwargs):
        cls.init()
        if data_kind not in TE_FUNCTIONS:
            raise ValueError(f"Unknown kind: {data_kind}")
        method_name = TE_FUNCTIONS.get(data_kind)
        if not method_name:
            raise ValueError(f"Tradingeconomics doesn't have method {method_name}")
        try:
            method = getattr(cls._client, TE_FUNCTIONS[data_kind])
        except AttributeError as e:
            raise AttributeError(f"Client doesn't have method named {method_name}. Error: {e}") from e
        if not callable(method):
            raise TypeError(f"Attribute {method_name} is not callable on client.")
        return method(**kwargs)
    

    @init_client
    def test_fetch_news(cls):
        print(cls._client)
        return cls._client.getNews()





