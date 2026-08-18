from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )

    database_url: str = "sqlite:///news.db"

    ollama_base_url: str = "http://localhost:11434"

    ollama_model: str = "qwen3:8b"

    timezone: str = "Asia/Kolkata"

    news_cutoff_date: str = "2026-06-20"

    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    jwt_expiration_minutes: int = 480


@lru_cache
def get_settings() -> Settings:
    return Settings()


# Singleton instance
settings = get_settings()
