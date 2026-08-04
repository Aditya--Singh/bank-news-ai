from fastapi import FastAPI

from app.config.settings import settings

app = FastAPI(title=settings.APP_NAME)


@app.get("/")
def home():

    return {
        "application": settings.APP_NAME,
        "status": "running"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }