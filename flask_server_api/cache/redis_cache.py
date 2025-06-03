from flask_server_api.te_session import TEAdapter
from flask_server_api.cache.aiocache_handler import redis_cache

# test tradingeconomics getnews function
def fetch():
    return TEAdapter.test_fetch_news()


# use tradingeconomics package, accepts one data_kind
@redis_cache(ttl=3600)
def fetch_data(data_kind, **kwargs):
    return TEAdapter.fetch(data_kind, **kwargs)





