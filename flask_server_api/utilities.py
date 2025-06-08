import os
import logging
from typing import Optional, Any, Dict
from urllib.parse import urljoin

import pandas as pd
import aiohttp
from flask_server_api import custom_date as cd
from flask_server_api import logging_config
from flask_server_api.config import Config

API_KEY = Config.TE_API_KEY
HEADERS = {"Authorization":API_KEY, "f":"json"}
ROOT_URL = Config.TE_API_URL
logger = logging.getLogger(__name__)

logger.debug(f"API key found: {API_KEY}" if API_KEY else
      "No API key found, please set the API_KEY in the environment variable before continuing.")

def preprocess_data(df, new_column_order, new_column_names, sort_values):
    # rename, modify columns and sort based on values
    df.rename(columns=new_column_names, inplace=True)
    df = df[new_column_order]
    df.sort_values(by=sort_values, inplace=True, ascending=False)
    return df

def prepare_dividends_data(json_data):
    df = pd.DataFrame(json_data)
    new_column_order = ['Name', 'Symbol', 'Actual', 'Ex-Date', 'Pay-Date', 'Currency', 'Last Updated']
    new_column_names = {'DateEx': 'Ex-Date', 'DatePayment' : 'Pay-Date', 'LastUpdate': 'Last Updated'}
    sort_values = 'Last Updated'
    df = preprocess_data(df, new_column_order, new_column_names, sort_values)
    df[sort_values] = cd.default_format(df[sort_values])
    return df.to_json(orient="records")

def prepare_news_data(json_data):
    df = pd.DataFrame(json_data)
    new_column_order = ['Importance', 'Title', 'Symbol', 'Description', 'Date', 'Country', 'Category', 'Id', 'Url']
    new_column_names = {column:column.capitalize() for column in df.columns}
    sort_values = ["Importance", "Date"]
    date = sort_values[1]
    df = preprocess_data(df, new_column_order, new_column_names, sort_values)
    df[date] = cd.default_format(df[date], cd.DATE_FORMAT)
    return df.to_json(orient="records")

def prepare_forecast_data(json_data):
    df = pd.DataFrame(json_data)
    dates = [f'q{i}_date' for i in range(1,5)]
    for d in dates:
        df[d] = cd.default_format(df[d], cd.DATE_FORMAT)
    latest_value_date = 'LatestValueDate'
    df[latest_value_date] = cd.default_format(df[latest_value_date], cd.DATE_FORMAT)
    return df.to_json(orient='records')

def prepare_eurostat_data(json_data):
    df = pd.DataFrame(json_data)
    df['Date'] = cd.default_format(df['Date'], cd.DATE_FORMAT)
    return df.to_json(orient='records')


# these are not used, it's for url requests.

async def custom_response(response):
    logger.info(response.url)
    if response.status == 200:
        return await response.json()
    logger.error("Status: %d, content: %s", response.status, response.text())
    return None

async def _fetch_api(view) -> Optional[Dict[str, Any]]:
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(urljoin(ROOT_URL, view.lstrip('/')),
                                   headers=HEADERS) as response:
                return await custom_response(response)
    except aiohttp.ClientError as e:
        logger.error("API error: %s", e)
        return None

async def fetch_te_data(view) -> Optional[Any]:
    data = await _fetch_api(view)
    return data

async def fetch(url:str) -> Optional[Dict[str, Any]]:
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                return await custom_response(response)
    except aiohttp.ClientError as e:
        logger.error("API error: %s", e)
        return None
