from sqlalchemy import (
    JSON,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import relationship

from app.database.database import Base


class NewsAIAnalysis(Base):
    __tablename__ = "news_ai_analysis"

    id = Column(Integer, primary_key=True)

    news_id = Column(
        Integer,
        ForeignKey("news.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    model_provider = Column(String(50), nullable=False)

    model_name = Column(String(100), nullable=False)

    prompt_version = Column(String(20), nullable=False)

    executive_summary = Column(JSON)

    summary = Column(Text)

    sentiment = Column(String(20))

    importance = Column(String(20))

    risk_level = Column(String(20))

    banks = Column(JSON)

    organizations = Column(JSON)

    keywords = Column(JSON)

    topics = Column(JSON)

    processing_time_ms = Column(Integer)

    created_at = Column(DateTime)

    news = relationship(
        "News",
        back_populates="analyses",
    )
