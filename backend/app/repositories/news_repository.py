from typing import Set

from sqlalchemy.orm import Session

from app.models.news import News
from app.schemas.news import NewsArticle


class NewsRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_existing_urls(self) -> Set[str]:
        """Return all existing article URLs as a Python set."""
        return {row[0] for row in self.db.query(News.url).all()}

    def save(self, article: NewsArticle):

        news = News(
            source=article.source,
            headline=article.headline,
            url=article.url,
            publish_date=article.publish_date,
            author=article.author,
            publisher=article.publisher,
            content=article.content,
            category=article.category,
        )

        self.db.add(news)
        self.db.commit()
        self.db.refresh(news)

        return news

    def get_pending_ai(self):

        return self.db.query(News).filter(News.ai_status == "pending").all()

    def update_ai_status(
        self,
        news_id: int,
        status: str,
    ):
        article = self.db.get(News, news_id)

        article.ai_status = status

        self.db.commit()
