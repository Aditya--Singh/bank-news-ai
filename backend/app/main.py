from fastapi import FastAPI

from app.config.settings import settings

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
)


@app.get("/")
def home():
    return {
        "application": settings.APP_NAME,
        "environment": settings.ENV,
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }
