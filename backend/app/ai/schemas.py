from pydantic import BaseModel


class AIAnalysis(BaseModel):
    executive_summary: list[str]

    summary: str

    sentiment: str
    importance: str
    risk_level: str

    banks: list[str]
    organizations: list[str]
    keywords: list[str]
    topics: list[str]
