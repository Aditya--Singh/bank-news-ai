from sqlalchemy import Column, DateTime, Integer, String

from app.database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)

    username = Column(
        String(100),
        unique=True,
        nullable=False,
        index=True,
    )

    password_hash = Column(
        String(255),
        nullable=False,
    )

    role = Column(
        String(20),
        nullable=False,
        default="user",
    )

    is_active = Column(
        Integer,
        nullable=False,
        default=1,
    )

    created_at = Column(
        DateTime,
        nullable=False,
    )
