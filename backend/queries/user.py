from db.setupDb import User
from notification.mail import send_mail
import uuid, os, hashlib, random, string
import datetime
from base64 import b64encode


def get_user_by_email(session, email):
    user = session.query(User).filter_by(email=email).first()
    return user


def create_new_credentials(session, email):
    user = session.query(User).filter_by(email=email).first()
    if user.email != "":
        # create uuid
        pwd = uuid.uuid4()
        # save uuid to database
        salt = "".join(random.choice(string.ascii_lowercase) for i in range(40))
        user.logon_pwd_hash = hash(pwd, salt)
        user.logon_pwd_salt = salt
        user.logon_pwd_valid_thru = datetime.datetime.now() + datetime.timedelta(
            minutes=10
        )
        session.commit()
        # send mail with link
        domain = os.environ["BASE_URL"]
        link = "" + domain + "/auth/login?token=" + str(pwd) + "&email=" + email
        res = send_mail(
            email,
            "Hier ist ihr einmaliger Login-Link. \n " + link,
            subject="Login zu Cotip",
        )
        if not res:
            session.rollback()
            return False
        return True


def verify_user(session, token, email):
    user = session.query(User).filter_by(email=email).first()
    if datetime.datetime.now() > user.logon_pwd_valid_thru:
        return False
    token_uuid = uuid.UUID(token)

    hashed_token = hash(token_uuid, user.logon_pwd_salt)
    hashed_pwd = user.logon_pwd_hash

    if hashed_pwd == "":
        return False

    if hashed_token.hex() == hashed_pwd[2:]:
        user.logon_pwd_hash = ""
        user.logon_pwd_salt = ""
        user.logon_pwd_valid_thru = None
        session.commit()
        return True
    else:
        return False


def hash(pwd, salt):
    pwd_hashed = hashlib.sha256()
    pwd_hashed.update(pwd.bytes)
    pwd_hashed.update(salt.encode())

    return pwd_hashed.digest()

def add_user(session, display_name, email, role, doctor_id=None, testcenter_id=None):
    user = User(display_name=display_name, email=email, role=role, doctor_id=doctor_id, testcenter_id=testcenter_id)
    session.add(user)
    session.commit()
    


