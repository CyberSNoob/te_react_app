import logging
from functools import wraps
import json
import redis
from flask_server_api import  logging_config

logger = logging.getLogger(__name__)

r = redis.Redis(host="localhost", port=6379, db=0)
REDIS_AVAILABLE = False
try:
    r.ping()
    REDIS_AVAILABLE = True
except redis.ConnectionError as e:
    logger.error("Not connected to redis server: %s", e)

def _custom_key_builder(func, *args, **kwargs):
    logger.info("Custom key builder function")
    # if endpoint and/or options are empty, don't join, just return function name
    endpoint = "/".join(str(a) for a in args if a)
    options = ",".join(f"{k}={v}" for k,v in kwargs.items())
    key_ingredients = [func.__name__, endpoint, options]
    key = ":".join(k for k in key_ingredients if k)
    logger.info("Cache key: %s", key)
    return key


def redis_cache(ttl=60):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if REDIS_AVAILABLE:
                logger.debug("Redis is available.")
                key = _custom_key_builder(func, *args, **kwargs)
                try:
                    cache_data = r.get(key)
                    if cache_data:
                        logger.info("cache found, loading from cache")
                        return json.loads(cache_data.decode())
                    logger.info("No cache available, attempt caching".upper())
                except redis.RedisError as e:
                    logger.error("Redis get key: %s failed. %s", key, e)

                api_data = func(*args, **kwargs)

                if api_data:
                    try:
                        r.setex(key, ttl, json.dumps(api_data, default=str))
                    except (TypeError, redis.RedisError) as e:
                        logger.warning("Failed to cache key %s due to error: %s", key, e)
                return api_data
            logger.warning("Failed to use cache data, fetching directly.")
            return func(*args, **kwargs)
        return wrapper
    return decorator
