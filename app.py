from flask import Flask, render_template
from flask_cor import CORS
app = Flask(__name__)
CORS(app)

