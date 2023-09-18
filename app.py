#!/usr/bin/python3
""" Python flask route """

from flask import Flask, render_template, request, redirect, session, g, url_for
from flask_cors import CORS
import os
from models.db_files.db_setup import UserInfo
from models.py_files.welcome_msg import email as mail


app = Flask(__name__)
cors = CORS(app)
app.secret_key = os.urandom(24)
db = UserInfo()

# root  route to serve the landing page
@app.route('/', strict_slashes=False)
def home():
    """ landing page route """
    return render_template('index.html')

@app.route('/login', strict_slashes=False, methods=['GET', 'POST'])
def login():
    """Login form page"""
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # checks the username and password in the database
        if db.auth(username, password):

            session['user'] = username
            return redirect(url_for('dashboard'))
        else:
            return render_template('login.html', username=username, password=password, err_msg='invalid username or password')
    else:
        return render_template('login.html')

@app.route('/signup', strict_slashes=False, methods=['GET', 'POST'])
def signup():
    """Registration"""
    if request.method == 'POST':
        com_name = request.form['companyName']
        service = request.form['service']
        firstName = request.form['firstName']
        email = request.form['email']
        username = request.form['username']
        lastName = request.form['lastName']
        password = request.form['password']
        companyAddr = request.form['companyAddr']
        country = request.form['country']
        city = request.form['city']
        phone = request.form['phone']
        # Register the data to the database
        db.register(companyName=com_name, service=service, firstName=firstName, lastName=lastName, email=email, username=username, password=password, companyAddr=companyAddr, country=country, city=city, phone=phone)
        mail(email=email, username=username)
        return redirect(url_for('login'))
    else:
        return render_template('signup.html')


@app.route('/dashboard', strict_slashes=False)
def dashboard():
    """checks if the user is in the session and serves him his dashboard"""
    if g.user:
        return render_template('dashboard.html', user=session['user'])
    else:
        return redirect(url_for(home))


@app.route('/recover', methods=['GET', 'POST'], strict_slashes=False)
def recover():
    """ recovery password function"""
    if request.method == 'POST':
        rec_email = request.form['email']
        msg = db.recovery(rec_email)
        return render_template('recovery.html', msg=msg)
    return render_template('recovery.html')

@app.route('/logout', strict_slashes=False)
def logout():
    """ ends the session """
    session.pop('user', None)
    return redirect(url_for('home'))

# This routes executes before any requests
@app.before_request
def before_request():
    g.user = None
    if 'user' in session:
        g.user = session['user']


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
