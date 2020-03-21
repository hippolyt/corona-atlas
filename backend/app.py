from flask import Flask, jsonify, session
from storage.store import UserStore
import os

app = Flask(__name__)

app.secret_key = os.environ["SESSION_SECRET_KEY"]
app.config.from_object({"SESSION_COOKIE_NAME": "sess", "SESSION_COOKIE_HTTPONLY": True})

userStore = UserStore()


@app.route("/")
def welcome():
    val = session["hello"] if "hello" in session else ""
    session["hello"] = "world"
    return jsonify(msg=val)
