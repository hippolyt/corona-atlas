from flask import Flask, jsonify, session, request
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from queries.slots import get_slots_by_time
from queries.doctor import toggle_doctor_by_id, get_doctors, add_doctor
from queries.daystats import get_slot_stats
from queries.case import add_case, get_cases
from db.setupDb import Patient, Address
import os

app = Flask(__name__)

app.secret_key = os.environ["SESSION_SECRET_KEY"]
app.config.from_object({"SESSION_COOKIE_NAME": "sess", "SESSION_COOKIE_HTTPONLY": True})

connection = os.environ["DB_READ_CREDS"]
engine = create_engine(connection)

Session = sessionmaker()
Session.configure(bind=engine)
querySession = Session()


@app.route("/")
def welcome():
    val = session["hello"] if "hello" in session else ""
    session["hello"] = "world"
    return jsonify(msg=val)

# @app.route("/api-internal/cases", methods=['GET', 'POST'])
# def get_cases():
#     details = request.args.get('details', '')
#     closed = request.args.get('closed', '')
#     sort = request.args.get('sort', '')
#     limit = request.args.get('limit', '')
#     search = request.args.get('search', '')
#     # WIP


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
def toggle_doctor(id):
    access = bool(request.args.get('access'))
    res = toggle_doctor_by_id(id, querySession, access)
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


@app.route("/api-internal/cases", methods=['GET', 'POST'])
def map_cases():
    if request.method == 'POST':
        data = request.get_json()
        
        slot_id = data['slot_id']
        doctor_id = data['doctor_id']
        testcenter_id = data['testcenter_id']
        referral_type = data['referral_type']

        p_name = data['patient']['name']
        p_email = data['patient']['email']
        p_phone = data['patient']['phone']
        p_mobile = data['patient']['mobile']
        p_consent = data['patient']['consent']
        p_high_risk = data['patient']['high_risk']
        p = Patient(name=p_name, email=p_email, phone=p_phone, mobile=p_mobile, consent=p_consent, high_risk=p_high_risk)

        address_zip_code = data['patient']['address']['zip_code']
        address_city = data['patient']['address']['city']
        address_street = data['patient']['address']['street']
        address_no = data['patient']['address']['no']
        add = Address(zip_code=address_zip_code, city=address_city, street=address_street, no=address_no)

        res = add_case(querySession, slot_id, doctor_id, testcenter_id, referral_type, p, add)
        return res
    
    if request.method == 'GET':
        limit = request.args.get('limit', int)
        if limit is 0:
            limit = 1000
        search = request.args.get('search', '')
        closed = request.args.get('closed', bool)
        slot_id = request.args.get('slotId', int)
        res = get_cases(querySession, limit, search, closed, slot_id)
        return jsonify(res)









