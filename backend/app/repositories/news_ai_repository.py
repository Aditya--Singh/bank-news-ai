from sqlalchemy.orm import Session

from app.models.news_ai_analysis import NewsAIAnalysis


class NewsAIRepository:
    def __init__(self, db: Session):
        self.db = db

    def save(
        self,
        news_id: int,
        analysis,
        processing_time_ms: int,
        model_provider: str,
        model_name: str,
    ):

        row = NewsAIAnalysis(
            news_id=news_id,
            model_provider=model_provider,
            model_name=model_name,
            prompt_version="v1",
            executive_summary=analysis.executive_summary,
            summary=analysis.summary,
            sentiment=analysis.sentiment,
            importance=analysis.importance,
            risk_level=analysis.risk_level,
            banks=analysis.banks,
            organizations=analysis.organizations,
            keywords=analysis.keywords,
            topics=analysis.topics,
            processing_time_ms=processing_time_ms,
        )

        self.db.add(row)
        self.db.commit()

        return row
