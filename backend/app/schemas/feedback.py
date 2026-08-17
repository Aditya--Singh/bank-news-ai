from pydantic import BaseModel, Field


class FeedbackCreate(BaseModel):
    username: str = Field(..., min_length=1, max_length=100)
    role: str = Field(..., pattern="^(user|admin)$")

    relevance: int = Field(..., ge=1, le=5)
    accuracy: int = Field(..., ge=1, le=5)
    usefulness: int = Field(..., ge=1, le=5)
    clarity: int = Field(..., ge=1, le=5)
    timeliness: int = Field(..., ge=1, le=5)

    comments: str | None = None
