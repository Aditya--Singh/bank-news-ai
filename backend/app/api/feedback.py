from fastapi import APIRouter, Depends, status
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user, require_admin
from app.database.database import get_db
from app.models.application_feedback import ApplicationFeedback
from app.models.user import User
from app.schemas.feedback import FeedbackCreate

router = APIRouter(
    prefix="/api/feedback",
    tags=["Feedback"],
)


@router.post(
    "",
    status_code=status.HTTP_201_CREATED,
)
def create_feedback(
    feedback: FeedbackCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    record = ApplicationFeedback(
        username=current_user.username,
        role=current_user.role,
        relevance=feedback.relevance,
        accuracy=feedback.accuracy,
        usefulness=feedback.usefulness,
        clarity=feedback.clarity,
        timeliness=feedback.timeliness,
        comments=feedback.comments,
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    return {
        "message": "Feedback submitted successfully",
        "id": record.id,
    }


@router.get("/monthly")
def get_monthly_feedback(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    results = (
        db.query(
            func.strftime("%Y", ApplicationFeedback.created_at).label("year"),
            func.strftime("%m", ApplicationFeedback.created_at).label("month"),
            func.count(ApplicationFeedback.id).label("feedback_captured"),
        )
        .group_by(
            func.strftime("%Y", ApplicationFeedback.created_at),
            func.strftime("%m", ApplicationFeedback.created_at),
        )
        .order_by(
            func.strftime("%Y", ApplicationFeedback.created_at),
            func.strftime("%m", ApplicationFeedback.created_at),
        )
        .all()
    )

    month_names = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December",
    }

    return [
        {
            "year": int(row.year),
            "month": month_names[row.month],
            "feedbackCaptured": row.feedback_captured,
        }
        for row in results
    ]
