import os
import logging
from flask import Flask, request, Response, jsonify, send_from_directory
from flask_cors import CORS

from flask_server_api.cache import redis_cache as rc
from flask_server_api.helper_functions import route_guard, url_kwargs
import flask_server_api.utilities as utils
from flask_server_api.constants import DEFAULT_COUNTRY
from flask_server_api.config import Config
from flask_server_api import logging_config

logger = logging.getLogger(__name__)

# logger.info(Config.TE_API_KEY)

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {"origins": Config.FRONTEND_URL, 
                "allow_headers": ["Content-Type", "Authorization"],
                "methods": ['GET', "POST"]}, 
    r"/" : {"origins" : Config.FRONTEND_URL,
            "methods": ['GET']}
})

@app.route('/')
def index():
    return {"status": "alive"}, 200

@app.route('/api/dividends')
@route_guard
def get_dynamic_route():
    # TODAY, START_DATE = cd.today(), cd.get_x_years_ago(1)
    DEFAULT_DATES = {'startDate': '2023-12-01', 'endDate': '2024-01-01'}
    kwargs = url_kwargs(DEFAULT_DATES)
    data = rc.fetch_data("dividends", **kwargs)
    processed_data = utils.prepare_dividends_data(data)
    return Response(processed_data, mimetype="application/json")

@app.route("/api/news")
@route_guard
def get_news():
    kwargs = url_kwargs()
    data = rc.fetch_data('news', **kwargs)
    processed_data = utils.prepare_news_data(data)
    return Response(processed_data, mimetype="application/json")

# forecast?indicator=gdp&country=sweden
@app.route("/api/forecast")
@route_guard
def get_forecast():
    kwargs = url_kwargs(DEFAULT_COUNTRY)
    data = rc.fetch_data('forecast', **kwargs)
    processed_data = utils.prepare_forecast_data(data)
    return Response(processed_data, mimetype="application/json")

@app.route("/api/eurostat")
@route_guard
def get_eurostat():
    kwargs = url_kwargs({'ID': '24804'})
    data = rc.fetch_data('eurostat', **kwargs)
    processed_data = utils.prepare_eurostat_data(data)
    return Response(processed_data, mimetype="application/json")

@app.route('/api/search', methods=['POST'])
@route_guard
def post_search():
    test_data = request.json
    kwargs = url_kwargs(test_data)
    data = rc.fetch_data('search', **kwargs)
    return jsonify(data)


@app.route('/api/contactform', methods=['POST'])
@route_guard
def post_contactform():
    form_data = request.json
    logger.info(form_data)
    return jsonify(form_data)


if __name__ == '__main__':
    import sys
    import uvicorn

# no async now endpoint now but could change
# possible change in the future to use fastapi instead of flask
    # if sys.platform.startswith('win'):
    #     asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    # uvicorn.run("server:app", host=Config.DEFAULT_HOST, port=Config.FLASK_PORT, reload=True)
    logger.info("HOST: %s, PORT: %s", Config.DEFAULT_HOST, Config.FLASK_PORT)
    app.run(debug=True, host=Config.DEFAULT_HOST, port=Config.FLASK_PORT)



