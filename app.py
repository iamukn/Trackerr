#!/usr/bin/python3
""" Python flask route """

from flask import Flask, jsonify, abort, render_template, request, redirect, session, g, url_for
from flask_cors import CORS
import os
from models.db_files.db_setup import UserInfo
from models.py_files.welcome_msg import contact_us
from models.py_files.welcome_msg import email as email_msg
from models.db_files.track_db import Tracking

try:
    app = Flask(__name__, template_folder="template/pages")
    cors = CORS(app)
    app.secret_key = os.urandom(24)
    db = UserInfo()
    track = Tracking()
except Exception:
    abort(400, "internal error occurred")


# handling HTTP errors
@app.errorhandler(400)
def BadRequest(e):
    """handles 400 errors"""
    return render_template("400.html"), 400


@app.errorhandler(403)
def forbidden(e):
    """handles 403 errors"""
    return render_template("403.html"), 403


@app.errorhandler(404)
def notFound(e):
    """handles 404 errors"""
    return render_template("404.html"), 404


@app.errorhandler(408)
def request_time_out(e):
    """handles 408 errors"""
    return render_template("408.html"), 408


@app.errorhandler(500)
def internalServerError(e):
    """handles 500 errors"""
    return render_template("500.html"), 500


@app.errorhandler(503)
def service_unavailable(e):
    """handles 503 errors"""
    return render_template("503.html"), 503


# root  route to serve the landing page
@app.route("/", strict_slashes=False, methods=["GET", "POST"])
def home():
    if request.method == "POST":
        track_num = request.json.get("search")
        return redirect(url_for("tracking_", num=str(track_num.upper())))

    """site count and landing page route """
    if g.user:
        return render_template("landingPage.html")
    track.site_traffic()
    return render_template("landingPage.html")


@app.route("/login", strict_slashes=False, methods=["GET", "POST"])
def login():
    """Login form page"""
    if request.method == "POST":
        username = request.form.get("email")
        password = request.form.get("password")

        # checks the username and password in the database
        if db.auth(username, password):
            session["user"] = username
            return redirect(url_for("dashboard"))
        else:
            return render_template(
                "login.html",
                username=username,
                password=password,
                err_msg="invalid username or password",
            )
    else:
        return render_template("login.html")


@app.route("/tracking", methods=["GET", "POST"], strict_slashes=False)
def tracking():
    if request.method == "POST":
        tracking_num = request.json.get("search")
        res = track.tracker(str(tracking_num.upper()))
        data = {}
        for key, val in res.items():
            if key == '_id':
                pass
            else:
                data[key] = res.get(key)
        return jsonify(data)
    return render_template('landingPage.html')


     #   s1 = res.get("status1")
     #   s2 = res.get("status2")
     #   if s1 and s2:
     #       return render_template(
     #           "tracking_info2.html", num=tracking_num, s1=s1, s2=s2
     #       )
     #   elif s1:
     #       return render_template("tracking_info.html", num=tracking_num, s1=s1)
     #   else:
     #       return redirect(url_for("tracking"))
  #  else:
  #      return render_template("tracking.html")


@app.route("/tracking/<num>", methods=["GET", "POST"], strict_slashes=False)
def tracking_(num):
    if num:
        res = track.tracker(num)
        data = {}
        for key, val in res.items():
            if key == '_id':
                pass
            else:
                data[key] = res.get(key)
        print(data)
        return jsonify(data)

# Tracking info update route
@app.route('/dashboard/tracking/update', methods=['PUT', 'GET'])
def trackinfo_update():
    if g.user:
        if request.method == 'PUT':
            trackNum = request.json.get('trackingNumber')
            status = request.json.get('status')
            track.update_tracking(trackNum, status)
            return "Updated successfully"
        elif request.method == 'GET':
            return render_template('updateTracking.htm')
    abort(403, 'Unauthorized')

@app.route("/signup", strict_slashes=False, methods=["GET", "POST"])
def signup():
    """Registration"""
    if request.method == "POST":
        com_name = request.json.get("companyName")
        service = request.json.get("service")
        firstName = request.json.get("firstName")
        email = request.json.get("email")
        username = request.json.get("username")
        lastName = request.json.get("lastName")
        password = request.json.get("password")
        companyAddr = request.json.get("companyAddr")
        country = request.json.get("country")
        city = request.json.get("city")
        phone = request.json.get("phone")
        # Register the data to the database
        try:
            res = db.register(
                companyName=com_name,
                service=service,
                firstName=firstName,
                lastName=lastName,
                email=email,
                username=username,
                password=password,
                companyAddr=companyAddr,
                country=country,
                city=city,
                phone=phone,
            )
        #    email_msg(email, username)
            data = {"message": f"{res}"}
            print(data)
            return jsonify(data)
        except Exception as e:
            return jsonify({"message": "Username or Email already exist"})

        finally:
            return redirect(url_for("login"))
    else:
        return render_template("registrationForm.html")


@app.route("/dashboard", strict_slashes=False)
def dashboard():
    """checks if the user is in the session and serves him his dashboard"""
    if g.user:
        return render_template("vendorPage.html", user=session["user"])
    abort(403, "Unauthorized")


# Route to generate tracking number
@app.route("/dashboard/generate", strict_slashes=False)
def generate():
    if  g.user:
        """method that generates a tracking number"""
        tracking_number = track.generate(session.get("user"))
        return jsonify({"tracking_number":tracking_number})


@app.route("/recovery", methods=["GET", "POST"], strict_slashes=False)
def recover():
    """recovery password function"""
    if request.method == "POST":
        rec_email = request.form.get("email")
        msg = db.recovery(rec_email)
        return render_template("resetPassword.html", msg=msg)
    return render_template("resetPassword.html")


@app.route("/dashboard/reset", methods=["GET", "PUT"], strict_slashes=False)
def reset():
    """Method that changes password"""
    if request.method == "PUT":
        if not g.user:
            username = session["user"]
            oldPw = request.json.get('oldPw')
            newPw = request.json.get('newPw')
            if db.pwUpdate(username, oldPw, newPw):
                return render_template(
                    "updatePassword.htm", res="Password changed successfully"
                )
            else:
                return render_template("updatePassword.htm", res="Incorrect password")
        abort(403, "Unauthorized")
    elif request.method == "GET":
        if g.user:
            return render_template("updatePassword.htm")
        abort(403, "Unauthorized")

@app.route('/contactus', methods=['GET', 'POST'])
def contactus():
    """ contact us """
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        msg = request.form.get('message')
        print(name, email, msg)
        # forwards the message to the team
        contact_us(name=name,email=email, msg=msg)
        return render_template('contact.html', msg="Message sent, click here to return to home")
    else:
        return render_template('contact.html')
        
@app.route('/about')
def about():
    return render_template('about.html')


@app.route("/logout", strict_slashes=False)
def logout():
    if g.user:
        """ends the session"""
        session.pop("user", None)
        return redirect(url_for("login"))
    else:
        abort(403)


# This routes executes before any requests
@app.before_request
def before_request():
    g.user = None
    if "user" in session:
        g.user = session["user"]


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
