import secrets
from pydantic import (
    PostgresDsn,
    computed_field,
    model_validator,
    ValidationError,
    Field,
)
from pydantic_settings import BaseSettings, SettingsConfigDict


class BotSettings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file='../../../.env', env_ignore_empty=True, extra='ignore'
    )

    # Env
    ENVIRONMENT: str = 'development'

    # TELEGRAM
    TELEGRAM_BOT_TOKEN: str
    INLINE_KB_BUTTON_ROW_WIDTH: int = 2
    SCHEDULE_HEALTHCHECK: str = '7:00'  # UTC timezone
    REGISTER_PASSPHRASE: str
    CREATOR_ID: str

    # POSTGRES
    POSTGRES_HOST: str = 'postgresql'
    POSTGRES_PORT: str = '5432'
    POSTGRES_USER: str = 'postgres'
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str = 'app'

    # REDIS
    REDIS_HOST: str = 'redis'
    REDIS_PORT: str = '6379'
    REDIS_PASS: str

    # BACKEND
    PROJECT_NAME: str = 'API'
    API_V1_STR: str = '/v1'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    SECRET_KEY: str = Field(default_factory=secrets.token_urlsafe)
    BACKEND_PORT: int = 3030

    # FRONTEND
    FRONTEND_PORT: int = 3000
    DOMAIN: str = 'temnomor.ru'


settings = BotSettings()
