from flask import Flask, request, Response
from database.db import initialize_db
from database.models import Empresas
import json

app = Flask(__name__)

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://localhost/opinion'
}

initialize_db(app)

app.run()