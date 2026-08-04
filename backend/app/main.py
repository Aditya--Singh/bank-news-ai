from fastapi import FastAPI

import app.models
from app.config.settings import settings
from app.database.database import Base, engine

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
)

Base.metadata.create_all(bind=engine)


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
