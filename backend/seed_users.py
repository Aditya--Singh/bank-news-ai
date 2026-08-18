from datetime import datetime

# from passlib.context import CryptContext

from app.database.database import SessionLocal
from app.models.user import User
import bcrypt

# pwd_context = CryptContext(
#     schemes=["bcrypt"],
#     deprecated="auto",
# )


def seed_users():
    db = SessionLocal()

    try:
        users = [
            {
                "username": "Admin",
                "password": "Admin@news26",
                "role": "admin",
            },
            {
                "username": "Aditya",
                "password": "Aditya@news26",
                "role": "user",
            },
            {
                "username": "Hemant",
                "password": "Hemant@news26",
                "role": "user",
            },
            {
                "username": "Nikhil",
                "password": "Nikhil@news26",
                "role": "user",
            },
            {
                "username": "Deepak",
                "password": "Deepak@news26",
                "role": "user",
            },
            {
                "username": "Vijay",
                "password": "Vijay@news26",
                "role": "user",
            },
            {
                "username": "Vikas",
                "password": "Vikas@news26",
                "role": "user",
            },
            {
                "username": "Pankaj",
                "password": "Pankaj@news26",
                "role": "user",
            },
        ]

        for item in users:
            existing = db.query(User).filter(User.username == item["username"]).first()

            if existing:
                print(f"User '{item['username']}' already exists.")
                continue

            user = User(
                username=item["username"],
                password_hash=bcrypt.hashpw(
                    item["password"].encode("utf-8"),
                    bcrypt.gensalt(),
                ).decode("utf-8"),
                role=item["role"],
                is_active=1,
                created_at=datetime.utcnow(),
            )

            db.add(user)

        db.commit()

        print("Demo users seeded successfully.")

    finally:
        db.close()


if __name__ == "__main__":
    seed_users()
