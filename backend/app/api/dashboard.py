from collections import Counter

from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.news import News
from app.models.news_ai_analysis import NewsAIAnalysis

from app.auth.dependencies import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"],
)


def grouped_count(
    db: Session,
    column,
):
    rows = (
        db.query(
            column,
            func.count(NewsAIAnalysis.id),
        )
        .join(
            News,
            News.id == NewsAIAnalysis.news_id,
        )
        .filter(column.isnot(None))
        .group_by(column)
        .all()
    )

    return {str(value): count for value, count in rows}


def json_value_counts(db: Session, column):
    rows = db.query(column).filter(column.isnot(None)).all()

    counter = Counter()

    for (values,) in rows:
        if not values:
            continue

        if isinstance(values, list):
            counter.update(str(value).strip() for value in values if value)

    return dict(
        sorted(
            counter.items(),
            key=lambda item: item[1],
            reverse=True,
        )
    )


@router.get("/summary")
def get_dashboard_summary(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    total_articles = db.query(func.count(News.id)).scalar()

    sentiment = grouped_count(
        db,
        NewsAIAnalysis.sentiment,
    )

    importance = grouped_count(
        db,
        NewsAIAnalysis.importance,
    )

    risk = grouped_count(
        db,
        NewsAIAnalysis.risk_level,
    )

    return {
        "total_articles": total_articles or 0,
        "sentiment": sentiment,
        "importance": importance,
        "risk": risk,
        "top_banks": [],
        "top_organizations": [],
        "top_topics": [],
    }


@router.get("/top-banks")
def get_top_banks(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    counts = json_value_counts(
        db,
        NewsAIAnalysis.banks,
    )

    return {
        "items": [
            {
                "name": name,
                "count": count,
            }
            for name, count in list(counts.items())[:10]
        ]
    }


@router.get("/top-topics")
def get_top_topics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    counts = json_value_counts(
        db,
        NewsAIAnalysis.topics,
    )

    return {
        "items": [
            {
                "name": name,
                "count": count,
            }
            for name, count in list(counts.items())[:10]
        ]
    }


@router.get("/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    total_news = db.query(func.count(News.id)).scalar() or 0

    high_risk = (
        db.query(func.count(func.distinct(NewsAIAnalysis.news_id)))
        .filter(NewsAIAnalysis.risk_level == "High")
        .scalar()
        or 0
    )

    high_importance = (
        db.query(func.count(func.distinct(NewsAIAnalysis.news_id)))
        .filter(NewsAIAnalysis.importance == "High")
        .scalar()
        or 0
    )

    ai_processed = (
        db.query(func.count(News.id)).filter(News.ai_status == "completed").scalar()
        or 0
    )

    ai_processed_percent = (
        round((ai_processed / total_news) * 100, 1) if total_news else 0
    )

    return {
        "total_news": total_news,
        "high_risk": high_risk,
        "high_importance": high_importance,
        "ai_processed": ai_processed,
        "ai_processed_percent": ai_processed_percent,
    }
