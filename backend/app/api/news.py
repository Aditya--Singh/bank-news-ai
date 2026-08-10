from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import and_, case, desc, func
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.news import News
from app.models.news_ai_analysis import NewsAIAnalysis


router = APIRouter(prefix="/api/news", tags=["News"])


@router.get("")
@router.get("")
def get_news(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    source: str | None = None,
    sentiment: str | None = None,
    importance: str | None = None,
    risk_level: str | None = None,
    bank: str | None = None,
    db: Session = Depends(get_db),
):
    # ---------------------------------------------------------
    # Latest AI analysis per article
    # ---------------------------------------------------------

    latest_analysis_subquery = (
        db.query(
            NewsAIAnalysis.news_id,
            func.max(NewsAIAnalysis.id).label("latest_analysis_id"),
        )
        .group_by(NewsAIAnalysis.news_id)
        .subquery()
    )

    # ---------------------------------------------------------
    # Base query
    # ---------------------------------------------------------

    query = (
        db.query(News)
        .outerjoin(
            latest_analysis_subquery,
            latest_analysis_subquery.c.news_id == News.id,
        )
        .outerjoin(
            NewsAIAnalysis,
            NewsAIAnalysis.id == latest_analysis_subquery.c.latest_analysis_id,
        )
    )

    # ---------------------------------------------------------
    # News filters
    # ---------------------------------------------------------

    if source:
        query = query.filter(News.source == source)

    # ---------------------------------------------------------
    # AI analysis filters
    # ---------------------------------------------------------

    if sentiment:
        query = query.filter(NewsAIAnalysis.sentiment == sentiment)

    if importance:
        query = query.filter(NewsAIAnalysis.importance == importance)

    if risk_level:
        query = query.filter(NewsAIAnalysis.risk_level == risk_level)

    if bank:
        query = query.filter(NewsAIAnalysis.banks.contains([bank]))

    # ---------------------------------------------------------
    # Total after filters
    # ---------------------------------------------------------

    total = query.count()

    # ---------------------------------------------------------
    # Priority score
    #
    # High Risk + High Importance  -> 5
    # High Risk                    -> 4
    # High Importance              -> 3
    # Medium Risk + High Importance-> 2
    # Everything else              -> 1
    # ---------------------------------------------------------

    priority_score = case(
        (
            (NewsAIAnalysis.risk_level == "High")
            & (NewsAIAnalysis.importance == "High"),
            5,
        ),
        (
            NewsAIAnalysis.risk_level == "High",
            4,
        ),
        (
            NewsAIAnalysis.importance == "High",
            3,
        ),
        (
            (NewsAIAnalysis.risk_level == "Medium")
            & (NewsAIAnalysis.importance == "High"),
            2,
        ),
        else_=1,
    )

    # ---------------------------------------------------------
    # Pagination + ordering
    # ---------------------------------------------------------

    offset = (page - 1) * page_size

    articles = (
        query.order_by(
            desc(func.date(News.publish_date)),
            desc(priority_score),
            desc(News.publish_date),
            desc(News.id),
        )
        .offset(offset)
        .limit(page_size)
        .all()
    )

    # ---------------------------------------------------------
    # Response
    # ---------------------------------------------------------

    articles_response = []

    for article in articles:
        analysis = None

        if article.analyses:
            analysis = max(
                article.analyses,
                key=lambda item: item.id,
            )

        articles_response.append(
            {
                "id": article.id,
                "source": article.source,
                "headline": article.headline,
                "url": article.url,
                "publish_date": article.publish_date,
                "author": article.author,
                "publisher": article.publisher,
                "category": article.category,
                "ai_status": article.ai_status,
                "ai_analysis": {
                    "executive_summary": (
                        analysis.executive_summary if analysis else None
                    ),
                    "summary": (analysis.summary if analysis else None),
                    "sentiment": (analysis.sentiment if analysis else None),
                    "importance": (analysis.importance if analysis else None),
                    "risk_level": (analysis.risk_level if analysis else None),
                    "banks": (analysis.banks if analysis else []),
                    "organizations": (analysis.organizations if analysis else []),
                    "keywords": (analysis.keywords if analysis else []),
                    "topics": (analysis.topics if analysis else []),
                },
            }
        )

    return {
        "page": page,
        "page_size": page_size,
        "total": total,
        "articles": articles_response,
    }
