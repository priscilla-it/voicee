from pydantic import BaseSettings


class BotSettings(BaseSettings):
    ENVIRONMENT: str = 'development'

    TELEGRAM_BOT_TOKEN: str

    REGISTER_PASSPHRASE: str
    CREATOR_ID: str

    POSTGRES_HOST: str = 'postgresql'
    POSTGRES_PORT: str = '5432'
    POSTGRES_USER: str = 'postgres'
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str = 'app'

    REDIS_HOST: str = 'redis'
    REDIS_PORT: str = '6379'
    REDIS_PASS: str

    INLINE_KB_BUTTON_ROW_WIDTH: int = 2
    SCHEDULE_HEALTHCHECK: str = '7:00'  # !!!UTC timezone!!!

    class Config:
        env_file = '../../.env'


settings = BotSettings()
