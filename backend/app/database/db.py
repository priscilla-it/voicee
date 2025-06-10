from typing import AsyncGenerator
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.ext.asyncio import (
    AsyncAttrs,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from app.core.config import settings


class Base(AsyncAttrs, DeclarativeBase):
    pass


async_engine = create_async_engine(
    str(settings.SQLALCHEMY_DATABASE_URI), echo=False
)
async_session = async_sessionmaker(
    async_engine, class_=AsyncSession, expire_on_commit=False
)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        yield session
