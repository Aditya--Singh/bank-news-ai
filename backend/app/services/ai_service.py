from app.ai.processor import AIProcessor
from app.database.database import SessionLocal
from app.repositories.news_ai_repository import NewsAIRepository
from app.repositories.news_repository import NewsRepository
from app.config.settings import get_settings

settings = get_settings()


class AIService:
    def run(self):

        db = SessionLocal()

        news_repo = NewsRepository(db)
        ai_repo = NewsAIRepository(db)

        processor = AIProcessor()

        articles = news_repo.get_pending_ai()

        print(f"{len(articles)} articles pending")

        for article in articles:
            news_repo.update_ai_status(
                article.id,
                "processing",
            )

            try:
                analysis, ms = processor.process(
                    article.headline,
                    article.content,
                )

                ai_repo.save(
                    news_id=article.id,
                    analysis=analysis,
                    processing_time_ms=ms,
                    model_provider="ollama",
                    model_name=settings.ollama_model,
                )

                news_repo.update_ai_status(
                    article.id,
                    "completed",
                )

                print(f"✓ {article.headline}")

            except Exception as e:
                db.rollback()
                news_repo.update_ai_status(
                    article.id,
                    "failed",
                )

                print(e)

        db.close()
