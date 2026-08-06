from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class NewsArticle(BaseModel):
    """Normalized news article used across the application."""

    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        from_attributes=True,
    )

    source: str

    headline: str

    url: str

    publish_date: datetime

    author: Optional[str] = None

    publisher: Optional[str] = None

    shortdesc: Optional[str] = None

    image: Optional[str] = None

    content: Optional[str] = None

    category: Optional[str] = "Bank News"

    summary: Optional[str] = None

    sentiment: Optional[str] = None

    risk: Optional[str] = None

    external_id: Optional[int] = None
