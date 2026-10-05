from app.database.database import SessionLocal
from app.models.user import User
from app.auth.security import verify_password


def check_password(username: str, password: str):
    db = SessionLocal()

    try:
        user = db.query(User).filter(User.username == username).first()

        if not user:
            print(f"User '{username}' not found.")
            return

        print(f"User: {user.username}")
        print(f"Role: {user.role}")
        print(f"Active: {user.is_active}")

        if verify_password(password, user.password_hash):
            print("Password: VALID")
        else:
            print("Password: INVALID")

    finally:
        db.close()


if __name__ == "__main__":
    username = input("Username: ")
    password = input("Password: ")

    check_password(username, password)
