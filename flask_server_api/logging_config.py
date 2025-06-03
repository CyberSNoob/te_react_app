import logging
import coloredlogs

logger = logging.getLogger()
logger.setLevel(logging.INFO)

# customized format
# log_format = "%(asctime)s %(levelname)s: %(message)s"
log_format = "%(levelname)s: %(message)s"

# Apply coloredlogs globally
coloredlogs.install(level='INFO', logger=logger, fmt=log_format)