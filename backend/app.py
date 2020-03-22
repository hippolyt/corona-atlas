from flask import Flask, jsonify, session, request
from storage.store import UserStore
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from queries.slots import get_slots_by_time
from queries.doctor import disable_doctor_by_id, get_doctors, add_doctor
from queries.daystats import get_slot_stats
from notification.mail import send_mail
import os

app = Flask(__name__)

app.secret_key = os.environ["SESSION_SECRET_KEY"]
app.config.from_object({"SESSION_COOKIE_NAME": "sess", "SESSION_COOKIE_HTTPONLY": True})

connection = os.environ["DB_READ_CREDS"]
engine = create_engine(connection)

Session = sessionmaker()
Session.configure(bind=engine)
querySession = Session()

userStore = UserStore()


@app.route("/")
def welcome():
    val = session["hello"] if "hello" in session else ""
    session["hello"] = "world"
    return jsonify(msg=val)

@app.route("/api-internal/cases", methods=['GET', 'POST'])
def get_cases():
    details = request.args.get('details', '')
    closed = request.args.get('closed', '')
    sort = request.args.get('sort', '')
    limit = request.args.get('limit', '')
    search = request.args.get('search', '')
    # WIP

@app.route("/api-internal/cases/<id>/notify", methods=['GET', 'POST'])
def notify_case(id):
    type = request.args.get('type', '')
    case_id = id

    if request.method == 'GET':
        return "not implemented"
    elif request.method == 'POST':
        status = send_mail("vollmer.bruno@googlemail.com", "test")

        return_msg = {}
        return_msg['status'] = status

        return jsonify(msg=return_msg)


@app.route("/api-internal/slots", methods=['GET'])
def get_slots():
    start_date = request.args.get('from', '')
    end_date = request.args.get('to','')
    res = get_slots_by_time(start_date, end_date, querySession)
    return jsonify(res)

@app.route("/api-internal/daystats", methods=['GET'])
def get_daystats():
    start_date = request.args.get('from', '')
    end_date = request.args.get('to', '')
    res = get_slot_stats(querySession, start_date, end_date)
    return jsonify(res)


@app.route("/api-internal/doctors/<id>", methods=['PATCH'])
def disable_doctor(id):
    res = disable_doctor_by_id(id, querySession)
    return jsonify(res)


@app.route("/api-internal/doctors", methods=['GET', 'POST'])
def map_doctors():
    if request.method == 'GET':
        limit = request.args.get('limit', '')
        if limit is '':
            limit = 1000
        search = request.args.get('search', '')
        res = get_doctors(querySession,limit, search)
        return jsonify(res)

    if request.method == 'POST':
        name = request.args.get('name', '')
        email = request.args.get('email', '')
        access = bool(request.args.get('access', 'True'))
        res = add_doctor(querySession, name, email, access)
        return jsonify(res)
