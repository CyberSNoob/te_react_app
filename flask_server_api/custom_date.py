import datetime as dt
import logging
import pandas as pd

DATE_FORMAT="%Y-%m-%d"
DATETIME_FORMAT="%Y-%m-%d %H:%M:%S"

def get_x_years_ago(year=1):
    return default_format(dt.datetime.now()-dt.timedelta(days=year*365))

def default_format(col, fmt=DATETIME_FORMAT):
    try:
        dt_series = pd.to_datetime(col, errors='coerce')
        return dt_series.dt.strftime(fmt)
    except AttributeError:
        logging.error("Input needs to be a date!".upper())
        raise
    except ValueError:
        logging.error("Invalid date (format) entered. Format needs to be %s", fmt)
        raise

def today():
    # return dt.datetime.now().strftime(DATE_FORMAT)
    return default_format(dt.datetime.now())
