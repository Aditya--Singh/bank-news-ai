from fastapi import APIRouter, BackgroundTasks, Depends

from app.auth.dependencies import require_admin
from app.models.user import User
from app.services.news_pipeline import NewsPipelineService


router = APIRouter(
    prefix="/api/admin",
    tags=["Administration"],
)


@router.post("/news/ingest")
def ingest_news(
    background_tasks: BackgroundTasks,
    current_user: User = Depends(require_admin),
):
    background_tasks.add_task(NewsPipelineService().run)

    return {
        "status": "started",
        "message": "News ingestion and AI analysis started.",
    }
