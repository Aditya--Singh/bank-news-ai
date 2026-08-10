from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import app.models
from app.config.settings import get_settings
from app.database.database import Base, engine


settings = get_settings()

from app.api.news import router as news_router
from app.api.dashboard import router as dashboard_router


app = FastAPI(
    title="Bank News AI",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(news_router)
app.include_router(dashboard_router)


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
