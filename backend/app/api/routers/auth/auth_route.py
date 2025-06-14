from fastapi import APIRouter, Depends

from config import auth_backend, fastapi_users, current_superuser
from app.database.schemas import UserCreate, UserRead, UserUpdate


router = APIRouter(prefix='/auth', tags=['auth'])


router.include_router(fastapi_users.get_auth_router(auth_backend))
router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    dependencies=[Depends(current_superuser)],
)
router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    dependencies=[Depends(current_superuser)],
)
