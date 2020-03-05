from flask import Response, request
from database.models import Opinion, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_jwt_extended.exceptions import NoAuthorizationError
from flask_restful import Resource
from mongoengine.errors import FieldDoesNotExist, \
    NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import SchemaValidationError, EmpresaAlreadyExistError,\
    EmpresaNotExistsError, InternalServerError, UpdatingEmpresaError, DeletingEmpresaError, UnauthorizedCreation


class OpinionesApi(Resource):
    @jwt_required
    def get(self):
        try:
            user_id     = get_jwt_identity()
            opiniones   = Opinion.objects.filter(added_by=user_id).to_json()
            return Response(opiniones, mimetype="application/json", status=200)
        except DoesNotExist:
            return 'Aun no hay opiniones'
        except NoAuthorizationError:
            return UnauthorizedCreation

    @jwt_required
    def post(self):
        try:
            user_id = get_jwt_identity()
            body    = request.get_json()
            ip      = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
            user    = User.objects.get(id=user_id)
            opinion = Opinion(**body, added_by=user_id, ip=ip)
            opinion.save()
            user.update(push__opiniones=opinion)
            user.save()
            id      = opinion.id
            return {'id': str(id)}, 200
        except(FieldDoesNotExist, ValidationError):
            raise SchemaValidationError + 'Remenber only number 1 to 5 in points'
        except Exception as e:
            raise InternalServerError

class OpinionApi(Resource):
    @jwt_required
    def update_opinion(self, id):
        try:
            user_id = get_jwt_identity()
            opinion = Opinion.objects.get(id=id, added_by=user_id)
            body = request.get_json()
            Opinion.objects.get(id=id).update(**body)
            return '', 200
        except InvalidQueryError:
            raise SchemaValidationError
        except DoesNotExist:
            raise UpdatingEmpresaError
        except Exception:
            raise InternalServerError

    @jwt_required   
    def delete_opinion(self, id):
        try:
            user_id = get_jwt_identity()
            opinion = Opinion.objects.get(id=id, added_by=user_id)
            opinion.delete()
            return '', 200
        except DoesNotExist:
            raise DeletingEmpresaError
        except Exception:
            raise InternalServerError

    @jwt_required
    def get_opinion(self, id):
        try:
            user_id = get_jwt_identity()
            opinion = Opinion.objects.get(id=id, added_by=user_id).to_json()
            return Response(opinion, mimetype="application/json", status=200)
        except DoesNotExist:
            raise EmpresaNotExistsError
        except Exception:
            raise InternalServerError