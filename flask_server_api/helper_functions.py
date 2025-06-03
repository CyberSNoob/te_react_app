from collections.abc import Iterable
from functools import wraps
import logging

from flask import jsonify, request
from flask_server_api.exceptions import DataNotFoundError
from flask_server_api import logging_config

logger = logging.getLogger(__name__)


def url_kwargs(defaults=None):
    # make a string of default values and then a list
    def process_val(val):
        if isinstance(val, str) and ',' in val:
            return val.split(',')
        if isinstance(val, (list, tuple)):
            return val
        return val

    if not defaults:
        return {}
    kwargs = {k: process_val(v) for k,v in defaults.items()}
    logger.info(kwargs)

    # append user entered args to kwargs if not in defaults
    extra_args = { k: v.split(",") for k, v in request.args.items() if k not in defaults }
    kwargs.update(extra_args)
    return kwargs


def route_guard(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except DataNotFoundError as e:
            return jsonify({"error": str(e)}), 404
        except Exception as e:
            logger.exception("Unhandled error in %s", func.__name__)
            return jsonify({"error": str(e)}), 500
    return wrapper
