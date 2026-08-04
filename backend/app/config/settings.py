from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str
    ENV: str
    HOST: str
    PORT: int

    DATABASE_URL: str

    LOG_LEVEL: str

    OLLAMA_URL: str
    LLM_MODEL: str
    EMBEDDING_MODEL: str

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
    )


@lru_cache
def get_settings():
    return Settings()


settings = get_settings()
