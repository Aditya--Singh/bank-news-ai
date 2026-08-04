from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    APP_NAME: str

    ENV: str

    HOST: str

    PORT: int

    DATABASE_URL: str

    OLLAMA_URL: str

    LLM_MODEL: str

    EMBEDDING_MODEL: str

    LOG_LEVEL: str

    class Config:
        env_file = ".env"


settings = Settings()