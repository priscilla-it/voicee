import os
from datetime import datetime
from loguru import logger

FILENAME = 'api.log'
RETENTION = 14
ROTATION = '00:00'
FORMAT = '{time:DD/MM/YYYY HH:mm:ss} | {level} | {message}'


def datatime_now() -> str:
    return datetime.now().strftime('%d-%m-%Y')


def set_logger(
    filename: str = FILENAME,
    retention_days: int = RETENTION,
    rotation: str = ROTATION,
    format: str = FORMAT,
) -> None:
    log_dir = 'logs'
    os.makedirs(log_dir, exist_ok=True)
    filepath = os.path.join(log_dir, f'{datatime_now()}_{filename}')
    logger.add(
        filepath,
        rotation=rotation,
        format=format,
        retention=f'{retention_days} days',
        level='DEBUG',
    )


set_logger()
