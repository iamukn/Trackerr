#!/usr/bin/python3
""" Python flask route """

from flask import Flask, render_template, request, redirect, session, g, url_for
from flask_cors import CORS
import os
app = Flask(__name__)
cors = CORS(app)
app.secret_key = os.urandom(24)

def validate(username, password):
    if username == 'username' and password == 'password':
        return True
    else:
        return False


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
        if validate(username, password):

            session['user'] = username
            return redirect(url_for('dashboard'))
        else:
            return render_template('login.html', username=username, password=password, err_msg='invalid username or password')
    else:
        return render_template('login.html')


@app.route('/dashboard', strict_slashes=False)
def dashboard():
    """checks if the user is in the session and serves him his dashboard"""
    if g.user:
        return render_template('dashboard.html', user=session['user'])
    else:
        return redirect(url_for(home))

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
