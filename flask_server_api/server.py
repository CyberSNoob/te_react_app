import asyncio
from flask import Flask, request, Response, jsonify
from flask_cors import CORS

from flask_server_api.cache import redis_cache as rc
from flask_server_api.helper_functions import route_guard, url_kwargs
import flask_server_api.utilities as utils
from flask_server_api.te_session import TEAdapter as te

app = Flask(__name__)
CORS(app)

DEFAULT_COUNTRIES = {'country' : 'Mexico, New Zealand, Sweden, Thailand'}
DEFAULT_COUNTRY = {'country': ['sweden']}

@app.route('/')
def index():
    return "<h1>Index</h1>"

@app.route('/dividends')
@route_guard
def get_dynamic_route():
    # TODAY, START_DATE = cd.today(), cd.get_x_years_ago(1)
    DEFAULT_DATES = {'startDate': '2023-12-01', 'endDate': '2024-01-01'}
    kwargs = url_kwargs(DEFAULT_DATES)
    data = rc.fetch_data("dividends", **kwargs)
    processed_data = utils.prepare_dividends_data(data)
    return Response(processed_data, mimetype="application/json")

@app.route("/news")
@route_guard
def get_news():
    kwargs = url_kwargs()
    data = rc.fetch_data('news', **kwargs)
    processed_data = utils.prepare_news_data(data)
    return Response(processed_data, mimetype="application/json")

# forecast?indicator=gdp&country=sweden
@app.route("/forecast")
@route_guard
def get_forecast():
    kwargs = url_kwargs(DEFAULT_COUNTRY)
    data = rc.fetch_data('forecast', **kwargs)
    processed_data = utils.prepare_forecast_data(data)
    return Response(processed_data, mimetype="application/json")

@app.route("/eurostat")
@route_guard
def get_updates():
    kwargs = url_kwargs({'ID': '24804'})
    data = rc.fetch_data('eurostat', **kwargs)
    processed_data = utils.prepare_eurostat_data(data)
    return Response(processed_data, mimetype="application/json")

@app.route('/search', methods=['POST'])
@route_guard
def get_search():
    test_data = request.json
    kwargs = url_kwargs(test_data)
    data = rc.fetch_data('search', **kwargs)
    return jsonify(data)


if __name__ == '__main__':
    import sys
    import uvicorn

    if sys.platform.startswith('win'):
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    uvicorn.run("server:app", reload=True)
