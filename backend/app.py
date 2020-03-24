from flask import Flask, jsonify, session, request, abort, redirect
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from flask_sqlalchemy import SQLAlchemy
from queries.slots import get_slots_by_time
from queries.doctor import toggle_doctor_by_id, get_doctors, add_doctor
from queries.daystats import get_slot_stats
from queries.case import (
    add_case,
    get_cases,
    get_comm_history,
    add_comm_history,
    get_case_and_patient,
    get_case_by_id,
    update_case_by_id,
    delete_case_by_id,
)
from queries.user import get_user_by_email, create_new_credentials, verify_user
from db.setupDb import Patient, Address
from notification.mail import send_mail
import os
import datetime

app = Flask(__name__)

app.secret_key = os.environ["SESSION_SECRET_KEY"]
app.config.from_object({"SESSION_COOKIE_NAME": "sess", 
                        "SESSION_COOKIE_HTTPONLY": True})

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ["DB_READ_CREDS"]
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True

db = SQLAlchemy(app)

domain = os.environ["BASE_URL"]


@app.route("/api-internal/me", methods=["GET"])
def manage_user():
    loggedIn = session["loggedIn"] if "loggedIn" in session else False

    if loggedIn is True:
        user_email = session["email"]
        display_name, role = get_user_by_email(db.session, email=user_email)
        return {"loggedIn": True, "displayName": display_name, "role": role}
    else:
        return {"loggedIn": False}


@app.route("/auth/login", methods=["GET", "POST"])
def manage_login():
    if request.method == "POST":
        data = request.get_json()
        email = data["email"]
        res = create_new_credentials(db.session, email)
        if res:
            return "200"
        else:
            abort(403)

    if request.method == "GET":
        token = request.args.get("token")
        email = request.args.get("email")
        res = verify_user(db.session, token, email)
        if res:
            session["loggedIn"] = True
            session["email"] = email
            return redirect("" + domain + "/")
        else:
            abort(401)


@app.route("/auth/logout", methods=["GET"])
def manage_logout():
    session.pop("loggedIn")
    session.pop("email")
    return redirect("" + domain + "/")


@app.route("/api-internal/cases/<id>/notify", methods=["GET", "POST"])
def notify_case(id):
    type = request.args.get("type", "")
    case_id = id

    if type not in ["mail", "sms", "robocall"]:
        return "unknown type"

    if request.method == "GET":
        comm_hist = get_comm_history(db.session, case_id, type)

        return jsonify(msg=comm_hist)
    elif request.method == "POST":
        case, patient = get_case_and_patient(db.session, case_id)

        if type == "mail":
            status, status_message = send_mail(patient.email, "test")
        elif type == "sms":
            status = "not implemented"
            status_message = "not_implemented"
        elif type == "robocall":
            status = "not implemented"
            status_message = "not_implemented"

        if status:
            # if notification was successful add to comm history
            timestamp = datetime.datetime.now()
            add_comm_history(db.session, case_id, timestamp, type)

        return_msg = {}
        return_msg["status"] = status
        return_msg["status_message"] = status_message

        return jsonify(msg=return_msg)


@app.route("/api-internal/slots", methods=["GET"])
def get_slots():
    start_date = request.args.get("from", "")
    end_date = request.args.get("to", "")
    res = get_slots_by_time(start_date, end_date, db.session)
    return jsonify(res)


@app.route("/api-internal/daystats", methods=["GET"])
def get_daystats():
    start_date = request.args.get("from", "")
    end_date = request.args.get("to", "")
    res = get_slot_stats(db.session, start_date, end_date)
    return jsonify(res)


@app.route("/api-internal/doctors/<id>", methods=["DELETE"])
def toggle_doctor(id):
    access = False
    res = toggle_doctor_by_id(id, db.session, access)
    return jsonify(res)


@app.route("/api-internal/doctors", methods=["GET", "POST"])
def map_doctors():
    if request.method == "GET":
        limit = request.args.get("limit", "")
        if limit is "":
            limit = 1000
        search = request.args.get("search", "")
        res = get_doctors(db.session, limit, search)
        return jsonify(res)

    if request.method == 'POST':
        data = request.get_json()
        name = data['name']
        email = data['email']
        access = data['access']
        res = add_doctor(db.session, name, email, access)
        return jsonify(res)


@app.route("/api-internal/cases/<id>", methods=["GET", "PATCH", "DELETE"])
def handle_case(id):
    if request.method == "GET":
        res = get_case_by_id(db.session, id)
        return res

    if request.method == "PATCH":
        data = request.json
        res = update_case_by_id(db.session, id, data)
        return res

    if request.method == "DELETE":
        delete_case_by_id(db.session, id)
        return "200"


@app.route("/api-internal/cases", methods=["GET", "POST"])
def map_cases():
    if request.method == "POST":
        data = request.get_json()

        slot_id = data["slot_id"]
        doctor_id = data["doctor_id"]
        testcenter_id = data["testcenter_id"]
        referral_type = data["referral_type"]

        p_name = data["patient"]["name"]
        p_email = data["patient"]["email"]
        p_phone = data["patient"]["phone"]
        p_mobile = data["patient"]["mobile"]
        p_consent = data["patient"]["consent"]
        p_high_risk = data["patient"]["high_risk"]
        p = Patient(
            name=p_name,
            email=p_email,
            phone=p_phone,
            mobile=p_mobile,
            consent=p_consent,
            high_risk=p_high_risk,
        )

        address_zip_code = data["patient"]["address"]["zip_code"]
        address_city = data["patient"]["address"]["city"]
        address_street = data["patient"]["address"]["street"]
        address_no = data["patient"]["address"]["no"]
        add = Address(
            zip_code=address_zip_code,
            city=address_city,
            street=address_street,
            no=address_no,
        )

        res = add_case(
            db.session, slot_id, doctor_id, testcenter_id, referral_type, p, add
        )
        return res

    if request.method == "GET":
        limit = int(request.args.get("limit", "0"))
        if limit is 0:
            limit = 1000
        search = request.args.get("search", "")
        closed = bool(request.args.get("closed", default="False") == "True")
        slot_id = int(request.args.get("slotId", default="0"))
        res = get_cases(db.session, limit, search, closed, slot_id)
        return jsonify(res)
