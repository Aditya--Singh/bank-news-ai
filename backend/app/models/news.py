from sqlalchemy import Column, DateTime, Integer, String, Text
from sqlalchemy.orm import relationship

from app.database.database import Base


class News(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True)

    external_id = Column(Integer, unique=True, index=True)

    source = Column(String(100), nullable=False)

    headline = Column(Text, nullable=False)

    url = Column(String(500), unique=True, nullable=False)

    publish_date = Column(DateTime, nullable=False)

    author = Column(String(200))

    publisher = Column(String(200))

    category = Column(String(100))

    content = Column(Text, nullable=False)

    scraped_at = Column(DateTime)

    ai_status = Column(
        String(20),
        nullable=False,
        default="pending",
    )

    analyses = relationship(
        "NewsAIAnalysis",
        back_populates="news",
        cascade="all, delete-orphan",
    )
