from db.setupDb import User

def get_user_by_email(session, email):
    user = session.query(User).filter_by(email=email).first()
    return user.display_name, user.role
