from flask import Flask
from database.db import initialize_db
# from database.models import Empresas
# import json
from resources.empresa import empresas

app = Flask(__name__)

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://localhost/opinion'
}

initialize_db(app)
app.register_blueprint(empresas)

app.run()