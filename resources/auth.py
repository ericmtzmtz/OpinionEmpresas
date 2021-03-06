from flask import Response, request
from flask_jwt_extended import create_access_token
from database.models import User
from database.db import db
from flask_restful import Resource
from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, ValidationError
from resources.errors import SchemaValidationError, EmailAlreadyExistsError, \
    UnauthorizedError, InternalServerError
import datetime


class SignupApi(Resource):
    def post(self):
        try:
            body    = request.get_json()
            user    = User(**body)
            user.hash_password()
            user.save()
            id = user.id
            return {'id': str(id)}, 200
        except FieldDoesNotExist:
            raise SchemaValidationError
        except ValidationError:
            if "email" in ValidationError:
                raise "El mail no es correcto"
            raise SchemaValidationError
        except NotUniqueError:
            raise EmailAlreadyExistsError
        except Exception as e:
            raise InternalServerError

class LoginApi(Resource):
    def post(self):
        try:
            body        = request.get_json()
            user        = User.objects.get(email=body.get('email'))
            authorized  = user.check_password(body.get('password'))
            if not authorized:
                return {'error': 'Email o password incorrecto'}, 401

            expires     = datetime.timedelta(days=7)
            username    = user.name
            isStaff     = user.isStaff
            access_token= create_access_token(identity=str(user.id), expires_delta=expires)
            return {'message': 'Login Successful', 'token': access_token, 'isStaff': isStaff, 'name': username}, 200
        except(UnauthorizedError, DoesNotExist):
            raise UnauthorizedError
        except Exception as e:
            raise InternalServerError
        