from sqlalchemy import Column, DateTime, Integer, String, Text

from app.database.database import Base


class News(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True, index=True)

    source = Column(String(100), nullable=False)

    headline = Column(Text, nullable=False)

    url = Column(String(500), unique=True, nullable=False, index=True)

    publish_date = Column(DateTime, nullable=False)

    author = Column(String(200), nullable=True)

    publisher = Column(String(200), nullable=True)

    summary = Column(Text, nullable=True)

    content = Column(Text, nullable=False)

    category = Column(String(100), nullable=True)

    sentiment = Column(String(50), nullable=True)

    risk = Column(String(50), nullable=True)

    created_at = Column(DateTime)
