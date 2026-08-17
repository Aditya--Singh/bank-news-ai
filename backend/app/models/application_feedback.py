from sqlalchemy import Column, DateTime, Integer, String, Text
from sqlalchemy.sql import func

from app.database.database import Base


class ApplicationFeedback(Base):
    __tablename__ = "application_feedback"

    id = Column(Integer, primary_key=True)

    username = Column(String(100), nullable=False)

    role = Column(String(20), nullable=False)

    relevance = Column(Integer, nullable=False)
    accuracy = Column(Integer, nullable=False)
    usefulness = Column(Integer, nullable=False)
    clarity = Column(Integer, nullable=False)
    timeliness = Column(Integer, nullable=False)

    comments = Column(Text)

    created_at = Column(
        DateTime,
        nullable=False,
        server_default=func.now(),
    )
