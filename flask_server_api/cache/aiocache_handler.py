import logging
from functools import wraps
import json
import redis
from flask_server_api import  logging_config
from flask_server_api.config import Config

logger = logging.getLogger(__name__)

if Config.DEVELOPMENT:
    r = redis.Redis(host=Config.REDIS_HOST, port=Config.REDIS_PORT, db=0)
    try:
        r.ping()
        logger.info('Redis available: %r', True)
    except redis.ConnectionError as e:
        logger.error("Not connected to redis server: %s", e)
else:
    try:
        r = redis.from_url(Config.REDIS_URL)
        r.ping()
        logger.info('Redis available: %r', True)
    except redis.ConnectionError as e:
        logger.error("No redis available")

def _custom_key_builder(func, *args, **kwargs):
    logger.info("Custom key builder function")
    endpoint = "/".join(str(a) for a in args if a)
    options = ",".join(f"{k}={v}" for k,v in kwargs.items())
    key_ingredients = [func.__name__, endpoint, options]
    key = ":".join(k for k in key_ingredients if k)
    logger.info("Cache key: %s", key)
    return key

# TODO: fix halfway outage
def redis_cache(ttl=60):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if getattr(wrapper, '_redis_disabled', False):
                logger.warning('Problem with redis connection, bypassing cache.')
                return func(*args, **kwargs)
            
            logger.debug("Redis is available.")
            key = _custom_key_builder(func, *args, **kwargs)
            try:
                logger.info("Try to get key: %s", key)
                cache_data = r.get(key)
                if cache_data:
                    logger.info("cache found, loading from cache")
                    return json.loads(cache_data.decode())
                logger.info("No cache available, attempt caching".upper())
            except redis.RedisError as e:
                logger.error("Redis get key: %s failed. %s", key, e)
                setattr(wrapper, '_redis_disabled', True)
                return func(*args, **kwargs)

            api_data = func(*args, **kwargs)

            if api_data:
                try:
                    logger.info("Try setting key: %s", key)
                    r.setex(key, ttl, json.dumps(api_data, default=str))
                    logger.info("Succesfully cached key: %s", key)
                except (TypeError, redis.RedisError) as e:
                    logger.warning("Failed to cache key %s due to error: %s", key, e)
                    setattr(wrapper, '_redis_disabled', True)
            return api_data
        
        return wrapper
    return decorator
