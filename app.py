from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from database.db import initialize_db
from flask_restful import Api
from resources.routes import initialize_routes
from resources.errors import errors

app     = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'My Super secrete password'
api     = Api(app, errors=errors)
Bcrypt  = Bcrypt(app)
jwt     = JWTManager(app)

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://localhost/opinion'
}

initialize_db(app)
initialize_routes(api)

app.run()