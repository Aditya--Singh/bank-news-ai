from pydantic import BaseModel


class AIResult(BaseModel):
    executive_summary: str
    summary: str
    sentiment: str
    importance: str
    risk_level: str
    banks: list[str]
    organizations: list[str]
    keywords: list[str]
    topics: list[str]
