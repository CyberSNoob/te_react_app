import os
import logging
import tradingeconomics as te

from flask_server_api.config import Config
from flask_server_api.constants import TE_FUNCTIONS

logger = logging.getLogger(__name__)

TE_API_KEY = Config.TE_API_KEY

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
        if cls._client is None:
            logger.debug("Not logged in, attempting to log in...")
            te.login(TE_API_KEY)
            cls._client = te
            logger.debug("Successfully logged in with %s", str(TE_API_KEY))
        else:
            logger.debug("Already logged in wit %s", str(TE_API_KEY))

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





