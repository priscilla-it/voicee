# TODO:

from datetime import datetime
from fastapi_users.db import SQLAlchemyBaseUserTable
from sqlmodel import Field, SQLModel
from sqlalchemy import (
    Column,
    ForeignKey,
    Integer,
    String,
    TIMESTAMP,
    Boolean,
    JSON,
    func,
)
from app.core.db import Base


# Auth: Users & Roles
class Role(Base):
    __tablename__ = 'role'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    permissions = Column(JSON)


class User(SQLAlchemyBaseUserTable[int], Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    email = Column(String, nullable=False)
    hashed_password = Column(String(length=1024), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    is_superuser = Column(Boolean, default=False, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)
    username = Column(String, nullable=False)
    registered_at = Column(TIMESTAMP, default=datetime.now())
    role_id = Column(Integer, ForeignKey(Role.id))
