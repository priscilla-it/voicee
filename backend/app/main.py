import os
import socket
from datetime import datetime
from contextlib import asynccontextmanager
from typing import AsyncGenerator
from icecream import ic  # type: ignore
from fastapi import FastAPI
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.routing import APIRoute
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from redis import asyncio as aioredis
from app.logger import logger
from app.api.main import api_router
from app.core.config import settings


def custom_generate_unique_id(route: APIRoute) -> str:
    return f'{route.name}'


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    redis_url = f'redis://{settings.REDIS_SERVER}:{settings.REDIS_PORT}'

    redis = aioredis.from_url(
        redis_url, encoding='utf8', decode_responses=True
    )

    FastAPICache.init(RedisBackend(redis), prefix='fastapi-cache')

    yield


app = FastAPI(
    lifespan=lifespan,
    title=settings.PROJECT_NAME,
    openapi_url=f'{settings.API_V1_STR}/openapi.json',
    servers=[
        {
            'url': f'https://api.{settings.DOMAIN}',
            'description': f'{settings.ENVIRONMENT}',
        }
    ],
    generate_unique_id_function=custom_generate_unique_id,
    redoc_url=None,
)

origins = []

# Development origins
if settings.ENVIRONMENT == 'development':
    origins.extend(
        [
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            'http://0.0.0.0:3000',
        ]
    )

# Security middleware configuration
if settings.ENVIRONMENT == 'production':
    app.add_middleware(HTTPSRedirectMiddleware)
    app.add_middleware(
        TrustedHostMiddleware, allowed_hosts=[f'{settings.DOMAIN}']
    )
else:
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=[settings.DOMAIN, '0.0.0.0', '127.0.0.1'],
    )

static_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')
app.mount('/static', StaticFiles(directory=static_dir), name='static')


@app.get('/', include_in_schema=False)
def read_root():
    return {'message': 'API V1'}


api_prefix = settings.API_V1_STR
app.include_router(api_router, prefix=settings.API_V1_STR)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)
